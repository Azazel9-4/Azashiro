import os
import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.post("/api/chat")
@app.post("/chat")
async def chat(req: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY environment variable missing on Vercel.")
    
    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=req.message
        )
        return {"reply": response.text}
    except Exception as e:
        print("Backend Error Details:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
