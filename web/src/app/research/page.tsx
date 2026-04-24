import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = { title: "Research — The Verita Institute for AI Research" };

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

function SectionRule({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
      <div style={{ flex: 1, height: 1, background: v.border }} />
      <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: v.blueLight, fontWeight: 500, whiteSpace: "nowrap" as const }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: v.border }} />
    </div>
  );
}

const STATS = [
  { num: "87%", label: "of executives say AI is deploying faster than their workforce is ready", source: "McKinsey Global Survey, 2024" },
  { num: "40%", label: "of current job skills will be disrupted within 3 years", source: "World Economic Forum, 2023" },
  { num: "74%", label: "of organizations have no formal AI governance framework in place", source: "Gartner, 2024" },
  { num: "85%", label: "of AI projects fail due to poor data quality, incomplete data infrastructure, or misaligned data governance", source: "Gartner, 2024" },
];

const PILLARS = [
  {
    id: "fa1",
    num: "Research Pillar 01",
    title: "Responsible AI — The Five Pillars",
    body: "Responsible AI is not a checklist. It is an organizational capability built across five dimensions: fairness, transparency, accountability, safety, and human oversight. Most organizations are addressing one or two. Our research studies what it actually takes to build all five — and what happens to organizations that don't.",
    questions: [
      "What does a mature responsible AI capability look like across all five dimensions — and how do organizations get there?",
      "How do fairness and transparency requirements differ across sectors and regulatory environments?",
      "What governance structures most effectively embed responsible AI into daily organizational decision-making?",
    ],
    meta: [
      { label: "Research status", value: "Active", sub: "Accepting founding research partners" },
      { label: "Geographic coverage", value: "India & United States", sub: "Comparative research across both markets" },
      { label: "Publication timeline", value: "Q4 2025", sub: "Governance Framework Toolkit" },
    ],
    cards: [
      { tag: "Responsible AI · Governance", badge: "Forthcoming 2025", badgeBg: "#fef9e7", badgeColor: "#8a6500", title: "The Independent AI Governance Framework: A Practitioner's Guide", body: "A practical governance framework for enterprises deploying AI — independent of any vendor or platform. Designed for risk, legal, and compliance leaders.", meta: "Governance Framework · Q4 2025", link: "Register for early access →" },
      { tag: "Responsible AI · Comparative", badge: "Working Paper", badgeBg: "#e6f0fb", badgeColor: "#1a5276", title: "EU AI Act, India Guidelines, US Blueprint: A Comparative Framework", body: "For enterprises operating across India, the US, and Europe — a comparative analysis of three regulatory approaches and their practical implications.", meta: "Comparative Study · Forthcoming 2025", link: "Register for early access →" },
    ],
  },
  {
    id: "fa2",
    num: "Research Pillar 02",
    title: "AI Governance for Sustainability — Not Regulation",
    body: "Waiting for regulation to drive AI governance is not a strategy — it is a risk. Our research focuses on the governance frameworks organizations can build today that will hold up under tomorrow's regulation, and that create genuine competitive advantage in the meantime. Sustainable AI governance is not about compliance. It is about organizational resilience.",
    questions: [
      "What governance frameworks are most effective at managing AI risk without blocking AI value creation?",
      "How do organizations build governance that is durable across changing regulatory landscapes in India, the US, and the EU?",
      "What is the relationship between AI governance maturity and long-term organizational performance?",
    ],
    meta: [
      { label: "Research status", value: "Active", sub: "Policy research published openly" },
      { label: "Geographic coverage", value: "India · US · EU", sub: "Comparative regulatory research" },
      { label: "Publication timeline", value: "Q4 2025", sub: "Governance Maturity Index" },
    ],
    cards: [
      { tag: "Governance · Enterprise", badge: "Forthcoming 2025", badgeBg: "#fef9e7", badgeColor: "#8a6500", title: "Building AI Governance Before the Regulator Arrives", body: "How leading organizations are building durable AI governance frameworks ahead of regulatory requirements — and why early movers are gaining competitive advantage.", meta: "Research Report · Q4 2025", link: "Register for early access →" },
      { tag: "Governance · Policy", badge: "In development", badgeBg: "#e6f0fb", badgeColor: "#1a5276", title: "AI Governance Maturity Index: India & United States", body: "The first independent comparative index of AI governance maturity across enterprises in India and the United States.", meta: "Index Report · Forthcoming 2026", link: "Express research interest →" },
    ],
  },
  {
    id: "fa3",
    num: "Research Pillar 03",
    title: "Future Workforce — The Curriculum Is Decades Old",
    body: "The methods we use to educate and train the workforce were designed for a different economy. Our research studies what innovative learning models look like for the AI era — not AI added to existing curricula, but fundamentally new approaches to how people learn, qualify, and stay relevant. The four-year degree in its current form was not built for this.",
    questions: [
      "What does a curriculum genuinely built for the AI era look like — and how different is it from what exists today?",
      "How do organizations build AI-ready workforces at the speed and scale the transition requires?",
      "What capabilities distinguish AI-ready managers and leaders — and can they be systematically developed?",
    ],
    meta: [
      { label: "Research status", value: "Active", sub: "Accepting founding research partners" },
      { label: "Geographic coverage", value: "India & United States", sub: "Comparative research across both markets" },
      { label: "Publication timeline", value: "Q4 2025", sub: "AI & the Future of Work: India Report" },
    ],
    cards: [
      { tag: "Future Workforce · India", badge: "Forthcoming 2025", badgeBg: "#fef9e7", badgeColor: "#8a6500", title: "AI & the Future of Work: India Report 2025", body: "The first comprehensive study of AI readiness across India's workforce — what the data actually shows about the gap between organizational AI ambition and workforce capability.", meta: "Flagship Report · Q4 2025", link: "Register for early access →" },
      { tag: "Future Workforce · Education", badge: "In development", badgeBg: "#e6f0fb", badgeColor: "#1a5276", title: "Redesigning the Curriculum for the AI Era", body: "An independent research study on what genuinely AI-native curricula look like — from primary education through professional development.", meta: "Research Report · Forthcoming 2026", link: "Express research interest →" },
    ],
  },
];

export default function ResearchPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero — two column */}
      <section className="two-col-grid page-section" style={{ padding: "64px 48px 56px", borderBottom: `1px solid ${v.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

        {/* Left — headline and principles */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Independent AI Research</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: v.navy, lineHeight: 1.1, marginBottom: 20 }}>
            The model race is won.<br />The harder work<br />starts now.
          </h1>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 28, maxWidth: 480 }}>
            The most consequential AI research today is not about building better models. The models exist. The harder questions — how organizations responsibly leverage their assets to create lasting value, how governance frameworks can be built before regulators force the issue, and how education systems can produce a workforce genuinely ready for the AI era — are largely unanswered. That is where The Verita&apos;s research agenda begins. Independent, rigorous, and funded by the question — not the answer.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["No vendor relationships", "No sponsored findings", "All policy research published openly", "Applied research available for co-publication"].map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 6, height: 6, background: v.blue, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
                <span style={{ fontSize: 13, color: "#4a6a8a", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {STATS.map((s) => (
            <div key={s.num} style={{ background: v.bgSoft, padding: "20px 24px", borderLeft: `3px solid ${v.blue}` }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, color: v.navy, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#4a6a8a", lineHeight: 1.5, marginTop: 6 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 4, fontStyle: "italic" }}>{s.source}</div>
            </div>
          ))}
        </div>

      </section>

      {/* Three Pillars */}
      {PILLARS.map((pillar, index) => (
        <div key={pillar.id} id={pillar.id} style={{ borderBottom: `1px solid ${v.border}` }}>

          {/* Pillar header */}
          <div className="pillar-header-grid" style={{ background: index % 2 === 0 ? v.bgSoft : "#fff", padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 56, borderBottom: `1px solid ${v.border}` }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>{pillar.num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.15, marginBottom: 16 }}>{pillar.title}</div>
              <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 24 }}>{pillar.body}</p>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 14 }}>Research questions we are investigating</div>
              {pillar.questions.map((q) => (
                <div key={q} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ color: v.blue, fontWeight: 600, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ fontSize: 13, color: v.textBody, lineHeight: 1.6, fontStyle: "italic" }}>{q}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {pillar.meta.map((m) => (
                <div key={m.label} style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "16px 18px", borderLeft: `3px solid ${v.blue}` }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 5 }}>{m.label}</div>
                  <div style={{ fontSize: 14, color: v.navy, fontWeight: 500 }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: "#6a7a8a", marginTop: 3 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Research cards */}
          <div style={{ padding: "40px 48px" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 24 }}>Forthcoming research — {pillar.num}</div>
            <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2, background: v.bgRule }}>
              {pillar.cards.map((c) => (
                <a key={c.title} href="#" style={{ background: "#fff", padding: "28px 24px", textDecoration: "none", display: "block" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>
                    {c.tag} <span style={{ background: c.badgeBg, color: c.badgeColor, fontSize: 10, padding: "2px 7px", fontWeight: 500, marginLeft: 4 }}>{c.badge}</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65, marginBottom: 16 }}>{c.body}</div>
                  <div style={{ fontSize: 11, color: "#9aaabb", marginBottom: 8 }}>{c.meta}</div>
                  <span style={{ fontSize: 12, color: v.blue, fontWeight: 500, display: "block" }}>{c.link}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      ))}

      {/* Commission strip */}
      <div id="commission" className="commission-grid" style={{ background: v.navy, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Commission Research</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: "#fff", lineHeight: 1.25, marginBottom: 14 }}>Have a specific AI question your organization needs answered independently?</div>
          <p style={{ fontSize: 14, color: "#a8c8e8", lineHeight: 1.75, marginBottom: 24 }}>The Verita takes on a small number of commissioned research engagements each quarter. You fund the question. We produce the answer the market can trust.</p>
          <Link href="/about#contact" style={{ background: "#fff", color: v.navy, padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>Discuss a research brief</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[{ step: "Step 01", title: "Submit a research brief", body: "Tell us your question, your focus area, and what you need to understand." }, { step: "Step 02", title: "We scope and agree terms", body: "We propose a methodology and timeline. Independence of findings is non-negotiable." }, { step: "Step 03", title: "Research and publication", body: "Commissioning partners receive early access, named partnership, and co-publication option." }].map((s) => (
            <div key={s.step} style={{ background: "rgba(255,255,255,0.06)", padding: "20px 22px", borderLeft: `2px solid ${v.blueLight}`, marginBottom: 2 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 7 }}>{s.step}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#e8f2fc", marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#7aaac8", lineHeight: 1.55 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fellows strip */}
      <section id="fellows" className="two-col-grid" style={{ padding: "64px 48px", borderBottom: `1px solid ${v.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, background: v.bgSoft }}>
        <div>
          <SectionRule label="Research Fellows" />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: v.navy, marginBottom: 14, lineHeight: 1.25 }}>Build your research career at the frontier of AI.</div>
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.75, marginBottom: 24 }}>The Verita&apos;s fellows program brings together researchers from AI, economics, public policy, and social science. Fellows contribute to published research and gain access to enterprise partners and policy networks in India and the US.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/about#fellows" style={{ background: v.navy, color: "#fff", padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>Apply for a fellowship</Link>
            <Link href="/about#fellows" style={{ background: "transparent", color: v.navy, padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, border: `1.5px solid ${v.navy}`, display: "inline-block" }}>Learn more</Link>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[{ title: "Founding Research Fellows", body: "Senior researchers with PhD-level credentials. Co-author institute publications. Applications open for 2025 cohort." }, { title: "Visiting Researchers", body: "Faculty and independent researchers on short-term appointments. Available year-round." }, { title: "Industry Research Fellows", body: "Experienced practitioners contributing sector knowledge to applied research projects." }].map((f) => (
            <div key={f.title} style={{ background: "#fff", padding: "18px 20px", borderLeft: `3px solid ${v.blue}` }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: v.navy, marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#6a7a8a", lineHeight: 1.55 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
