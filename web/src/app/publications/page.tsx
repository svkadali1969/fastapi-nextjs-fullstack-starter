import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = { title: "Publications — The Verita Institute for AI Research" };

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const PUBLICATIONS = [
  {
    year: "2025",
    items: [
      { status: "forthcoming", month: "Q4 2025", title: "AI & the Future of Work: India Report 2025", pillar: "Future Workforce", type: "Flagship Report", desc: "The first comprehensive study of AI readiness across India's workforce — what the data actually shows about the gap between organizational AI ambition and workforce capability." },
      { status: "forthcoming", month: "Q4 2025", title: "The Independent AI Governance Framework: A Practitioner's Guide", pillar: "Responsible AI", type: "Governance Framework", desc: "A practical governance framework for enterprises deploying AI — independent of any vendor or platform. Designed for risk, legal, and compliance leaders." },
      { status: "forthcoming", month: "Q4 2025", title: "Building AI Governance Before the Regulator Arrives", pillar: "AI Governance", type: "Research Report", desc: "How leading organizations are building durable AI governance frameworks ahead of regulatory requirements — and why early movers are gaining competitive advantage." },
      { status: "forthcoming", month: "Q4 2025", title: "EU AI Act, India Guidelines, US Blueprint: A Comparative Framework", pillar: "Responsible AI", type: "Comparative Study", desc: "For enterprises operating across India, the US, and Europe — a comparative analysis of three regulatory approaches and their practical implications." },
    ],
  },
  {
    year: "2026",
    items: [
      { status: "future", month: "2026", title: "Redesigning the Curriculum for the AI Era", pillar: "Future Workforce", type: "Research Report", desc: "An independent research study on what genuinely AI-native curricula look like — from primary education through professional development." },
      { status: "future", month: "2026", title: "AI Governance Maturity Index: India & United States", pillar: "AI Governance", type: "Index Report", desc: "The first independent comparative index of AI governance maturity across enterprises in India and the United States." },
      { status: "future", month: "2026", title: "The Manager Layer: Why AI Transformation Succeeds or Fails in the Middle", pillar: "Future Workforce", type: "Sector Study", desc: "Case-based research on how AI deployment outcomes correlate with manager-level capability and organizational support structures." },
      { status: "future", month: "2026", title: "Responsible AI Maturity: What the Data Shows", pillar: "Responsible AI", type: "Research Report", desc: "An independent benchmark study of responsible AI capability across enterprises in India and the United States." },
      { status: "future", month: "2026", title: "The Cost of Waiting: AI Governance Failures in Practice", pillar: "AI Governance", type: "Research Report", desc: "Case-based research on organizations that delayed AI governance — and what the consequences looked like." },
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

const PILLAR_COLORS: Record<string, string> = {
  "Responsible AI": v.blue,
  "AI Governance": "#7b5ea7",
  "Future Workforce": "#2e8b57",
};

export default function PublicationsPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "64px 48px 56px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Publications</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 500, color: v.navy, lineHeight: 1.1, marginBottom: 16, maxWidth: 640 }}>
          A chronological record of The Verita&apos;s independent research.
        </div>
        <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, maxWidth: 560, marginBottom: 32 }}>
          All policy research is published openly. Applied corporate research may be proprietary for up to six months — after which it is published here. Research is organized chronologically across The Verita&apos;s three research pillars.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {Object.entries(PILLAR_COLORS).map(([pillar, color]) => (
            <div key={pillar} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontSize: 13, color: v.textBody, fontWeight: 500 }}>{pillar}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Publications list */}
      <section style={{ padding: "0 48px 72px" }}>
        {PUBLICATIONS.map((group) => (
          <div key={group.year} style={{ marginTop: 56 }}>
            {/* Year header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: v.navy }}>{group.year}</div>
              <div style={{ flex: 1, height: 1, background: v.border }} />
            </div>

            {/* Publications */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {group.items.map((item) => (
                <div key={item.title} className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, background: v.bgSoft, padding: "24px 28px", alignItems: "start" }}>
                  {/* Left — meta */}
                  <div>
                    <div style={{ fontSize: 12, color: "#9aaabb", marginBottom: 8 }}>{item.month}</div>
                    <StatusBadge status={item.status} />
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: PILLAR_COLORS[item.pillar] || v.blue, flexShrink: 0, display: "inline-block" }} />
                      <span style={{ fontSize: 11, color: "#6a7a8a", fontWeight: 500 }}>{item.pillar}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 4 }}>{item.type}</div>
                  </div>

                  {/* Right — content */}
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: v.navy, lineHeight: 1.35, marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65 }}>{item.desc}</div>
                    {item.status === "published" && (
                      <a href="#" style={{ fontSize: 12, color: v.blue, fontWeight: 500, textDecoration: "none", marginTop: 10, display: "inline-block" }}>Download PDF →</a>
                    )}
                    {item.status === "forthcoming" && (
                      <a href="mailto:research@theverita.ai" style={{ fontSize: 12, color: v.blue, fontWeight: 500, textDecoration: "none", marginTop: 10, display: "inline-block" }}>Register for early access →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* No published yet notice */}
        <div style={{ marginTop: 56, padding: "32px 36px", background: v.bgSoft, borderLeft: `3px solid ${v.blue}` }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: v.navy, marginBottom: 8 }}>No publications yet.</div>
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.7 }}>The Verita is at the founding stage. Our first publications are expected in Q4 2025. Register your interest at <a href="mailto:research@theverita.ai" style={{ color: v.blue, textDecoration: "none", fontWeight: 500 }}>research@theverita.ai</a> to receive early access when they are ready.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
