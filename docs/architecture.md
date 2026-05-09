# The Verita AI Institute — Architecture Documentation

## Overview

The Verita website is a full-stack application built on a modern cloud infrastructure. This document describes every component, how they connect, and why each was chosen.

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 16 (React, TypeScript) | Website and UI |
| Backend | FastAPI (Python) | API, email, chat, PDF processing |
| Database | Supabase (Postgres + pgvector) | Content, embeddings, file storage |
| Hosting | Railway | Deploys frontend, backend, and Postgres |
| Domain | GoDaddy | DNS management for theveritaai.com |
| Email | Google Workspace + Resend | Professional email + transactional email |
| AI | Anthropic Claude API | Research agent responses |
| Embeddings | OpenAI (text-embedding-3-small) | Vector embeddings for RAG |
| Version Control | GitHub | Code repository |

---

## Infrastructure Diagram

```
User Browser
     |
     | HTTPS
     v
GoDaddy DNS (theveritaai.com)
     |
     | CNAME → Railway
     v
Railway (Hosting Platform)
     |
     |--- web service (Next.js) → www.theveritaai.com
     |--- api service (FastAPI) → api-production-0fdc.up.railway.app
     |--- postgres service (Railway Postgres) → internal only
     |--- redis service → internal only
     |
     | Supabase Client (HTTPS)
     v
Supabase (External Database)
     |--- Postgres tables (content)
     |--- pgvector (embeddings)
     |--- Storage buckets (PDFs, media)
```

---

## Component Details

### 1. Frontend — Next.js (Railway: web service)

**Repository path:** `web/`

The frontend is a Next.js 16 application using:
- React with TypeScript
- Tailwind CSS (utility classes only)
- Supabase JS client for data fetching
- Server components for SEO pages
- Client components for interactive pages (chat, forms, modals)

**Key files:**
```
web/src/app/
├── page.tsx                    # Homepage (server component)
├── HomeContent.tsx             # Homepage (client component)
├── ChatWidget.tsx              # AI Research Agent widget
├── research/page.tsx           # Research page
├── education/page.tsx          # Education page
├── publications/page.tsx       # Publications page
├── about/page.tsx              # Our Purpose page
├── institute/page.tsx          # The Institute page
├── fellows/page.tsx            # Fellows page
├── partner/page.tsx            # Partner page
├── chat/page.tsx               # Chat Verita page
├── admin/page.tsx              # Admin panel
└── sitemap.ts                  # Auto-generated sitemap

web/src/components/layout/
├── Nav.tsx                     # Navigation
└── Footer.tsx                  # Footer

web/src/lib/
└── supabase.ts                 # Supabase client
```

**Environment variables (web service):**
```
NEXT_PUBLIC_SUPABASE_URL         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Supabase public key
NEXT_PUBLIC_API_URL              # FastAPI backend URL
NEXT_PUBLIC_ADMIN_SECRET         # Admin panel password
```

---

### 2. Backend — FastAPI (Railway: api service)

**Repository path:** `api/`

The backend handles:
- Contact form submissions (via Resend)
- AI chat messages (Claude API + RAG)
- Admin PDF processing
- Health checks

**Key files:**
```
api/app/
├── main.py                          # App entry point, CORS, routers
├── core/config.py                   # Settings, CORS origins
└── api/routes/
    ├── contact.py                   # Contact form → Resend email
    ├── chat.py                      # Claude AI agent + RAG
    └── admin.py                     # PDF processing endpoint

api/scripts/
├── generate_embeddings.py           # Generate embeddings for existing content
└── process_pdf.py                   # Process a single PDF from command line
```

**Environment variables (api service):**
```
ANTHROPIC_API_KEY                # Claude API key
OPENAI_API_KEY                   # OpenAI embeddings key
RESEND_API_KEY                   # Resend email API key
MAIL_TO                          # admin@theveritaai.com
MAIL_FROM                        # admin@theveritaai.com
MAIL_USERNAME                    # admin@theveritaai.com
MAIL_PASSWORD                    # Gmail app password (backup)
ADMIN_SECRET                     # Admin panel password
DATABASE_URL                     # Railway internal Postgres (asyncpg)
NEXT_PUBLIC_SUPABASE_URL         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Supabase public key
```

---

### 3. Database — Supabase

**Project URL:** https://lkpbwkuqmxyztmkyrukn.supabase.co

Supabase provides:
- **Postgres database** — all website content
- **pgvector extension** — vector embeddings for RAG
- **Storage buckets** — PDF and media files

**Tables:**
```
pillars                  # Research pillars (3 rows)
research_outputs         # Research papers under each pillar
education_sections       # Education audience sections (3 rows)
education_items          # Courses and modules
ticker_items             # Homepage ticker bar
team_members             # Institute team and advisory board
partners                 # Partner organizations
document_chunks          # PDF text chunks with embeddings
```

**Storage buckets:**
```
public-research          # Published open-access PDFs (public)
private-research         # Proprietary/commissioned PDFs (private)
media                    # Logos and images (public)
```

**pgvector columns:**
```
research_outputs.embedding       # 1536-dimension vectors
pillars.embedding                # 1536-dimension vectors
education_items.embedding        # 1536-dimension vectors
document_chunks.embedding        # 1536-dimension vectors
```

---

### 4. Email — Google Workspace + Resend

**Google Workspace** handles incoming email:
- `admin@theveritaai.com` — main inbox
- `hello@theveritaai.com` → alias to admin
- `research@theveritaai.com` → alias to admin
- `education@theveritaai.com` → alias to admin
- `fellows@theveritaai.com` → alias to admin

**Resend** handles outgoing transactional email from contact forms:
- Education enquiry form → admin@theveritaai.com
- Partner enquiry form → admin@theveritaai.com
- Research commission form → admin@theveritaai.com

---

### 5. AI — Claude + OpenAI

**Claude API (Anthropic):**
- Model: `claude-sonnet-4-20250514`
- Used for: Research Agent responses
- Context: Relevant content from pgvector + full pillar/education overview

**OpenAI:**
- Model: `text-embedding-3-small`
- Used for: Generating 1536-dimension embeddings
- Triggered when: New content added, PDFs processed

**RAG Pipeline:**
```
User question
     |
     | OpenAI embeddings
     v
1536-dimension vector
     |
     | pgvector similarity search (match_documents function)
     v
Top 5 most relevant chunks
     |
     | + Full institute context (fallback)
     v
Claude API with context
     |
     v
Response with site links
```

---

### 6. DNS — GoDaddy

**Domain:** theveritaai.com

**DNS Records:**
```
Type    Name                    Value
CNAME   www                     → Railway web service
CNAME   api (if needed)         → Railway api service
TXT     @                       Google site verification
TXT     resend._domainkey        Resend DKIM
TXT     send                    Resend SPF
MX      send                    Resend feedback
MX      @                       Google Workspace mail
TXT     @                       Google Workspace verification
```

---

### 7. Railway Services

Four services run in Railway:

| Service | Purpose | URL |
|---|---|---|
| web | Next.js frontend | www.theveritaai.com |
| api | FastAPI backend | api-production-0fdc.up.railway.app |
| postgres | Internal database | postgres.railway.internal:5432 |
| redis | Session/cache | redis.railway.internal |

**Shared Variables** (available to all services):
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL
ANTHROPIC_API_KEY
OPENAI_API_KEY
RESEND_API_KEY
MAIL_TO
MAIL_FROM
MAIL_USERNAME
MAIL_PASSWORD
ADMIN_SECRET
NEXT_PUBLIC_ADMIN_SECRET
DATABASE_URL
```

---

## Deployment Flow

```
Developer pushes to GitHub (main branch)
     |
     | GitHub webhook
     v
Railway detects new commit
     |
     |--- Builds web service (Next.js)
     |--- Builds api service (FastAPI)
     v
New containers deployed
     |
     v
Live at www.theveritaai.com
```

Typical deployment time: 3-5 minutes.

---

## Local Development Setup

**Prerequisites:**
- Node.js 18+
- Python 3.11+
- Redis (via Homebrew)

**Start frontend:**
```bash
cd web
npm install
npm run dev
# Runs at http://localhost:3000
```

**Start backend:**
```bash
brew services start redis
cd api
python -m uvicorn app.main:app --reload --port 8000
# Runs at http://localhost:8000
```

**Environment files:**
```
web/.env.local          # Frontend environment variables (local only)
api/.env                # Backend environment variables (local only)
```

Neither file is committed to GitHub — they stay local only.
