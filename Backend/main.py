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

# 1. Setup FastAPI
app = FastAPI(title="NutriScan AI Pro")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize LLM
llm = ChatGroq(
    temperature=0.1,
    model_name="llama-3.3-70b-versatile",
    groq_api_key=groq_api_key
)

# 2. Data Models
class IngredientItem(BaseModel):
    name: str
    sub: str
    status: str # Safe, Caution, or Warning

class FoodAnalysis(BaseModel):
    product_display_name: str = Field(description="The actual name of the product")
    brand_name: str = Field(description="The brand of the product")
    health_score: int
    eco_score: int
    alerts: List[str]
    ingredients: List[IngredientItem]
    sustainability: dict = Field(default_factory=lambda: {"origin": "India", "packaging": "Standard", "production": "Industrial"})

@app.get("/api/scan/{barcode}")
async def scan_barcode(barcode: str):
    headers = {"User-Agent": "NutriScanApp/1.0"}
    
    api_data = {}
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            res = await client.get(f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json", headers=headers)
            if res.status_code == 200:
                api_data = res.json().get("product", {})
    except Exception:
        pass 

    db_name = api_data.get("product_name") or api_data.get("product_name_en")
    db_brand = api_data.get("brands")
    db_ingredients = api_data.get("ingredients_text")
    image_url = api_data.get("image_front_url") or "https://cdn-icons-png.flaticon.com/512/3081/3081918.png"

    # AI MASTER LOGIC
    parser = JsonOutputParser(pydantic_object=FoodAnalysis)
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a World-Class Food Scientist and Nutritionist. 
        Your job is to IDENTIFY the product for the given barcode and provide a deep analysis.
        
        STRICT INGREDIENT RULES:
        1. List a MINIMUM of 6 and a MAXIMUM of 15 ingredients for EVERY product.
        2. If the database hint is short, use your knowledge to provide the full standard ingredient list for that specific product.
        
        SAFETY CLASSIFICATION:
        - 'Safe': Natural or healthy (e.g., Whole Wheat, Water, Spices).
        - 'Caution': Processed, high sugar/salt, or allergens (e.g., Palm Oil, Sugar).
        - 'Warning': Artificial chemicals, harmful preservatives, or synthetic dyes (e.g., MSG, Aspartame, E122).
        
        {format_instructions}"""),
        ("user", f"Barcode: {barcode}, DB Hint: {db_name}, Brand Hint: {db_brand}, DB Ingredients: {db_ingredients}")
    ]).partial(format_instructions=parser.get_format_instructions())

    chain = prompt | llm | parser

    try:
        analysis = await chain.ainvoke({"barcode": barcode})
        final_name = analysis.get("product_display_name") or db_name or f"Product {barcode}"
    except Exception:
        final_name = db_name or f"Product {barcode}"
        analysis = {
            "product_display_name": final_name,
            "brand_name": db_brand or "Generic",
            "health_score": 50, "eco_score": 50, "alerts": ["Analysis failed, showing defaults"],
            "ingredients": [{"name": "Standard Content", "sub": "General", "status": "Safe"}],
            "sustainability": {"origin": "Local", "packaging": "Standard", "production": "Standard"}
        }

    return {
        "barcode": barcode,
        "name": final_name,
        "brand": analysis.get("brand_name") or db_brand or "Generic",
        "image": image_url,
        "ai_analysis": analysis
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)