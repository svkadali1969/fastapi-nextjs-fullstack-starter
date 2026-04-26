"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

type Publication = {
  id: string;
  title: string;
  status: string;
  date: string;
  publication_year: number;
  pdf_url: string | null;
  is_public: boolean;
  display_order: number;
  pillars: { title: string; slug: string } | null;
};

const PILLAR_COLORS: Record<string, string> = {
  "responsible-ai": v.blue,
  "ai-governance": "#7b5ea7",
  "future-workforce": "#2e8b57",
};

const PILLAR_NAMES: Record<string, string> = {
  "responsible-ai": "Responsible AI",
  "ai-governance": "AI Governance",
  "future-workforce": "Future Workforce",
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    published: { bg: "#e6f9ef", color: "#0f6e3a", label: "Published" },
    forthcoming: { bg: "#fef9e7", color: "#8a6500", label: "Forthcoming" },
    future: { bg: v.bluePale, color: "#1a5276", label: "In development" },
  };
  const s = styles[status] || styles.future;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 10, padding: "2px 8px", fontWeight: 500, letterSpacing: 0.5, whiteSpace: "nowrap" as const }}>
      {s.label}
    </span>
  );
}

function Modal({ pub, onClose }: { pub: Publication; onClose: () => void }) {
  const pillarSlug = pub.pillars?.slug || '';
  const pillarName = PILLAR_NAMES[pillarSlug] || '';
  const pillarColor = PILLAR_COLORS[pillarSlug] || v.blue;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", maxWidth: 580, width: "100%", padding: "40px", position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aaabb" }}>✕</button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <StatusBadge status={pub.status} />
          <span style={{ fontSize: 12, color: "#9aaabb" }}>{pub.date}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: pillarColor, display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#6a7a8a", fontWeight: 500 }}>{pillarName}</span>
          </div>
        </div>

        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 20 }}>
          {pub.title}
        </div>

        <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 28 }}>
          {pub.status === "published"
            ? "This publication is available for download below."
            : pub.status === "forthcoming"
            ? "This publication is currently in final preparation. Register your interest to receive early access when it is ready."
            : "This publication is in active development. Expected publication date will be confirmed in due course."}
        </p>

        <div style={{ borderTop: `1px solid ${v.border}`, paddingTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {pub.status === "published" && pub.pdf_url && (
            <a href={pub.pdf_url} target="_blank" rel="noreferrer" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>
              Download PDF →
            </a>
          )}
          {pub.status === "forthcoming" && (
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

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filtered, setFiltered] = useState<Publication[]>([]);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [search, setSearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('research_outputs')
        .select('*, pillars(title, slug)')
        .order('publication_year', { ascending: false })
        .order('display_order', { ascending: true });
      setPublications(data || []);
      setFiltered(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let results = publications;
    if (search) {
      results = results.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (pillarFilter !== "all") {
      results = results.filter(p => p.pillars?.slug === pillarFilter);
    }
    if (statusFilter !== "all") {
      results = results.filter(p => p.status === statusFilter);
    }
    setFiltered(results);
  }, [search, pillarFilter, statusFilter, publications]);

  const selectStyle = { padding: "10px 14px", border: `1px solid ${v.border}`, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: v.navy, background: "#fff", outline: "none", appearance: "none" as const, cursor: "pointer", minWidth: 160 };

  if (loading) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Nav />
      <div style={{ padding: "64px 48px", color: v.textBody }}>Loading...</div>
      <Footer />
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {selectedPub && <Modal pub={selectedPub} onClose={() => setSelectedPub(null)} />}

      {/* Hero */}
      <section style={{ padding: "64px 48px 56px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Publications</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: v.navy, lineHeight: 1.1, marginBottom: 16, maxWidth: 640 }}>
          A chronological record of The Verita&apos;s independent research.
        </div>
        <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, maxWidth: 560 }}>
          All policy research is published openly. Applied corporate research may be proprietary for up to six months — after which it is published here.
        </p>
      </section>

      {/* Search and filters */}
      <section style={{ padding: "24px 48px", borderBottom: `1px solid ${v.border}`, background: "#fff", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search publications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 240, padding: "10px 14px", border: `1px solid ${v.border}`, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: v.navy, background: "#fff", outline: "none" }}
        />
        <select value={pillarFilter} onChange={(e) => setPillarFilter(e.target.value)} style={selectStyle}>
          <option value="all">All pillars</option>
          <option value="responsible-ai">Responsible AI</option>
          <option value="ai-governance">AI Governance</option>
          <option value="future-workforce">Future Workforce</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="forthcoming">Forthcoming</option>
          <option value="future">In development</option>
        </select>
        <div style={{ fontSize: 13, color: "#9aaabb", whiteSpace: "nowrap" as const }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </div>
      </section>

      {/* Table */}
      <section style={{ padding: "0 48px 72px" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "80px 140px 1fr 110px 100px", gap: 16, padding: "16px 20px", borderBottom: `2px solid ${v.border}`, marginTop: 32 }}>
          {["Year", "Pillar", "Title", "Status", ""].map((h) => (
            <div key={h} style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#9aaabb", fontWeight: 500 }}>{h}</div>
          ))}
        </div>

        {/* Table rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "32px 20px", color: "#9aaabb", fontSize: 14 }}>No publications match your search.</div>
          ) : (
            filtered.map((pub) => {
              const pillarSlug = pub.pillars?.slug || '';
              const pillarName = PILLAR_NAMES[pillarSlug] || '—';
              const pillarColor = PILLAR_COLORS[pillarSlug] || v.blue;
              return (
                <div
                  key={pub.id}
                  onClick={() => setSelectedPub(pub)}
                  style={{ display: "grid", gridTemplateColumns: "80px 140px 1fr 110px 100px", gap: 16, padding: "16px 20px", background: v.bgSoft, borderLeft: `3px solid ${pillarColor}`, alignItems: "center", cursor: "pointer" }}
                >
                  <div style={{ fontSize: 13, color: "#6a7a8a" }}>{pub.publication_year}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: pillarColor, flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: "#6a7a8a", fontWeight: 500, lineHeight: 1.3 }}>{pillarName}</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: v.navy, lineHeight: 1.4 }}>{pub.title}</div>
                  <div><StatusBadge status={pub.status} /></div>
                  <div style={{ fontSize: 12, color: v.blue, fontWeight: 500 }}>View details →</div>
                </div>
              );
            })
          )}
        </div>

        {/* No published yet notice */}
        {filtered.filter(p => p.status === "published").length === 0 && (
          <div style={{ marginTop: 40, padding: "28px 32px", background: v.bgSoft, borderLeft: `3px solid ${v.blue}` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: v.navy, marginBottom: 8 }}>No published papers yet.</div>
            <p style={{ fontSize: 13, color: v.textBody, lineHeight: 1.7 }}>Our first publications are expected in Q4 2025. Register your interest at <a href="mailto:research@theveritaai.com" style={{ color: v.blue, textDecoration: "none", fontWeight: 500 }}>research@theveritaai.com</a></p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
