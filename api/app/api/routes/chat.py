import os
import logging
import anthropic
from openai import OpenAI
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
anthropic_client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", ""))
supabase = create_client(
    os.getenv("NEXT_PUBLIC_SUPABASE_URL", ""),
    os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
)

class ChatRequest(BaseModel):
    message: str

def get_embedding(text: str) -> list:
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def search_similar_content(query_embedding: list, limit: int = 5) -> list:
    try:
        result = supabase.rpc('match_documents', {
            'query_embedding': query_embedding,
            'match_threshold': 0.3,
            'match_count': limit
        }).execute()
        return result.data or []
    except Exception as e:
        logger.error("Vector search failed: %s", str(e))
        return []

def get_full_context() -> str:
    pillars = supabase.table('pillars').select('title, response_body').order('display_order').execute()
    programs = supabase.table('education_programs').select('name, duration, format, status, education_sections(audience)').order('display_order').execute()
    
    context = "THE VERITA INSTITUTE - Research and Education:\n\n"
    context += "RESEARCH PILLARS:\n"
    for p in pillars.data:
        context += f"\n{p['title']}:\n"
        context += f"  {p['response_body']}\n"
    
    context += "\n\nEDUCATION PROGRAMS:\n"
    for p in programs.data:
        audience = p.get('education_sections', {}).get('audience', '') if p.get('education_sections') else ''
        context += f"\n{p['name']} ({p.get('format', '')} · {p.get('duration', '')} · for {audience}): status: {p['status']}\n"
    
    return context

@router.post("/message")
async def chat_message(request: ChatRequest):
    try:
        # Step 1 — embed the question
        query_embedding = get_embedding(request.message)
        
        # Step 2 — search pgvector for relevant content
        similar = search_similar_content(query_embedding, limit=5)
        
        # Step 3 — build context
        if similar:
            context = "Relevant content from The Verita's research:\n\n"
            for r in similar:
                source = r.get('source_title', r.get('content', ''))
                context += f"Source: {source}\n"
                context += f"Content: {r['content']}\n\n"
            context += "\nFull institute overview:\n" + get_full_context()
        else:
            context = get_full_context()
        # Step 4 — call Claude
        message = anthropic_client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system="""You are the Research AI assistant for The Verita Institute for AI Research and Education. 
            You are helpful, knowledgeable, and represent the institute's values of independence, 
            rigorous research, and practical education.

            Answer questions about The Verita's research agenda, education programs, and mission.
            Be concise but informative. Always maintain a professional, authoritative tone.
            Do not make up specific statistics or claims not supported by the context provided.

            SITE LINKS — when relevant, include these links in your responses using this exact format: [Link Text](URL)
            - Research overview: https://www.theveritaai.com/research
            - Responsible AI research: https://www.theveritaai.com/research#responsible-ai
            - AI Governance research: https://www.theveritaai.com/research#ai-governance
            - Future Workforce research: https://www.theveritaai.com/research#future-workforce
            - Education overview: https://www.theveritaai.com/education
            - AI Foundations Certificate: https://www.theveritaai.com/education#students
            - AI in Practice program: https://www.theveritaai.com/education#workforce
            - Executive AI Leadership: https://www.theveritaai.com/education#leadership
            - Publications: https://www.theveritaai.com/publications
            - Partner with us: https://www.theveritaai.com/partner
            - Fellows program: https://www.theveritaai.com/fellows
            - Our Purpose: https://www.theveritaai.com/about
            - Commission research: https://www.theveritaai.com/research#commission

            Only include links when they are directly relevant to what the user asked about.
            Do not include more than 2-3 links per response.""",
            messages=[
                {
                    "role": "user",
                    "content": f"Context about The Verita:\n{context}\n\nUser question: {request.message}"
                }
            ]
        )

        return {
            "response": message.content[0].text,
            "status": "success"
        }

    except Exception as e:
        logger.error("Chat failed: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))