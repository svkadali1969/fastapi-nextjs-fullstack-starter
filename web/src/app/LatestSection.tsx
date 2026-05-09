"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", border: "#e8edf2", textBody: "#4a5568" };

const PILLAR_CONFIG = [
  { slug: "responsible-ai", label: "Responsible AI" },
  { slug: "ai-governance", label: "AI Governance" },
  { slug: "future-workforce", label: "Future Workforce" },
];

type Output = {
  id: string;
  title: string;
  status: string;
  date: string;
  pdf_url: string | null;
  description: string | null;
};

type PillarData = {
  slug: string;
  label: string;
  outputs: Output[];
};

function Modal({ output, onClose }: { output: Output; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", maxWidth: 580, width: "100%", padding: "40px", position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aaabb" }}>✕</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: "#9aaabb" }}>{output.date}</span>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 20 }}>
          {output.title}
        </div>
        {output.description ? (
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 28 }}>{output.description}</p>
        ) : (
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 28 }}>
            {output.status === "published"
              ? "This publication is available for download below."
              : output.status === "forthcoming"
              ? "This publication is currently in final preparation. Register your interest to receive early access when it is ready."
              : "This publication is in active development. Expected publication date will be confirmed in due course."}
          </p>
        )}
        <div style={{ borderTop: `1px solid ${v.border}`, paddingTop: 20, display: "flex", gap: 12, flexWrap: "wrap" as const }}>
          {output.status === "published" && output.pdf_url && (
            <a href={output.pdf_url} target="_blank" rel="noreferrer" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>
              Download PDF →
            </a>
          )}
          {output.status === "forthcoming" && (
            <a href="mailto:research@theveritaai.com" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>
              Register for early access →
            </a>
          )}
          <a href="mailto:research@theveritaai.com" style={{ background: "transparent", color: v.navy, padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, border: `1.5px solid ${v.navy}`, display: "inline-block" }}>
            Enquire about this research →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LatestSection() {
  const [pillars, setPillars] = useState<PillarData[]>([]);
  const [selectedOutput, setSelectedOutput] = useState<Output | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const results: PillarData[] = [];

      for (const config of PILLAR_CONFIG) {
        const { data: pillarData } = await supabase
          .from('pillars')
          .select('id')
          .eq('slug', config.slug)
          .single();

        if (!pillarData) continue;

        const { data: outputs } = await supabase
          .from('research_outputs')
          .select('id, title, status, date, pdf_url, description')
          .eq('pillar_id', pillarData.id)
          .order('display_order', { ascending: true })
          .limit(2);

        results.push({
          ...config,
          outputs: outputs || [],
        });
      }

      setPillars(results);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section style={{ padding: "64px 48px", borderBottom: `1px solid rgba(255,255,255,0.1)`, background: v.navy }}>
      {selectedOutput && <Modal output={selectedOutput} onClose={() => setSelectedOutput(null)} />}

      {/* Section header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>
          Research Updates
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
          Latest from The Verita.
        </div>
      </div>

      {/* Three cards */}
      <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {pillars.map((pillar) => (
          <div key={pillar.slug} style={{ background: "rgba(255,255,255,0.06)", padding: "28px", borderLeft: `2px solid ${v.blueLight}` }}>

            {/* Card header */}
            <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: v.blueLight, fontWeight: 600 }}>{pillar.label}</div>
            </div>

            {/* Outputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {pillar.outputs.map((output) => (
                <div key={output.id} style={{ paddingBottom: 16, borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "#e8f2fc", lineHeight: 1.4, marginBottom: 10 }}>
                    {output.title}
                  </div>
                  <button
                    onClick={() => setSelectedOutput(output)}
                    style={{ background: "none", border: "none", padding: 0, fontSize: 12, color: v.blueLight, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    View details →
                  </button>
                </div>
              ))}
            </div>

            {/* View all link */}
            <a href={`/research#${pillar.slug}`} style={{ fontSize: 12, color: "#5a8ab8", textDecoration: "none", marginTop: 8, display: "block" }}>
              View all {pillar.label} research →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
