-- The Verita AI Institute — Database Schema
-- Run this in Supabase SQL Editor to recreate the database from scratch
-- Last updated: May 2026

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- RESEARCH TABLES
-- ============================================================

-- Research Pillars
CREATE TABLE pillars (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  number text NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  problem_label text DEFAULT 'The Problem',
  problem_headline text NOT NULL,
  problem_body text NOT NULL,
  response_label text DEFAULT 'Our Research',
  response_headline text NOT NULL,
  response_body text NOT NULL,
  display_order integer NOT NULL,
  published boolean DEFAULT true,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- Research Outputs
CREATE TABLE research_outputs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pillar_id uuid REFERENCES pillars(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text CHECK (status IN ('published', 'forthcoming', 'future')) DEFAULT 'future',
  date text,
  publication_year integer,
  pdf_url text,
  is_public boolean DEFAULT true,
  description text,
  display_order integer NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- EDUCATION TABLES
-- ============================================================

-- Education Sections (audience groups)
CREATE TABLE education_sections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  number text NOT NULL,
  slug text UNIQUE NOT NULL,
  audience text NOT NULL,
  problem_headline text NOT NULL,
  problem_body text NOT NULL,
  program_name text NOT NULL,
  program_sub text,
  tailored_note text,
  coming_soon text,
  display_order integer NOT NULL,
  published boolean DEFAULT true,
  show_on_homepage boolean DEFAULT false,
  homepage_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Education Programs (specific courses)
CREATE TABLE education_programs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id uuid REFERENCES education_sections(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text,
  description text,
  duration text,
  format text,
  effort text,
  status text CHECK (status IN ('active', 'forthcoming', 'future')) DEFAULT 'active',
  objectives text,
  outcomes text,
  show_on_homepage boolean DEFAULT false,
  homepage_order integer DEFAULT 0,
  homepage_eyebrow text,
  homepage_body text,
  homepage_tags text[],
  homepage_differentiator text,
  image_url text,
  display_order integer NOT NULL,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Education Modules (reusable topics)
CREATE TABLE education_modules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  duration text,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Program Modules (junction table)
CREATE TABLE program_modules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id uuid REFERENCES education_programs(id) ON DELETE CASCADE,
  module_id uuid REFERENCES education_modules(id) ON DELETE CASCADE,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- OTHER CONTENT TABLES
-- ============================================================

-- Ticker Items
CREATE TABLE ticker_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  text text NOT NULL,
  active boolean DEFAULT true,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Team Members
CREATE TABLE team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  initials text NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  type text CHECK (type IN ('founding', 'advisory', 'fellow')),
  bg_color text DEFAULT '#e6f0fb',
  display_order integer NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Partners
CREATE TABLE partners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text CHECK (type IN ('university', 'enterprise', 'policy')),
  logo_url text,
  website_url text,
  active boolean DEFAULT true,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Document Chunks (PDF RAG)
CREATE TABLE document_chunks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id uuid,
  source_type text CHECK (source_type IN ('research', 'education')),
  source_title text,
  chunk_index integer,
  content text NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- PGVECTOR SEARCH FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float,
  source_title text,
  source_type text
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ro.id,
    ro.title as content,
    1 - (ro.embedding <=> query_embedding) as similarity,
    ro.title as source_title,
    'research'::text as source_type
  FROM research_outputs ro
  WHERE ro.embedding IS NOT NULL
  AND 1 - (ro.embedding <=> query_embedding) > match_threshold

  UNION ALL

  SELECT
    dc.id,
    dc.content,
    1 - (dc.embedding <=> query_embedding) as similarity,
    dc.source_title,
    dc.source_type
  FROM document_chunks dc
  WHERE dc.embedding IS NOT NULL
  AND 1 - (dc.embedding <=> query_embedding) > match_threshold

  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticker_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read access" ON pillars FOR SELECT USING (true);
CREATE POLICY "Public read access" ON research_outputs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON education_sections FOR SELECT USING (true);
CREATE POLICY "Public read access" ON education_programs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON education_modules FOR SELECT USING (true);
CREATE POLICY "Public read access" ON program_modules FOR SELECT USING (true);
CREATE POLICY "Public read access" ON ticker_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read access" ON document_chunks FOR SELECT USING (true);

-- Write policies for embeddings and admin operations
CREATE POLICY "Service role full access" ON document_chunks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role write access" ON research_outputs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role write access" ON education_programs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role write access" ON education_modules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role write access" ON pillars FOR ALL USING (true) WITH CHECK (true);
