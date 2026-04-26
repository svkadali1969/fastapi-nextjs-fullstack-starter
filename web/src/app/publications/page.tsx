import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Publications — The Verita Institute for AI Research",
  description: "A chronological record of The Verita's independent AI research publications across responsible AI, governance, and the future workforce.",
};

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const PILLAR_COLORS: Record<string, string> = {
  "Responsible AI": v.blue,
  "AI Governance": "#7b5ea7",
  "Future Workforce": "#2e8b57",
};

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

export default async function PublicationsPage() {
  const { data: outputs } = await supabase
    .from('research_outputs')
    .select(`
      *,
      pillars (title, slug)
    `)
    .order('publication_year', { ascending: false })
    .order('display_order', { ascending: true });

  // Group by year
  const grouped: Record<string, any[]> = {};
  outputs?.forEach((item) => {
    const year = String(item.publication_year || '2026');
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  });

  const getPillarName = (slug: string) => {
    const map: Record<string, string> = {
      'responsible-ai': 'Responsible AI',
      'ai-governance': 'AI Governance',
      'future-workforce': 'Future Workforce',
    };
    return map[slug] || slug;
  };

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
          All policy research is published openly. Applied corporate research may be proprietary for up to six months — after which it is published here.
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
        {Object.entries(grouped).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, items]) => (
          <div key={year} style={{ marginTop: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: v.navy }}>{year}</div>
              <div style={{ flex: 1, height: 1, background: v.border }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {items.map((item) => {
                const pillarName = getPillarName(item.pillars?.slug || '');
                return (
                  <div key={item.id} className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, background: v.bgSoft, padding: "24px 28px", alignItems: "start" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#9aaabb", marginBottom: 8 }}>{item.date}</div>
                      <StatusBadge status={item.status} />
                      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: PILLAR_COLORS[pillarName] || v.blue, flexShrink: 0, display: "inline-block" }} />
                        <span style={{ fontSize: 11, color: "#6a7a8a", fontWeight: 500 }}>{pillarName}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: v.navy, lineHeight: 1.35, marginBottom: 8 }}>{item.title}</div>
                      {item.status === "published" && item.pdf_url && (
                        <a href={item.pdf_url} style={{ fontSize: 12, color: v.blue, fontWeight: 500, textDecoration: "none", marginTop: 10, display: "inline-block" }}>Download PDF →</a>
                      )}
                      {item.status === "forthcoming" && (
                        <a href="mailto:research@theveritaai.com" style={{ fontSize: 12, color: v.blue, fontWeight: 500, textDecoration: "none", marginTop: 10, display: "inline-block" }}>Register for early access →</a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* No published yet notice */}
        <div style={{ marginTop: 56, padding: "32px 36px", background: v.bgSoft, borderLeft: `3px solid ${v.blue}` }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: v.navy, marginBottom: 8 }}>No publications yet.</div>
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.7 }}>The Verita is at the founding stage. Our first publications are expected in Q4 2025. Register your interest at <a href="mailto:research@theveritaai.com" style={{ color: v.blue, textDecoration: "none", fontWeight: 500 }}>research@theveritaai.com</a> to receive early access when they are ready.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}