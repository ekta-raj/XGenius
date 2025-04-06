from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow frontend dev server to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PlayerRequest(BaseModel):
    player_name: str
    position: str
    minutes_avg: float
    opponent_strength: float

class SubRequest(BaseModel):
    current_minute: int
    fatigue_levels: List[float]
    xg_contributions: List[float]

@app.get("/")
def root():
    return {"message": "XGenius backend is running!"}

@app.post("/predict_player")
def predict_player(req: PlayerRequest):
    return {
        "player_name": req.player_name,
        "xg_forecast": [0.45, 0.52, 0.39, 0.60, 0.49],
        "fatigue_forecast": [20, 40, 65, 80, 90]
    }

@app.post("/suggest_subs")
def suggest_subs(req: SubRequest):
    return {
        "sub_off": "Player A",
        "sub_on": "Player B",
        "impact_score": 0.78,
        "confidence": "High"
    }
