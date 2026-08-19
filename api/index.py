import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.post("/api/chat")
@app.post("/chat")
async def chat(req: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY environment variable missing.")
    
    try:
        model = genai.GenerativeModel("gemini-3.6-flash")
        response = model.generate_content(req.message)
        return {"reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
