import os
import sys
import argparse
from dotenv import load_dotenv
load_dotenv()

import pdfplumber
from supabase import create_client
from openai import OpenAI

supabase = create_client(
    os.getenv("NEXT_PUBLIC_SUPABASE_URL"),
    os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
)

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_embedding(text: str) -> list:
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list:
    """Split text into overlapping chunks."""
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk.strip())
        i += chunk_size - overlap
    return chunks

def process_pdf(pdf_path: str, source_title: str, source_type: str = "research", source_id: str = None):
    """Extract text from PDF, chunk it and store embeddings in Supabase."""
    
    print(f"Processing: {pdf_path}")
    print(f"Title: {source_title}")
    
    # Extract text from PDF
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
    
    if not full_text.strip():
        print("No text extracted from PDF")
        return
    
    print(f"Extracted {len(full_text)} characters from PDF")
    
    # Chunk the text
    chunks = chunk_text(full_text)
    print(f"Created {len(chunks)} chunks")
    
    # Delete existing chunks for this source
    if source_id:
        supabase.table('document_chunks').delete().eq('source_id', source_id).execute()
        print(f"Deleted existing chunks for source_id: {source_id}")
    
    # Generate embeddings and store
    for i, chunk in enumerate(chunks):
        print(f"  Embedding chunk {i+1}/{len(chunks)}...")
        embedding = get_embedding(chunk)
        
        supabase.table('document_chunks').insert({
            'source_id': source_id,
            'source_type': source_type,
            'source_title': source_title,
            'chunk_index': i,
            'content': chunk,
            'embedding': embedding
        }).execute()
    
    print(f"\n✅ Successfully processed {len(chunks)} chunks for '{source_title}'")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process a PDF for RAG')
    parser.add_argument('pdf_path', help='Path to the PDF file')
    parser.add_argument('title', help='Title of the document')
    parser.add_argument('--type', default='research', help='Source type: research or education')
    parser.add_argument('--source-id', help='UUID of the source record in Supabase')
    
    args = parser.parse_args()
    process_pdf(args.pdf_path, args.title, args.type, args.source_id)