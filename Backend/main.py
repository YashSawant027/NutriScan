import os
import httpx
from dotenv import load_dotenv
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List, Optional

# 1. Setup FastAPI
app = FastAPI(title="NutriScan AI Pro Backend")

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

# 2. Define Data Models
class IngredientItem(BaseModel):
    name: str
    sub: str
    status: str # Safe, Caution, or Warning

class FoodAnalysis(BaseModel):
    product_display_name: str = Field(description="The real-world name of the product")
    health_score: int
    eco_score: int
    alerts: List[str]
    ingredients: List[IngredientItem]
    sustainability: dict = Field(default_factory=lambda: {"packaging": "Standard", "sourcing": "Unknown", "carbon": "Medium"})

@app.get("/api/scan/{barcode}")
async def scan_barcode(barcode: str):
    headers = {"User-Agent": "NutriScanApp/1.0 (Bhavans College Project)"}
    
    db_product_name = None
    db_brand = "Generic"
    ingredients_text = ""
    image_url = "https://cdn-icons-png.flaticon.com/512/3081/3081918.png"

    async with httpx.AsyncClient(timeout=10.0) as client:
        # --- STRATEGY 1: Direct Barcode Lookup ---
        try:
            off_res = await client.get(f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json", headers=headers)
            if off_res.status_code == 200:
                data = off_res.json()
                if data.get("status") == 1:
                    product = data.get("product", {})
                    db_product_name = product.get("product_name") or product.get("product_name_en")
                    db_brand = product.get("brands", "Generic")
                    ingredients_text = product.get("ingredients_text") or product.get("ingredients_text_en", "")
                    image_url = product.get("image_front_url") or product.get("image_url") or image_url
        except Exception as e:
            print(f"Barcode API error: {e}")

    # --- STRATEGY 2: AI REASONING (The "Never Fail" Part) ---
    # We ask the AI to determine the product name and analysis regardless of DB status
    parser = JsonOutputParser(pydantic_object=FoodAnalysis)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a world-class nutritionist and food database expert.
        Your goal is to identify and analyze a product based on a barcode or provided name.
        
        TASK:
        1. If 'db_name' is provided, use it. If not, use the barcode to identify the product from your training data.
        2. If the product is unknown to you, provide a generic but realistic analysis based on the product category implied by the brand or name.
        3. ALWAYS return a valid JSON. Never say 'Product not found'.
        
        JSON STRUCTURE:
        - product_display_name: (e.g., 'Parle-G Gluco Biscuits' or 'Maggi Noodles')
        - health_score: (0-100)
        - eco_score: (0-100)
        - alerts: (List of health warnings)
        - ingredients: (List of objects with 'name', 'sub', and 'status' [Safe, Caution, Warning])
        - sustainability: (Object with 'packaging', 'sourcing', 'carbon')
        {format_instructions}"""),
        ("user", f"Barcode: {barcode}, Database Name: {db_product_name}, Brand: {db_brand}, DB Ingredients: {ingredients_text}")
    ]).partial(format_instructions=parser.get_format_instructions())

    chain = prompt | llm | parser

    try:
        analysis = await chain.ainvoke({"barcode": barcode, "db_product_name": db_product_name})
        # Overwrite the generic product name with the AI's identified name
        final_name = analysis.get("product_display_name", db_product_name or f"Product {barcode}")
    except Exception as e:
        print(f"LLM Error: {e}")
        final_name = db_product_name or f"Product {barcode}"
        analysis = {
            "health_score": 50,
            "eco_score": 50,
            "alerts": ["General composition analysis"],
            "ingredients": [{"name": "Standard Ingredients", "sub": "Commonly found", "status": "Caution"}],
            "sustainability": {"packaging": "Standard", "sourcing": "Mixed", "carbon": "Medium"}
        }

    return {
        "barcode": barcode,
        "name": final_name,
        "brand": db_brand,
        "image": image_url,
        "ai_analysis": analysis
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)