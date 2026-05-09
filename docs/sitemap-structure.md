# The Verita AI Institute — Site Structure & Sitemap

## Site URL

**Production:** https://www.theveritaai.com  
**API:** https://api-production-0fdc.up.railway.app  
**Admin:** https://www.theveritaai.com/admin  
**Chat:** https://www.theveritaai.com/chat  

---

## Navigation Structure

```
Main Nav:
├── AI Research          → /research
├── AI Education         → /education
├── Publications         → /publications
├── Our Purpose          → /about
├── The Institute        → /institute
├── Fellows              → /fellows
├── Partner with us      → /partner
└── [Chat Verita ↗]      → /chat  (button style)
```

---

## Page Map

### Homepage — /
**Type:** Server + Client component split  
**Dynamic content:** Ticker items (Supabase)  
**Static content:** Hero headline, focus area panels  
**Interactive:** ChatWidget (Claude AI agent)  

**Sections:**
1. Hero — "Truth in AI" headline + chat widget
2. Focus Areas — AI Research panel + AI Education panel
3. The Verita Research Agent — ChatWidget
4. Ticker bar — forthcoming publications and announcements

---

### AI Research — /research
**Type:** Client component  
**Dynamic content:** Pillars + research outputs (Supabase)  
**Interactive:** Research output table with modal  

**Sections:**
1. Hero — Market Reality (stats) + Verita Response (bullets)
2. Pillar 01 — Responsible AI (problem + research outputs table)
3. Pillar 02 — AI Governance (problem + research outputs table)
4. Pillar 03 — Future Workforce (problem + research outputs table)
5. Commission Research strip

**Anchor links:**
- `/research#responsible-ai`
- `/research#ai-governance`
- `/research#future-workforce`
- `/research#commission`

---

### AI Education — /education
**Type:** Client component  
**Dynamic content:** Education sections + items (Supabase)  
**Interactive:** Course table with modal, enquiry form  

**Sections:**
1. Hero — The Problem + Verita Response
2. Focus 01 — Aspiring Students (problem + course table)
3. Focus 02 — Experienced Workforce (problem + course table)
4. Focus 03 — Strategic Leadership (problem + course table)
5. Enquiry form

**Anchor links:**
- `/education#students`
- `/education#workforce`
- `/education#leadership`
- `/education#enquiry`

---

### Publications — /publications
**Type:** Client component  
**Dynamic content:** Research outputs (Supabase)  
**Interactive:** Search, pillar filter, status filter, modal  

**Sections:**
1. Hero — intro text
2. Search + filter bar
3. Publications table (chronological, most recent first)

---

### Our Purpose — /about
**Type:** Server component  
**Dynamic content:** None (static)  

**Sections:**
1. Who We Are — four principles (left) + about text (right)
2. Mission & Vision — two columns
3. Our Independence — five commitments
4. Contact — three email addresses + two locations

**Anchor links:**
- `/about#contact`

---

### The Institute — /institute
**Type:** Server component  
**Dynamic content:** Team members (Supabase)  

**Sections:**
1. Hero — who we are building
2. Founding Team — two column cards
3. Advisory Board — two column cards

---

### Fellows — /fellows
**Type:** Server component  
**Dynamic content:** None (static)  

**Sections:**
1. Hero — "Join the researchers asking the questions that matter"
2. Who it is for — three column cards
3. Fellowship types — three rows
4. Why join — three column cards
5. Apply CTA

---

### Partner with us — /partner
**Type:** Client component  
**Dynamic content:** None (static)  
**Interactive:** Partnership enquiry form  

**Sections:**
1. Hero — why partner (left) + three reasons (right)
2. Three partnership types (University, Enterprise, Policy)
3. Enquiry form
4. Current partners (placeholder)

---

### Chat Verita — /chat
**Type:** Client component  
**Dynamic content:** None  
**Interactive:** Full ChatWidget (Claude AI agent)  

**Sections:**
1. Hero — "The Verita Research Agent" heading
2. ChatWidget — full two-column layout

---

### Admin — /admin
**Type:** Client component  
**Access:** Password protected (ADMIN_SECRET)  
**Purpose:** Content management — process PDFs for RAG  

**Sections:**
1. Login screen
2. Publications table — shows all research outputs with chunk counts
3. Process PDF / Re-process buttons

---

## API Endpoints

**Base URL:** https://api-production-0fdc.up.railway.app

```
GET  /health                    # Health check
GET  /docs                      # Swagger UI (API documentation)

POST /contact/submit            # Submit contact form
     Body: { name, email, org, role, interest, message, form_type }

POST /chat/message              # Send message to Claude agent
     Body: { message }

GET  /admin/publications        # List all publications with chunk counts
     Header: x-admin-secret

POST /admin/process-pdf         # Process a PDF for RAG
     Header: x-admin-secret
     Body: { source_id, source_title, pdf_url, source_type }
```

---

## Environment Files Explained

### web/.env.local
Local development only — never committed to GitHub.
```
NEXT_PUBLIC_SUPABASE_URL=https://lkpbwkuqmxyztmkyrukn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ADMIN_SECRET=verita-admin-2025
```

### api/.env
Local development only — never committed to GitHub.
```
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
MAIL_TO=admin@theveritaai.com
MAIL_FROM=admin@theveritaai.com
MAIL_USERNAME=admin@theveritaai.com
MAIL_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_SECRET=verita-admin-2025
DATABASE_URL=postgresql+asyncpg://app:app@localhost:5432/app
NEXT_PUBLIC_SUPABASE_URL=https://lkpbwkuqmxyztmkyrukn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Railway Shared Variables
Set in Railway dashboard — available to all services in production.
Same variables as above but with production values.

---

## Supabase Database Schema

```sql
pillars (id, number, slug, title, problem_label, problem_headline, 
         problem_body, response_label, response_headline, response_body, 
         display_order, published, embedding, created_at)

research_outputs (id, pillar_id, title, status, date, publication_year,
                  pdf_url, is_public, description, display_order, 
                  embedding, created_at)

education_sections (id, number, slug, audience, problem_headline, 
                    problem_body, program_name, program_sub, tailored_note,
                    coming_soon, display_order, published, created_at)

education_items (id, section_id, title, type, status, description, 
                 duration, pdf_url, detail_url, coming_soon, display_order,
                 embedding, created_at)

ticker_items (id, text, active, display_order, created_at)

team_members (id, initials, name, role, bio, type, bg_color, 
              display_order, active, created_at)

partners (id, name, type, logo_url, website_url, active, 
          display_order, created_at)

document_chunks (id, source_id, source_type, source_title, chunk_index,
                 content, embedding, created_at)
```

---

## Supabase Storage Buckets

```
public-research     Published open-access research PDFs
                    Access: Public (anyone with URL can download)
                    Use for: Published papers, public reports

private-research    Proprietary/commissioned research PDFs  
                    Access: Private (requires authentication)
                    Use for: Client work, draft papers, confidential research

media               Logos, team photos, partner logos
                    Access: Public
                    Use for: Any images used on the site
```

---

## Google Search Console

**Property:** https://www.theveritaai.com  
**Sitemap submitted:** https://www.theveritaai.com/sitemap.xml  
**Verification method:** HTML meta tag in layout.tsx  

---

## Google Workspace Email

**Admin console:** https://admin.google.com  
**Primary inbox:** admin@theveritaai.com  
**Aliases (all route to admin):**
- hello@theveritaai.com
- research@theveritaai.com
- education@theveritaai.com
- fellows@theveritaai.com
