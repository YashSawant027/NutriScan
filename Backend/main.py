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

# --- Updated Data Models ---

class IngredientItem(BaseModel):
    name: str
    sub: str
    status: str 

class AlternativeProduct(BaseModel):
    name: str = Field(description="Name of a healthier alternative product")
    reason: str = Field(description="Briefly explain why this is a better choice")

class FoodAnalysis(BaseModel):
    product_display_name: str
    brand_name: str
    health_score: int
    eco_score: int
    alerts: List[str]
    ingredients: List[IngredientItem]
    sustainability: dict
    alternatives: List[AlternativeProduct] = Field(description="List of 3 healthy swaps")

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

    parser = JsonOutputParser(pydantic_object=FoodAnalysis)
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a World-Class Food Scientist. 
        Identify the product and provide a deep analysis.
        
        STRICT RULES:
        1. List 6-15 ingredients.
        2. Classify status as 'Safe', 'Caution', or 'Warning'.
        3. SMART SWAPS: Suggest 3 specific healthy alternatives available in the market (prioritize Indian brands like Yoga Bar, The Whole Truth, or organic options if applicable).
        
        {format_instructions}"""),
        ("user", f"Barcode: {barcode}, Name: {db_name}, Brand: {db_brand}, Ingredients: {db_ingredients}")
    ]).partial(format_instructions=parser.get_format_instructions())

    chain = prompt | llm | parser

    try:
        analysis = await chain.ainvoke({"barcode": barcode})
    except Exception:
        analysis = {"product_display_name": db_name or "Unknown", "brand_name": db_brand or "Generic", "health_score": 50, "eco_score": 50, "alerts": [], "ingredients": [], "sustainability": {}, "alternatives": []}

    return {
        "barcode": barcode,
        "name": analysis.get("product_display_name"),
        "brand": analysis.get("brand_name"),
        "image": image_url,
        "ai_analysis": analysis
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)