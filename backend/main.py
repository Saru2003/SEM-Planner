from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI(title="SEM Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class KeywordRequest(BaseModel):
    brand_url: str
    competitor_url: str

class PlanRequest(BaseModel):
    keywords: List[str]
    search_budget: float
    shopping_budget: float
    pmax_budget: float
    conversion_rate: float = 0.02  # fixed 2%

@app.post("/keywords")
def get_keywords(req: KeywordRequest):
    # In a real scenario, scrape the URLs and fetch keyword data from an API
    mock_keywords = [
        {"keyword": "vegan protein powder", "volume": 5400, "cpc_low": 1.2, "cpc_high": 2.5, "competition": "HIGH"},
        {"keyword": "best post workout drink", "volume": 2900, "cpc_low": 0.9, "cpc_high": 1.8, "competition": "MEDIUM"},
        {"keyword": "cheap protein shake", "volume": 1200, "cpc_low": 0.5, "cpc_high": 1.2, "competition": "LOW"},
        {"keyword": "fitness supplements online", "volume": 480, "cpc_low": 1.0, "cpc_high": 2.0, "competition": "HIGH"},
        {"keyword": "muscleblaze competitor powder", "volume": 800, "cpc_low": 0.7, "cpc_high": 1.5, "competition": "MEDIUM"}
    ]
    return {"keywords": mock_keywords}

@app.post("/plan")
def generate_plan(req: PlanRequest):
    enriched_keywords = [
        {
            "keyword": kw,
            "volume": 1000 + i * 500, 
            "cpc_low": 0.5 + i * 0.2,
            "cpc_high": 1.0 + i * 0.4,
            "competition": "MEDIUM" if i % 2 == 0 else "HIGH"
        }
        for i, kw in enumerate(req.keywords)
    ]

    filtered = [kw for kw in enriched_keywords if kw["volume"] >= 500]

    ad_groups = {
        "Brand Terms": [kw for kw in filtered if "brand" in kw["keyword"].lower()],
        "Competitor Terms": [kw for kw in filtered if "competitor" in kw["keyword"].lower()],
        "Category Terms": [kw for kw in filtered if "protein" in kw["keyword"].lower()],
        "Location Terms": [kw for kw in filtered if "online" in kw["keyword"].lower()],
        "Long-tail Queries": [kw for kw in filtered if len(kw["keyword"].split()) >= 3],
    }

    for group in ad_groups:
        for kw in ad_groups[group]:
            kw["match_type"] = "Phrase" if len(kw["keyword"].split()) > 2 else "Exact"

    pmax_themes = [
        "Vegan Protein Products",
        "Post-Workout Recovery",
        "For Busy Professionals",
        "Back to School Fitness"
    ]

    expected_clicks = max(1, sum([kw["volume"] for kw in filtered]) / 1000)
    target_cpc = (req.shopping_budget * req.conversion_rate) / expected_clicks

    return {
        "ad_groups": ad_groups,
        "pmax_themes": pmax_themes,
        "shopping_cpc": round(target_cpc, 2)
    }
