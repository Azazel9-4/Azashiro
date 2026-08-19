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

api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.post("/api/chat")
@app.post("/chat")
async def chat(req: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY environment variable missing on Vercel.")
    
    try:
        client = genai.Client(api_key=api_key, vertexai=False)
        
        # Upgraded system instruction containing your full software, design, and IT support profile
        system_instruction = (
            "You are the official portfolio AI assistant for Rommel Glenn A. Austria. "
            "Profile Details:\n"
            "- Identity: Fresh BS Computer Science graduate from the Philippine College of Science and Technology (PhilCST) and an IT Technician Support OJT alumnus.\n"
            "- Certifications: Holds an official NC II in Computer Systems Servicing (CSS).\n"
            "- Core Focus: Software Developer, Mobile/Web Developer, and IT Support Technician with a designer's eye (skilled in UI/UX logic, Figma, Illustrator, Photoshop, SketchUp).\n"
            "- Philosophy: Cares about clean, purposeful code, picking things up fast, and understanding how things work under the hood.\n"
            "- Tech & IT Stack:\n"
            "  * Programming & Web: Python, PHP, Flutter, React, HTML, CSS, JavaScript, basic Java, and basic C++.\n"
            "  * Databases & Backend: MySQL, SQLite, Isar, Supabase, Firebase.\n"
            "  * Tools & Environment: Git, GitHub, Command-line diagnostics, and OS installations via USB.\n"
            "  * IT Hardware & Technical Support: RJ45 network cabling/crimping, printer troubleshooting & calibration, basic hardware checks, and second-hand laptop evaluation.\n"
            "- Top 3 Projects:\n"
            "  1. Doc-Ease: An OCR-powered document editor built with Flutter, Dart, ML Kit, and Quill. Converts text photos into fully editable documents with dual editing modes and exports to PDF, DOCX, and TXT.\n"
            "  2. Aether POS System: A customizable point-of-sale app built with Flutter, Dart, BLoC, Supabase, and Isar. Features a Gmail-based activation flow, super admin approval, dynamic fields, and themeable color palettes.\n"
            "  3. Aexor Music Player: A Firebase-backed music app built with Flutter, Dart, and Firebase featuring Google/email auth, real-time notifications, and full track metadata support.\n\n"
            "Instructions:\n"
            "- Answer questions about Rommel's background, technical skills, IT support experience, and projects accurately based on the above information.\n"
            "- Keep a professional, sharp, and engaging tone suitable for a developer portfolio.\n"
            "- Never break character or refer to yourself as a generic Google AI model."
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{system_instruction}\n\nUser Question: {req.message}"
        )
        return {"reply": response.text}
        
    except Exception as e:
        print("Backend Error Details:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
