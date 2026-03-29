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

# CORS (IMPORTANT for Vercel + Mobile)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# LLM
llm = ChatGroq(
    temperature=0.1,
    model_name="llama-3.3-70b-versatile",
    groq_api_key=groq_api_key
)

# -----------------------------
# Models
# -----------------------------

class IngredientItem(BaseModel):
    name: str
    sub: str
    status: str
    health_risks: str


class AlternativeProduct(BaseModel):
    name: str
    reason: str
    link: str


class FoodAnalysis(BaseModel):
    product_display_name: str
    brand_name: str
    health_score: int
    eco_score: int
    overall_health_summary: str
    ingredients: List[IngredientItem]
    sustainability: dict
    alternatives: List[AlternativeProduct]


# -----------------------------
# Scan API
# -----------------------------

@app.get("/api/scan/{barcode}")
async def scan_barcode(barcode: str):

    headers = {"User-Agent": "NutriScanApp/1.0"}
    api_data = {}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.get(
                f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json",
                headers=headers
            )

            if res.status_code == 200:
                api_data = res.json().get("product", {})

    except Exception:
        pass

    db_name = api_data.get("product_name") or api_data.get("product_name_en")
    db_brand = api_data.get("brands")
    db_ingredients = api_data.get("ingredients_text")

    image_url = (
        api_data.get("image_front_url")
        or "https://cdn-icons-png.flaticon.com/512/3081/3081918.png"
    )

    parser = JsonOutputParser(pydantic_object=FoodAnalysis)

    # -----------------------------
    # STRICT AI PROMPT
    # -----------------------------

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a World-Class Food Scientist and Clinical Nutritionist.

Your job is to analyze packaged food scientifically.

-----------------------------
STRICT RULES
-----------------------------

1. INGREDIENT COUNT
You MUST list between 6 and 15 ingredients.

2. STATUS VALUES
Each ingredient MUST be ONLY:

Safe  
Cautious  
Dangerous

DO NOT USE ANY OTHER WORDING.

3. DANGEROUS INGREDIENTS

Mark as Dangerous:

Artificial Colors  
Red 40  
Yellow 5  
Blue 1  

Preservatives  
BHA  
BHT  
TBHQ  

Sweeteners  
High Fructose Corn Syrup  
Aspartame  
Sucralose  

Oils  
Hydrogenated oils  
Palm oil (processed)

Additives  
MSG  
Artificial flavors  
Artificial sweeteners

4. CAUTIOUS INGREDIENTS

Refined sugar  
Refined flour  
Salt  
Vegetable oil  
Emulsifiers  
Thickeners  

5. SAFE INGREDIENTS

Whole grains  
Milk  
Natural cocoa  
Nuts  
Fruits  
Natural ingredients  

-----------------------------
ALTERNATIVE RULES
-----------------------------

You MUST detect food category:

Examples:

Biscuit → Healthy biscuits  
Chips → Healthy chips  
Chocolate → Healthy chocolates  
Soft drink → Healthy drinks  
Noodles → Healthy noodles  
Bread → Healthy bread  

Suggest 3 healthier alternatives:

Rules:

Same category only  
No fruits unless beverage  
No different food category  

Example:

Bad:

Oreo → Apple ❌

Good:

Oreo → Whole Wheat Biscuit ✅

Each alternative MUST include:

name  
reason  
link  

Google Link Format:

https://www.google.com/search?q=buy+[product name]

Example:

https://www.google.com/search?q=buy+ragi+biscuits

Return EXACTLY 3 alternatives.

-----------------------------

You MUST include:

1 Dangerous ingredient  
2 Cautious ingredients  

Return ONLY JSON

{format_instructions}
"""),

("user",
 f"Barcode: {barcode}, Name: {db_name}, Brand: {db_brand}, Ingredients: {db_ingredients}")
    ]).partial(format_instructions=parser.get_format_instructions())

    chain = prompt | llm | parser

    try:
        analysis = await chain.ainvoke({"barcode": barcode})

    except Exception as e:

        print("AI Error:", e)

        analysis = {
            "product_display_name": db_name or "Unknown Product",
            "brand_name": db_brand or "Unknown Brand",
            "health_score": 0,
            "eco_score": 0,
            "overall_health_summary": "AI analysis failed",
            "ingredients": [],
            "sustainability": {
                "origin": "Unknown",
                "packaging": "Unknown",
                "production": "Unknown"
            },
            "alternatives": []
        }

    return {
        "barcode": barcode,
        "name": analysis.get("product_display_name"),
        "brand": analysis.get("brand_name"),
        "image": image_url,
        "ai_analysis": analysis
    }


# -----------------------------
# Run
# -----------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)