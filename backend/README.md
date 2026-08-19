# Azashiro Chatbot Backend

A tiny FastAPI service that powers the "Ask Azashiro" chat widget on the
portfolio site. It answers questions about Rommel by matching the user's
message against a hand-written knowledge base using TF-IDF + cosine
similarity — no external API key or LLM required.

## Run locally

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API will be live at `http://localhost:8000`. Test it:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "what projects have you built?"}'
```

## Connect the frontend

In the project root, create `.env` (or `.env.local`) with:

```
VITE_CHAT_API_URL=http://localhost:8000/api/chat
```

Restart `npm run dev` after adding it. In production, point this at your
deployed backend URL (Render, Railway, Fly.io, a VPS, etc. all work — it's
a standard FastAPI app).

## Teaching the bot new answers

Edit `knowledge.py`. Each entry is:

```python
{
    "topic": "short_id",
    "triggers": ["phrases", "a user", "might type"],
    "answer": "What the bot should say.",
}
```

Add more trigger phrases to improve matching, or add entirely new entries.
No other code needs to change.

## Upgrading to a real LLM later

If you want smarter, more conversational answers, swap the TF-IDF matcher
in `main.py` for a call to an LLM API (e.g. the Anthropic API), passing the
knowledge base entries as context. The request/response shape
(`ChatRequest` / `ChatResponse`) won't need to change, so the frontend
keeps working as-is.

## Deployment notes

- Set `allow_origins` in `main.py` to your actual frontend domain instead
  of `"*"` before going to production.
- Any ASGI host works: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
