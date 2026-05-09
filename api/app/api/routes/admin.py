import os
import io
import logging
import tempfile
import requests
import pdfplumber
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client
from openai import OpenAI

load_dotenv()

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])

supabase = create_client(
    os.getenv("NEXT_PUBLIC_SUPABASE_URL", ""),
    os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
)

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))

ADMIN_SECRET = os.getenv("ADMIN_SECRET", "verita-admin-2025")

def verify_admin(x_admin_secret: str = Header(None)):
    logger.info(f"Received secret: '{x_admin_secret}', Expected: '{ADMIN_SECRET}'")
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
def get_embedding(text: str) -> list:
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list:
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk.strip())
        i += chunk_size - overlap
    return chunks

class ProcessPDFRequest(BaseModel):
    source_id: str
    source_title: str
    pdf_url: str
    source_type: str = "research"

@router.post("/process-pdf")
async def process_pdf(request: ProcessPDFRequest, x_admin_secret: str = Header(None)):
    verify_admin(x_admin_secret)
    try:
        # Download PDF from URL
        response = requests.get(request.pdf_url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Could not download PDF")

        # Extract text using pdfplumber
        full_text = ""
        with pdfplumber.open(io.BytesIO(response.content)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"

        if not full_text.strip():
            raise HTTPException(status_code=400, detail="No text extracted from PDF")

        # Chunk text
        chunks = chunk_text(full_text)

        # Delete existing chunks
        supabase.table('document_chunks').delete().eq('source_id', request.source_id).execute()

        # Generate embeddings and store
        for i, chunk in enumerate(chunks):
            embedding = get_embedding(chunk)
            supabase.table('document_chunks').insert({
                'source_id': request.source_id,
                'source_type': request.source_type,
                'source_title': request.source_title,
                'chunk_index': i,
                'content': chunk,
                'embedding': embedding
            }).execute()

        # Update research_output with embedding of title + description
        pub_data = supabase.table('research_outputs').select('description').eq('id', request.source_id).execute()
        description = pub_data.data[0].get('description', '') if pub_data.data else ''
        combined_text = f"{request.source_title}. {description}" if description else request.source_title
        title_embedding = get_embedding(combined_text)
        supabase.table('research_outputs').update(
            {'embedding': title_embedding}
        ).eq('id', request.source_id).execute()

        return {
            "status": "success",
            "chunks_processed": len(chunks),
            "title": request.source_title
        }

    except Exception as e:
        logger.error("PDF processing failed: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/publications")
async def get_publications(x_admin_secret: str = Header(None)):
    verify_admin(x_admin_secret)
    try:
        # Get all research outputs with chunk counts
        outputs = supabase.table('research_outputs').select(
            'id, title, status, date, pdf_url, pillar_id'
        ).order('display_order').execute()

        result = []
        for output in outputs.data:
            # Check if chunks exist
            chunks = supabase.table('document_chunks').select('id').eq('source_id', output['id']).execute()
            result.append({
                **output,
                'chunk_count': len(chunks.data)
            })

        return {"publications": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))