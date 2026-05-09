# The Verita AI Institute — Operations Guide

## Overview

This guide covers day-to-day operations for maintaining The Verita website — updating content, managing publications, processing PDFs, and deploying code changes.

---

## 1. Updating Dynamic Content (Supabase)

Most content on the site is stored in Supabase and can be updated without touching code.

**Access Supabase:** https://supabase.com → sign in → select theveritaai project

### Research Publications

To add a new research publication:

1. Go to **Table Editor** → **research_outputs**
2. Click **Insert row**
3. Fill in:
   - `pillar_id` — copy the UUID from the `pillars` table for the relevant pillar
   - `title` — full publication title
   - `status` — `published`, `forthcoming`, or `future`
   - `date` — e.g. `Q4 2025` or `2026`
   - `publication_year` — `2025` or `2026`
   - `description` — 2-3 sentence description shown in the modal
   - `display_order` — number for ordering within the pillar
4. Click **Save**
5. If publishing a PDF — see PDF Upload section below

To update an existing publication:
1. Find the row in **research_outputs**
2. Click on the field to edit
3. Click **Save**

---

### Education Courses

To add a new course to an education section:

1. Go to **Table Editor** → **education_items**
2. Click **Insert row**
3. Fill in:
   - `section_id` — UUID from `education_sections` for the right audience
   - `title` — course name
   - `type` — `module` or `specialization`
   - `status` — `active`, `forthcoming`, or `future`
   - `duration` — e.g. `3 weeks`, `8 weeks`
   - `description` — full course description shown in modal
   - `display_order` — ordering number
4. Click **Save**

---

### Homepage Ticker

To add or update ticker items:

1. Go to **Table Editor** → **ticker_items**
2. Edit existing rows or add new ones
3. Set `active` to `true` to show, `false` to hide
4. Update `display_order` to change the sequence

---

### Team Members

To add a new team member or advisor:

1. Go to **Table Editor** → **team_members**
2. Click **Insert row**
3. Fill in:
   - `initials` — 2 letters shown in avatar
   - `name` — full name or role title
   - `role` — role description shown under name
   - `bio` — brief biography
   - `type` — `founding`, `advisory`, or `fellow`
   - `bg_color` — hex color for avatar background
   - `display_order` — ordering number
   - `active` — `true` to show

---

### Partners

To add a new partner:

1. Go to **Table Editor** → **partners**
2. Click **Insert row**
3. Fill in name, type, logo_url, website_url
4. Set `active` to `true`

---

## 2. PDF Upload and Processing

### Step 1 — Upload PDF to Supabase Storage

1. Go to Supabase → **Storage** → **public-research** bucket
2. Click **Upload file**
3. Select your PDF
4. Click on the uploaded file → copy the **Public URL**

### Step 2 — Update the database record

1. Go to **Table Editor** → **research_outputs**
2. Find the relevant publication
3. Paste the PDF URL into the `pdf_url` field
4. If publishing: change `status` to `published`
5. Click **Save**

### Step 3 — Process PDF for RAG

1. Go to https://www.theveritaai.com/admin
2. Enter admin password
3. Find the publication in the list
4. Click **Process PDF**
5. Wait for "Successfully processed X chunks" message
6. The Research Agent can now answer questions from this PDF content

### Re-processing a PDF

If you update a PDF or want to refresh the embeddings:
1. Upload new PDF to Supabase Storage
2. Update `pdf_url` in the database
3. Go to admin panel → click **Re-process**

---

## 3. Updating Static Content (Code)

Some content is hardcoded in the source files and requires a code change to update.

**Homepage hero:**
- File: `web/src/app/HomeContent.tsx`
- Content: "Truth in AI" headline, focus area panel text, taglines

**Research page hero:**
- File: `web/src/app/research/page.tsx`
- Content: Stats (87%, 74%, 85%, 40%), hero headlines, response bullets

**Education page hero:**
- File: `web/src/app/education/page.tsx`
- Content: Hero problem/response text

**Our Purpose page:**
- File: `web/src/app/about/page.tsx`
- Content: All text — mission, vision, independence commitments, contact details

**Fellows page:**
- File: `web/src/app/fellows/page.tsx`
- Content: All text — fellowship types, why join, CTA

**Navigation:**
- File: `web/src/components/layout/Nav.tsx`
- Content: Nav links and order

**Footer:**
- File: `web/src/components/layout/Footer.tsx`
- Content: Footer links and sections

**Claude Agent system prompt (site links):**
- File: `api/app/api/routes/chat.py`
- Content: System prompt and site link map

---

## 4. Deploying Code Changes

### Normal workflow

```bash
# 1. Make your changes in VS Code
# 2. Save all files
# 3. In Terminal:
cd ~/fastapi-nextjs-fullstack-starter
git add .
git commit -m "Brief description of what changed"
git push
```

Railway automatically detects the push and deploys within 3-5 minutes.

### Check deployment status

1. Go to https://railway.com
2. Click on your project
3. Click **web** or **api** service
4. Click **Deployments** tab
5. Green = deployed successfully, Red = build failed

### If deployment fails

1. Click the failed deployment
2. Click **View logs**
3. Scroll to the error message
4. Fix the issue and push again

---

## 5. Generating Embeddings

### When to regenerate embeddings

- After adding new research outputs
- After updating pillar descriptions
- After adding new education items
- After processing new PDFs

### Run the embedding script

```bash
cd ~/fastapi-nextjs-fullstack-starter/api
python scripts/generate_embeddings.py
```

This generates embeddings for all items in:
- `research_outputs` table
- `pillars` table
- `education_items` table

### Process a specific PDF from command line

```bash
cd ~/fastapi-nextjs-fullstack-starter/api
python scripts/process_pdf.py "/path/to/file.pdf" "Publication Title" --type research
```

---

## 6. Email Management

### Accessing email

- Go to https://mail.google.com
- Sign in with `admin@theveritaai.com`
- All emails to hello@, research@, education@, fellows@ land here

### Google Workspace admin

- Go to https://admin.google.com
- Manage users, aliases, settings

### If contact forms stop sending emails

1. Check Railway logs for the api service
2. Check Resend dashboard at https://resend.com for failed sends
3. Verify `RESEND_API_KEY` is set in Railway Shared Variables

---

## 7. Managing the Research Agent

### Updating what the agent knows

The agent knows about:
1. **Pillar descriptions** — from Supabase `pillars` table (update directly)
2. **Research output titles** — from Supabase `research_outputs` (update directly)
3. **Education programs** — from Supabase `education_sections` (update directly)
4. **PDF content** — from `document_chunks` (process via admin panel)

### Adding new site links to agent responses

When you add new pages or sections:
1. Open `api/app/api/routes/chat.py`
2. Find the `SITE LINKS` section in the system prompt
3. Add the new URL
4. Save and push to GitHub

### Testing the agent locally

```bash
# Start the API
cd ~/fastapi-nextjs-fullstack-starter/api
python -m uvicorn app.main:app --reload --port 8000

# Open browser
http://localhost:8000/docs
# Use POST /chat/message to test
```

---

## 8. Google Search Console

**Access:** https://search.google.com/search-console

### Monthly checks

1. Click **Coverage** — ensure all pages are indexed, no errors
2. Click **Performance** — see which search terms drive traffic
3. Click **Sitemaps** — confirm sitemap is being crawled

### If pages aren't being indexed

1. Go to **URL Inspection**
2. Paste the page URL
3. Click **Request Indexing**

---

## 9. Security Checklist

### Change admin password

```
Railway → Shared Variables → update ADMIN_SECRET
Railway → Shared Variables → update NEXT_PUBLIC_ADMIN_SECRET
```
Both must match.

### API keys rotation

If any API key is compromised:
1. Generate new key from the provider (Anthropic, OpenAI, Resend)
2. Update in Railway → Shared Variables
3. Update in local `api/.env`
4. Redeploy api service

### Supabase Row Level Security

Currently tables are unrestricted (RLS disabled). For production security:
1. Go to Supabase → **Authentication** → **Policies**
2. Enable RLS on sensitive tables
3. Add policies for public read access

---

## 10. Backup and Recovery

### Database backup

Supabase automatically backs up the database daily on the free tier.

To manually export:
1. Go to Supabase → **SQL Editor**
2. Run queries to export data as needed

### Code backup

All code is in GitHub — the repository is the backup.

### Environment variables backup

Keep a secure copy of all API keys in a password manager. If Railway loses variables, you'll need to re-enter them all.

---

## Quick Reference

| Task | Where |
|---|---|
| Add publication | Supabase → research_outputs |
| Add course | Supabase → education_items |
| Update ticker | Supabase → ticker_items |
| Add team member | Supabase → team_members |
| Upload PDF | Supabase → Storage → public-research |
| Process PDF for RAG | www.theveritaai.com/admin |
| Deploy code changes | git add . && git commit && git push |
| Check deployment | railway.com → project → deployments |
| Check emails | mail.google.com |
| Check search indexing | search.google.com/search-console |
| Manage email | admin.google.com |
| Check API | api-production-0fdc.up.railway.app/docs |
