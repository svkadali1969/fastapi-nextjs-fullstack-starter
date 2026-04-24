import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = { title: "Research — The Verita Institute for AI Research" };

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const STATS = [
  { num: "74%", label: "of organizations have no formal AI governance framework in place", source: "Gartner, 2024" },
  { num: "85%", label: "of AI projects fail due to poor data quality, incomplete data infrastructure, or misaligned data governance", source: "Gartner, 2024" },
  { num: "40%", label: "of current job skills will be disrupted within 3 years", source: "World Economic Forum, 2023" },
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
    research: [
      { title: "The Independent AI Governance Framework: A Practitioner's Guide", status: "forthcoming", date: "Q4 2025" },
      { title: "EU AI Act, India Guidelines, US Blueprint: A Comparative Framework", status: "forthcoming", date: "Q4 2025" },
      { title: "Responsible AI Maturity: What the Data Shows", status: "future", date: "2026" },
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
    research: [
      { title: "Building AI Governance Before the Regulator Arrives", status: "forthcoming", date: "Q4 2025" },
      { title: "AI Governance Maturity Index: India & United States", status: "future", date: "2026" },
      { title: "The Cost of Waiting: AI Governance Failures in Practice", status: "future", date: "2026" },
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
    research: [
      { title: "AI & the Future of Work: India Report 2025", status: "forthcoming", date: "Q4 2025" },
      { title: "Redesigning the Curriculum for the AI Era", status: "future", date: "2026" },
      { title: "The Manager Layer: Why AI Transformation Succeeds or Fails in the Middle", status: "future", date: "2026" },
    ],
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    published: { bg: "#e6f9ef", color: "#0f6e3a", label: "Published" },
    forthcoming: { bg: "#fef9e7", color: "#8a6500", label: "Forthcoming" },
    future: { bg: v.bluePale, color: "#1a5276", label: "In development" },
  };
  const s = styles[status];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 10, padding: "2px 8px", fontWeight: 500, letterSpacing: 0.5, whiteSpace: "nowrap" as const }}>
      {s.label}
    </span>
  );
}

export default function ResearchPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero — two column */}
      <section className="two-col-grid" style={{ padding: "64px 48px 56px", borderBottom: `1px solid ${v.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

        {/* Left */}
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
            <div key={s.num} style={{ background: v.bgSoft, padding: "24px 28px", borderLeft: `3px solid ${v.blue}` }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 600, color: v.navy, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#4a6a8a", lineHeight: 1.5, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 5, fontStyle: "italic" }}>{s.source}</div>
            </div>
          ))}
        </div>

      </section>

      {/* Three Pillars */}
      {PILLARS.map((pillar, index) => (
        <div key={pillar.id} id={pillar.id} style={{ borderBottom: `1px solid ${v.border}`, background: index % 2 === 0 ? v.bgSoft : "#fff" }}>
          <div className="two-col-grid" style={{ padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>

            {/* Left — pillar description */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>{pillar.num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: v.navy, lineHeight: 1.15, marginBottom: 16 }}>{pillar.title}</div>
              <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 24 }}>{pillar.body}</p>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 14 }}>Research questions we are investigating</div>
              {pillar.questions.map((q) => (
                <div key={q} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ color: v.blue, fontWeight: 600, flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 13, color: v.textBody, lineHeight: 1.6, fontStyle: "italic" }}>{q}</span>
                </div>
              ))}
            </div>

            {/* Right — research list */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 16 }}>Research output</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {pillar.research.map((r) => (
                  <div key={r.title} style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "16px 20px", borderLeft: `3px solid ${r.status === "published" ? "#0f6e3a" : r.status === "forthcoming" ? "#c8a020" : v.blue}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <StatusBadge status={r.status} />
                      <span style={{ fontSize: 11, color: "#9aaabb" }}>{r.date}</span>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: v.navy, lineHeight: 1.4 }}>{r.title}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Commission strip */}
      <div id="commission" className="two-col-grid" style={{ background: v.navy, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
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

      <Footer />
    </div>
  );
}
