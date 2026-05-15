-- The Verita AI Institute — Seed Data
-- Run this after schema.sql to populate the database with initial content
-- Last updated: May 2026

-- ============================================================
-- TICKER ITEMS
-- ============================================================

INSERT INTO ticker_items (text, active, display_order) VALUES
('Forthcoming — AI & the Future of Work: India Report 2025', true, 1),
('Applications open — Founding Research Fellows Program', true, 2),
('Launching — AI Launch Pad · Cohort 1', true, 3),
('Forthcoming — Responsible AI Governance Frameworks Report', true, 4);

-- ============================================================
-- RESEARCH PILLARS
-- ============================================================

INSERT INTO pillars (number, slug, title, problem_headline, problem_body, response_headline, response_body, display_order) VALUES
(
  'Research Pillar 01',
  'responsible-ai',
  'Responsible AI — The Five Pillars',
  'Most organizations treat responsible AI as a compliance exercise. It is not.',
  'Responsible AI requires capability across five dimensions — fairness, transparency, accountability, safety, and human oversight. Most organizations are addressing one or two, usually under regulatory pressure. The rest is ignored until something goes wrong. The result is AI deployment that creates legal, reputational, and operational risk that most boards do not yet understand.',
  'Responsible AI — The Five Pillars',
  'We study what it actually takes to build responsible AI as an organizational capability — not a checklist. Our research examines what mature responsible AI looks like across all five dimensions and how organizations get there.',
  1
),
(
  'Research Pillar 02',
  'ai-governance',
  'AI Governance for Sustainability — Not Regulation',
  'Organizations are waiting for regulation to tell them what to do. That is the wrong strategy.',
  'The regulatory landscape is fragmented, slow, and inconsistent across India, the US, and the EU. Organizations that wait for regulation to drive their governance decisions are taking on risk they cannot see yet. When regulation arrives — and it will — those without frameworks already in place will face disruption, not just compliance costs.',
  'AI Governance for Sustainability — Not Regulation',
  'We study the governance frameworks organizations can build today that will hold up under tomorrow''s regulation — and that create genuine competitive advantage in the meantime. Sustainable AI governance is not about compliance. It is about organizational resilience.',
  2
),
(
  'Research Pillar 03',
  'future-workforce',
  'Future Workforce — The Curriculum Is Decades Old',
  'The education system was not built for this. Neither was most corporate training.',
  'The four-year degree was designed for a different economy. Corporate L&D programs add AI as a module to existing frameworks. Neither approach produces the AI-ready workforce organizations actually need. The gap between AI ambition and workforce capability is widening — and most institutions are responding too slowly and too incrementally.',
  'Future Workforce — The Curriculum Is Decades Old',
  'We study what genuinely AI-native learning looks like — from curriculum design to workforce transformation. Not AI added to existing programs. Fundamentally new approaches to how people learn, qualify, and stay relevant in the AI era.',
  3
);

-- ============================================================
-- RESEARCH OUTPUTS
-- ============================================================

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'Watson''s Warning: The Responsible AI Lessons Organizations Cannot Afford to Ignore', 'published', 'Q1 2026', 2026,
'Case-based research examining IBM Watson''s high-profile AI failures and the responsible AI lessons every enterprise must learn. Covers the five pillars of responsible AI — fairness, transparency, accountability, safety, and human oversight — and what mature responsible AI capability looks like in practice.',
1 FROM pillars WHERE slug = 'responsible-ai';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'Responsible AI at Scale - The Five Tenets That Prevent Catastrophic Failure', 'published', 'Q1 2026', 2026,
'A practical framework for building responsible AI as an organizational capability across all five dimensions. Designed for risk, legal, and compliance leaders who need to move beyond compliance checklists to genuine responsible AI maturity.',
2 FROM pillars WHERE slug = 'responsible-ai';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'EU AI Act, India Guidelines, US Blueprint: A Comparative Framework', 'forthcoming', 'Q4 2025', 2025,
'For enterprises operating across India, the US, and Europe — a comparative analysis of three regulatory approaches and their practical implications. Helps organizations understand what compliance looks like across multiple jurisdictions simultaneously.',
3 FROM pillars WHERE slug = 'responsible-ai';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'Responsible AI Maturity: What the Data Shows', 'future', '2026', 2026,
'An independent benchmark study of responsible AI capability across enterprises in India and the United States. Examines what organizations are actually doing across the five pillars of responsible AI — and where the gaps are most acute.',
4 FROM pillars WHERE slug = 'responsible-ai';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'The Monitoring Gap: Model Drift, Concept Drift, and the Cost of Governance Neglect', 'published', 'Q1 2026', 2026,
'How leading organizations are building durable AI governance frameworks ahead of regulatory requirements — and why early movers are gaining competitive advantage. A practical guide for organizations that want to govern AI before regulation forces the issue.',
1 FROM pillars WHERE slug = 'ai-governance';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'Building AI Governance Before the Regulator Arrives', 'forthcoming', 'Q4 2025', 2025,
'How leading organizations are building durable AI governance frameworks ahead of regulatory requirements — and why early movers are gaining competitive advantage.',
2 FROM pillars WHERE slug = 'ai-governance';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'AI Governance Maturity Index: India & United States', 'future', '2026', 2026,
'The first independent comparative index of AI governance maturity across enterprises in India and the United States.',
3 FROM pillars WHERE slug = 'ai-governance';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'India''s AI Imperative - Building the Workforce of 2030', 'published', 'Q1 2026', 2026,
'The first comprehensive study of AI readiness across India''s workforce — what the data actually shows about the gap between organizational AI ambition and workforce capability.',
1 FROM pillars WHERE slug = 'future-workforce';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'Redesigning the Curriculum for the AI Era', 'forthcoming', 'Q4 2025', 2025,
'An independent research study on what genuinely AI-native curricula look like — from primary education through professional development.',
2 FROM pillars WHERE slug = 'future-workforce';

INSERT INTO research_outputs (pillar_id, title, status, date, publication_year, description, display_order)
SELECT id, 'The Manager Layer: Why AI Transformation Succeeds or Fails in the Middle', 'future', '2026', 2026,
'Case-based research on how AI deployment outcomes correlate with manager-level capability and organizational support structures.',
3 FROM pillars WHERE slug = 'future-workforce';

-- ============================================================
-- EDUCATION SECTIONS
-- ============================================================

INSERT INTO education_sections (number, slug, audience, problem_headline, problem_body, program_name, program_sub, tailored_note, coming_soon, display_order, show_on_homepage, homepage_order) VALUES
(
  'Education Focus 01', 'students', 'Aspiring Students',
  'Aspiring Students lack the AI literacy the workforce will require.',
  'Universities are still debating whether students should use AI at all. Meanwhile the economy is moving. The four-year degree in its current form was designed for a world where knowledge was scarce and credentials were the signal. In an AI era, both assumptions are breaking down. Students graduating in 2027 will enter a workforce where AI fluency is not a differentiator — it is a baseline requirement. Students need to embark on an AI Literacy to AI Leadership journey — with well-defined curriculum and clear objectives at every step of the way.',
  'AI Foundations Certificate',
  'A structured pathway from AI literacy to AI leadership — for students and early-career professionals entering an AI-native world.',
  'Programs are tailored to the specific needs of your institution or cohort.',
  'Further programs in development — including sector-specific AI literacy tracks.',
  1, true, 2
),
(
  'Education Focus 02', 'workforce', 'Experienced Workforce',
  'Most organizations cannot scale AI from pilot to production.',
  'Organizations are deploying AI faster than their people can adapt. Managers are redesigning workflows they don''t fully understand. Individual contributors are being asked to work alongside AI systems nobody has trained them to evaluate or govern. Corporate L&D is responding with one-day workshops and online modules that scratch the surface of a deep transformation. Organizations need to embark on an AI Pilot to Intelligent Enterprise journey — with a clear roadmap and measurable outcomes at every stage.',
  'AI in Practice',
  'For working professionals ready to apply AI to real business problems — from use case to production.',
  'All programs are tailored to the specific needs of your organization or cohort.',
  'Further functional specializations in development.',
  2, true, 1
),
(
  'Education Focus 03', 'leadership', 'Strategic Leadership',
  'Senior leaders are approving AI decisions they cannot evaluate.',
  'Boards are approving AI investments they cannot evaluate. Executives are commissioning AI strategies they cannot interrogate. The leadership layer is not yet equipped — and the consequences are already showing up in failed deployments and governance failures. Senior leadership must treat AI as a long-term strategic investment, not a cost reduction tool — grounded in Responsible AI principles and robust governance frameworks that create sustainable competitive advantage.',
  'Executive AI Leadership Program',
  'For senior leaders building AI-ready organizations — strategy, governance, and the workforce of the future.',
  'Programs are tailored to the specific needs of your leadership team and organizational context.',
  'Further programs for boards and non-executive directors in development.',
  3, false, 0
);

-- ============================================================
-- EDUCATION PROGRAMS
-- ============================================================

INSERT INTO education_programs (section_id, name, slug, duration, format, effort, status, show_on_homepage, homepage_order, homepage_eyebrow, homepage_body, homepage_tags, homepage_differentiator, display_order)
SELECT id, 'AI Launch Pad', 'ai-launch-pad', '4 weeks', 'Online', '3-4 hrs/week', 'active', true, 2,
'Online · Self-paced · 4 weeks',
'A structured 4-week program covering AI fundamentals, Generative AI concepts, and Agentic AI use cases — built from independent research and taught with practical business application at the center. For students and early-career professionals entering an AI-native world.',
ARRAY['AI Foundations', 'Generative AI', 'Agentic AI', 'Online'],
'Grounded in research. Built for the real world.',
1 FROM education_sections WHERE slug = 'students';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'AI in Business: From Concepts to Practice', 'ai-in-business', '8 weeks', 'Online', 'active', 2
FROM education_sections WHERE slug = 'students';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Generative AI in Practice', 'generative-ai-in-practice', '1 week', 'Online', 'active', 3
FROM education_sections WHERE slug = 'students';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Designing and Building AI Agents', 'designing-building-ai-agents', '3 weeks', 'Online', 'forthcoming', 4
FROM education_sections WHERE slug = 'students';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Explainable AI in Action', 'explainable-ai-in-action', '3 weeks', 'Online', 'forthcoming', 5
FROM education_sections WHERE slug = 'students';

INSERT INTO education_programs (section_id, name, slug, duration, format, effort, status, show_on_homepage, homepage_order, homepage_eyebrow, homepage_body, homepage_tags, homepage_differentiator, display_order)
SELECT id, 'AI in Practice: From Pilot to Production', 'ai-pilot-to-production', '2 weeks', 'In-person', '6-8 hrs/week', 'active', true, 1,
'Cohort 1 · September 2025 · New York',
'A two-week intensive taught by experienced business professionals — not academics. Every module is built around real deployment challenges, live case studies, and decisions you will actually face. Learn to identify use cases, scale pilots, and govern AI in your organization.',
ARRAY['In-person', 'New York', '2 weeks', '25 seats'],
'No theory. No vendor agenda. Business professionals teaching business professionals.',
1 FROM education_sections WHERE slug = 'workforce';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'AI in Finance', 'ai-in-finance', '3 weeks', 'Online', 'active', 2
FROM education_sections WHERE slug = 'workforce';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'AI in Supply Chain', 'ai-in-supply-chain', '3 weeks', 'Online', 'active', 3
FROM education_sections WHERE slug = 'workforce';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'AI in HR', 'ai-in-hr', '3 weeks', 'Online', 'active', 4
FROM education_sections WHERE slug = 'workforce';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Governance and Regulatory Compliance', 'governance-regulatory-compliance', '3 weeks', 'Online', 'active', 1
FROM education_sections WHERE slug = 'leadership';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Keeping the Workforce AI-Ready', 'keeping-workforce-ai-ready', '3 weeks', 'Online', 'active', 2
FROM education_sections WHERE slug = 'leadership';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Positioning AI for Long-Term Advantage', 'positioning-ai-long-term', '3 weeks', 'Online', 'active', 3
FROM education_sections WHERE slug = 'leadership';

INSERT INTO education_programs (section_id, name, slug, duration, format, status, display_order)
SELECT id, 'Building and Sustaining AI Leadership Capability', 'building-ai-leadership', '3 weeks', 'Online', 'active', 4
FROM education_sections WHERE slug = 'leadership';

-- ============================================================
-- EDUCATION MODULES
-- ============================================================

INSERT INTO education_modules (title, description, duration, display_order) VALUES
('Introduction to AI', 'What AI actually is — and what it is not. A clear, honest understanding of how AI systems work, where they come from, and why they matter. Covers the history of AI, key concepts, the difference between narrow and general AI, and how modern AI systems are built and trained. No technical background required.', '3 hours', 1),
('Predictive Models (ML)', 'A practical grounding in machine learning — how systems learn from data, make predictions, and improve over time. Covers supervised and unsupervised learning, model evaluation, and how to identify when ML is the right tool for a business problem.', '4 hours', 2),
('Introduction to LLM', 'How large language models work, where they come from, and what makes them different from earlier AI systems. Covers tokenization, transformers, training, and fine-tuning — explained for business professionals without a technical background.', '3 hours', 3),
('Generative AI Concepts', 'A practical overview of generative AI — how it creates text, images, code, and other content. Covers the key models, their capabilities and limitations, and how organizations are deploying generative AI responsibly and effectively.', '4 hours', 4),
('RAG and MCP', 'Retrieval-Augmented Generation and Model Context Protocol — how AI systems access and use external knowledge. Covers how RAG works, when to use it, and how MCP enables AI agents to connect with tools and data sources.', '4 hours', 5),
('Prompt Engineering', 'The art and science of communicating effectively with AI systems. Covers prompt design, chain-of-thought reasoning, few-shot learning, and how to get reliable, accurate outputs from large language models in business contexts.', '3 hours', 6),
('Agentic AI', 'How autonomous AI systems are designed, built, and deployed. Covers the architecture of AI agents, tool use, memory, planning, and how to evaluate and govern agent behavior responsibly in organizational settings.', '4 hours', 7),
('Responsible AI', 'AI systems reflect the choices of the people who build and deploy them. Covers the five pillars of responsible AI — fairness, transparency, accountability, safety, and human oversight — and what they mean in practice for organizations deploying AI.', '3 hours', 8),
('AI Ops', 'How to operate AI systems in production — monitoring, maintaining, and improving ML, LLM, and Agentic AI systems at scale. Covers model drift, performance monitoring, incident response, and the organizational structures that support reliable AI operations.', '4 hours', 9),
('AI Governance', 'How organizations build governance frameworks that manage AI risk without blocking AI value creation. Covers policy design, audit processes, regulatory alignment across India, US, and EU, and how to embed governance into day-to-day AI decision-making.', '3 hours', 10),
('How to Identify Business Use Cases for AI', 'A structured methodology for identifying, evaluating, and prioritizing AI use cases within an organization. Covers value mapping, feasibility assessment, data requirements, and how to build a business case for AI investment.', '4 hours', 11),
('Identifying and Scoping Business Use Cases', 'A deeper dive into scoping AI use cases for production deployment. Covers requirements gathering, data assessment, build vs buy decisions, vendor evaluation, and how to define success metrics for AI projects.', '4 hours', 12),
('Managing AI in Live Business Environments', 'How to manage AI systems once they are deployed — handling edge cases, managing user trust, responding to failures, and continuously improving AI performance in real business contexts.', '3 hours', 13);

-- ============================================================
-- PROGRAM MODULES (junction table)
-- ============================================================

-- AI Launch Pad modules
INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 1 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-launch-pad' AND m.title = 'Introduction to AI';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 2 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-launch-pad' AND m.title = 'Predictive Models (ML)';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 3 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-launch-pad' AND m.title = 'Introduction to LLM';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 4 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-launch-pad' AND m.title = 'Generative AI Concepts';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 5 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-launch-pad' AND m.title = 'Agentic AI';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 6 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-launch-pad' AND m.title = 'Responsible AI';

-- AI in Practice: From Pilot to Production modules
INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 1 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'Introduction to AI';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 2 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'Introduction to LLM';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 3 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'Generative AI Concepts';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 4 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'Prompt Engineering';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 5 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'RAG and MCP';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 6 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'How to Identify Business Use Cases for AI';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 7 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'Identifying and Scoping Business Use Cases';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 8 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'Managing AI in Live Business Environments';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 9 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'AI Ops';

INSERT INTO program_modules (program_id, module_id, display_order)
SELECT p.id, m.id, 10 FROM education_programs p, education_modules m
WHERE p.slug = 'ai-pilot-to-production' AND m.title = 'AI Governance';

-- ============================================================
-- TEAM MEMBERS
-- ============================================================

INSERT INTO team_members (initials, name, role, bio, type, bg_color, display_order) VALUES
('FD', 'Founder & Director', 'Founding · India & US', 'The Verita''s founder brings deep expertise in AI strategy, enterprise transformation, and the workforce challenges AI creates. Operating across India and the United States with a focus on building the intelligent enterprise.', 'founding', '#e6f0fb', 1),
('RD', 'Research Director', 'Hiring Now · PhD required', 'Leading The Verita''s research agenda across all three pillars. Responsible for research quality, publication standards, and academic partnerships.', 'founding', '#eaf2ea', 2),
('ED', 'Education Director', 'Hiring Now · India & US', 'Designing and delivering The Verita''s education programs across all three audience segments. Responsible for curriculum architecture, faculty relationships, and program delivery.', 'founding', '#fef3e2', 3),
('AI', 'AI Research Advisor', 'Research · India', 'Senior AI researcher validating research methodology and publication standards.', 'advisory', '#e6f0fb', 1),
('PE', 'Policy & Regulation Advisor', 'Policy · India or US', 'Background in AI policy or government. Connects The Verita to policy conversations in both markets.', 'advisory', '#eaf2ea', 2),
('EA', 'Enterprise Advisor', 'Industry · CHRO or CTO', 'Senior enterprise leader who has navigated AI transformation. Grounds the research agenda in organizational reality.', 'advisory', '#fef3e2', 3),
('UA', 'University Partner Advisor', 'Academic · India or US', 'Senior academic facilitating university research partnerships and joint publications.', 'advisory', '#f0eeff', 4);
