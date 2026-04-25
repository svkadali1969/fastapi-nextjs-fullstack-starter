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
  { num: "87%", label: "of executives say AI is deploying faster than their workforce is ready for it", source: "McKinsey Global Survey, 2024" },
  { num: "74%", label: "of organizations have no formal AI governance framework in place", source: "Gartner, 2024" },
  { num: "85%", label: "of AI projects fail due to poor data quality, incomplete data infrastructure, or misaligned data governance", source: "Gartner, 2024" },
  { num: "40%", label: "of current job skills will be disrupted within 3 years", source: "World Economic Forum, 2023" },
];

const RESPONSE_BULLETS = [
  {
    label: "Our Independence Research",
    body: "No vendor relationships. No sponsored findings. All policy research published openly. The Verita research is focused on three pillars where independent inquiry is most needed and least available.",
    color: v.blue,
  },
  {
    label: "Pillar 01 — Responsible AI",
    body: "We study what it takes to build responsible AI as a genuine organizational capability — across fairness, transparency, accountability, safety, and human oversight.",
    color: v.blueLight,
  },
  {
    label: "Pillar 02 — AI Governance",
    body: "We study the governance frameworks organizations can build today — before regulators force the issue — that create resilience and competitive advantage.",
    color: v.blueLight,
  },
  {
    label: "Pillar 03 — Future Workforce",
    body: "We study what genuinely AI-native learning looks like — from curriculum redesign to workforce transformation at organizational scale.",
    color: v.blueLight,
  },
];

const PILLARS = [
  {
    id: "fa1",
    num: "Responsible AI",
    problemLabel: "The Problem",
    problemHeadline: "Most organizations treat responsible AI as a compliance exercise. It is not.",
    problemBody: "Responsible AI requires capability across five dimensions — fairness, transparency, accountability, safety, and human oversight. Most organizations are addressing one or two, usually under regulatory pressure. The rest is ignored until something goes wrong. The result is AI deployment that creates legal, reputational, and operational risk that most boards do not yet understand.",
    responseLabel: "Our Research",
    responseHeadline: "Responsible AI — The Five Pillars",
    responseBody: "We study what it actually takes to build responsible AI as an organizational capability — not a checklist. Our research examines what mature responsible AI looks like across all five dimensions and how organizations get there.",
    research: [
      { title: "The Independent AI Governance Framework: A Practitioner's Guide", status: "forthcoming", date: "Q4 2025" },
      { title: "EU AI Act, India Guidelines, US Blueprint: A Comparative Framework", status: "forthcoming", date: "Q4 2025" },
      { title: "Responsible AI Maturity: What the Data Shows", status: "future", date: "2026" },
    ],
  },
  {
    id: "fa2",
    num: "AI Governance",
    problemLabel: "The Problem",
    problemHeadline: "Organizations are waiting for regulation to tell them what to do. That is the wrong strategy.",
    problemBody: "The regulatory landscape is fragmented, slow, and inconsistent across India, the US, and the EU. Organizations that wait for regulation to drive their governance decisions are taking on risk they cannot see yet. When regulation arrives — and it will — those without frameworks already in place will face disruption, not just compliance costs.",
    responseLabel: "Our Research",
    responseHeadline: "AI Governance for Sustainability — Not Regulation",
    responseBody: "We study the governance frameworks organizations can build today that will hold up under tomorrow's regulation — and that create genuine competitive advantage in the meantime. Sustainable AI governance is not about compliance. It is about organizational resilience.",
    research: [
      { title: "Building AI Governance Before the Regulator Arrives", status: "forthcoming", date: "Q4 2025" },
      { title: "AI Governance Maturity Index: India & United States", status: "future", date: "2026" },
      { title: "The Cost of Waiting: AI Governance Failures in Practice", status: "future", date: "2026" },
    ],
  },
  {
    id: "fa3",
    num: "Future Workforce",
    problemLabel: "The Problem",
    problemHeadline: "The education system was not built for this. Neither was most corporate training.",
    problemBody: "The four-year degree was designed for a different economy. Corporate L&D programs add AI as a module to existing frameworks. Neither approach produces the AI-ready workforce organizations actually need. The gap between AI ambition and workforce capability is widening — and most institutions are responding too slowly and too incrementally.",
    responseLabel: "Our Research",
    responseHeadline: "Future Workforce — The Curriculum Is Decades Old",
    responseBody: "We study what genuinely AI-native learning looks like — from curriculum design to workforce transformation. Not AI added to existing programs. Fundamentally new approaches to how people learn, qualify, and stay relevant in the AI era.",
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

      {/* Hero — problem left / response right */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>

        {/* Left — Market Reality with stats */}
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Market Reality</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 32 }}>
            The AI investment is happening.<br />The results are not.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {STATS.map((s) => (
              <div key={s.num} style={{ background: "rgba(255,255,255,0.06)", padding: "20px 24px", borderLeft: `3px solid ${v.blueLight}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, color: v.navy, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#4a6a8a", lineHeight: 1.5, marginTop: 6 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 4, fontStyle: "italic" }}>{s.source}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Verita Response */}
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Verita Response</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 28 }}>
            The model race is won.<br />The harder work<br />starts now.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {RESPONSE_BULLETS.map((b, i) => (
              <div key={b.label} style={{ background: "#fff", padding: "18px 20px", borderLeft: `3px solid ${i === 0 ? v.navy : v.blue}` }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, color: i === 0 ? v.navy : v.blueLight, fontWeight: 600, marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.65 }}>{b.body}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Three Pillars */}
      {PILLARS.map((pillar, index) => (
        <div key={pillar.id} id={pillar.id} style={{ borderBottom: `1px solid ${v.border}` }}>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

            {/* Left — The Problem */}
            <div style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "56px 48px", borderRight: `1px solid ${v.border}` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#c0392b", fontWeight: 500, marginBottom: 14 }}>{pillar.problemLabel} · {pillar.num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 16, fontStyle: "italic" }}>
                &ldquo;{pillar.problemHeadline}&rdquo;
              </div>
              <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8 }}>{pillar.problemBody}</p>
            </div>

            {/* Right — Our Research */}
            <div style={{ background: index % 2 === 0 ? v.bgSoft : "#fff", padding: "56px 48px" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>{pillar.responseLabel} · {pillar.num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 16 }}>{pillar.responseHeadline}</div>
              <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 28 }}>{pillar.responseBody}</p>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 14 }}>Research output</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {pillar.research.map((r) => (
                  <div key={r.title} style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "14px 18px", borderLeft: `3px solid ${r.status === "published" ? "#0f6e3a" : r.status === "forthcoming" ? "#c8a020" : v.blue}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <StatusBadge status={r.status} />
                      <span style={{ fontSize: 11, color: "#9aaabb" }}>{r.date}</span>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, color: v.navy, lineHeight: 1.4 }}>{r.title}</div>
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
