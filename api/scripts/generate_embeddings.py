import os
from dotenv import load_dotenv
load_dotenv()

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

def generate_embeddings():
    # Embed research outputs
    outputs = supabase.table('research_outputs').select('id, title').execute()
    print(f"Generating embeddings for {len(outputs.data)} research outputs...")
    
    for item in outputs.data:
        embedding = get_embedding(item['title'])
        supabase.table('research_outputs').update(
            {'embedding': embedding}
        ).eq('id', item['id']).execute()
        print(f"  ✓ {item['title'][:50]}")

    # Embed pillars
    pillars = supabase.table('pillars').select('id, title, response_body').execute()
    print(f"\nGenerating embeddings for {len(pillars.data)} pillars...")
    
    for item in pillars.data:
        text = f"{item['title']}. {item['response_body']}"
        embedding = get_embedding(text)
        supabase.table('pillars').update(
            {'embedding': embedding}
        ).eq('id', item['id']).execute()
        print(f"  ✓ {item['title'][:50]}")

    # Embed education items
    edu_items = supabase.table('education_items').select('id, title, description').execute()
    print(f"\nGenerating embeddings for {len(edu_items.data)} education items...")
    
    for item in edu_items.data:
        text = f"{item['title']}. {item.get('description') or ''}"
        embedding = get_embedding(text)
        supabase.table('education_items').update(
            {'embedding': embedding}
        ).eq('id', item['id']).execute()
        print(f"  ✓ {item['title'][:50]}")

    print("\n✅ All embeddings generated successfully!")

if __name__ == "__main__":
    generate_embeddings()