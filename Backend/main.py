import os
import httpx
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List

app = FastAPI(title="NutriScan AI Pro")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    temperature=0.1,
    model_name="llama-3.3-70b-versatile",
    groq_api_key=groq_api_key
)

class IngredientItem(BaseModel):
    name: str
    sub: str
    status: str 

class FoodAnalysis(BaseModel):
    product_display_name: str = Field(description="The actual name of the product")
    brand_name: str = Field(description="The brand of the product")
    health_score: int
    eco_score: int
    alerts: List[str]
    ingredients: List[IngredientItem]
    sustainability: dict = Field(default_factory=lambda: {"origin": "Unknown", "packaging": "Standard", "production": "Industrial"})

@app.get("/api/scan/{barcode}")
async def scan_barcode(barcode: str):
    headers = {"User-Agent": "NutriScanApp/1.0"}
    
    # 1. Try to get ANY hint from the API
    api_data = {}
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            res = await client.get(f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json", headers=headers)
            if res.status_code == 200:
                api_data = res.json().get("product", {})
    except Exception:
        pass # If API fails, we don't care, AI will handle it

    # 2. Extract whatever the API found (might be empty)
    db_name = api_data.get("product_name") or api_data.get("product_name_en")
    db_brand = api_data.get("brands")
    db_ingredients = api_data.get("ingredients_text")
    image_url = api_data.get("image_front_url") or "https://cdn-icons-png.flaticon.com/512/3081/3081918.png"

    # 3. AI MASTER LOGIC: Identify and Analyze
    parser = JsonOutputParser(pydantic_object=FoodAnalysis)
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a World-Class Food Encyclopedia. 
        Your primary job is to IDENTIFY the product associated with the barcode provided.
        
        STRICT INSTRUCTIONS:
        1. If 'db_name' is missing or 'Unknown', use your internal knowledge to identify the product from the 'barcode'.
        2. Example: 8901058000041 is Maggi, 8901262010015 is Amul Butter, 5449000196507 is Coca-Cola.
        3. Even if you aren't 100% sure, identify the MOST LIKELY product for that barcode. 
        4. NEVER return 'Generic Product' or 'Unknown'.
        5. Analyze ingredients, health score, and sustainability accurately for that specific product.
        {format_instructions}"""),
        ("user", f"Identify and analyze this barcode: {barcode}. (API hints: Name: {db_name}, Brand: {db_brand}, Ingredients: {db_ingredients})")
    ]).partial(format_instructions=parser.get_format_instructions())

    chain = prompt | llm | parser

    try:
        analysis = await chain.ainvoke({"barcode": barcode})
        # Use AI's identified name as the main name
        final_name = analysis.get("product_display_name")
        final_brand = analysis.get("brand_name")
    except Exception:
        # Emergency backup
        final_name = db_name or f"Product {barcode}"
        final_brand = db_brand or "Generic"
        analysis = {"health_score": 50, "eco_score": 50, "alerts": [], "ingredients": [], "sustainability": {}}

    return {
        "barcode": barcode,
        "name": final_name,
        "brand": final_brand,
        "image": image_url,
        "ai_analysis": analysis
    }

if __name__ == "__main__":
    # Render provides a $PORT environment variable. If it's missing, use 8000.
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)