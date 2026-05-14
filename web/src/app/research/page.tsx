"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const STATS = [
  { num: "87%", label: "of executives say AI is deploying faster than their workforce is ready for it", source: "McKinsey Global Survey, 2024" },
  { num: "74%", label: "of organizations have no formal AI governance framework in place", source: "Gartner, 2024" },
  { num: "85%", label: "of AI projects fail due to poor data quality, incomplete data infrastructure, or misaligned data governance", source: "Gartner, 2024" },
  { num: "40%", label: "of current job skills will be disrupted within 3 years", source: "World Economic Forum, 2023" },
];

const RESPONSE_BULLETS = [
  { label: "Our Independence", body: "No vendor relationships. No sponsored findings. All policy research published openly. The Verita is focused on three research pillars where independent inquiry is most needed and least available." },
  { label: "Pillar 01 — Responsible AI", body: "We study what it takes to build responsible AI as a genuine organizational capability — across fairness, transparency, privacy, safety and accountability." },
  { label: "Pillar 02 — AI Governance", body: "We study the governance frameworks organizations can build today — before regulators force the issue — that create resilience and competitive advantage." },
  { label: "Pillar 03 — Future Workforce", body: "We study what genuinely AI-native learning looks like — from curriculum redesign to workforce transformation at organizational scale." },
];

type ResearchOutput = {
  id: string;
  title: string;
  status: string;
  date: string;
  pdf_url: string | null;
  description: string | null;
  display_order: number;
};

type ResearchOutput = {
  id: string;
  title: string;
  status: string;
  date: string;
  pdf_url: string | null;
  display_order: number;

};

type Pillar = {
  id: string;
  slug: string;
  number: string;
  problem_label: string;
  problem_headline: string;
  problem_body: string;
  response_label: string;
  response_headline: string;
  response_body: string;
  display_order: number;
  research_outputs: ResearchOutput[];
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

function Modal({ output, onClose }: { output: ResearchOutput; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", maxWidth: 580, width: "100%", padding: "40px", position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aaabb" }}>✕</button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <StatusBadge status={output.status} />
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

       
        <div style={{ borderTop: `1px solid ${v.border}`, paddingTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
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

export default function ResearchPage() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [selectedOutput, setSelectedOutput] = useState<ResearchOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [researchForm, setResearchForm] = useState({ name: "", email: "", org: "", message: "" });
  const [researchSubmitted, setResearchSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('pillars')
        .select('*, research_outputs(*)')
        .order('display_order');
      setPillars(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

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

      {selectedOutput && <Modal output={selectedOutput} onClose={() => setSelectedOutput(null)} />}

      {/* Hero — problem left / response right */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}`, alignItems: "start" }}>

      {/* Left — Image */}
      <div style={{ background: v.bgSoft, borderRight: `1px solid ${v.border}`, display: "flex", flexDirection: "column", padding: "64px 48px 0" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#c0392b", fontWeight: 500, marginBottom: 16 }}>The Market Reality</div>
         <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 20 }}>
              The AI investment is happening. <br />The results are not.
          </div>
        <img
          src="https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/research_6.png"
          alt="The AI Readiness Gap"
          style={{ width: "100%", objectFit: "contain", objectPosition: "top center", display: "block", marginTop: "auto" }}
        />
      </div>

        <div style={{ background: "#fff", padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Verita Response</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 20 }}>
              The model race is won.<br />The harder work starts now.
            </div>
            <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 24 }}>
              The last decade produced extraordinary advances in AI models. The next decade will be defined by how well organizations apply them — at scale, responsibly, and in ways that create lasting value. Governing AI before regulation forces the issue. Building workforces ready for the AI era. These require significant independent research — and that is exactly what The Verita Institute is built to produce.
            </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>         

            {RESPONSE_BULLETS.map((b, i) => (
              <div key={b.label} style={{ background: v.bgSoft, padding: "18px 20px", borderLeft: `3px solid ${i === 0 ? v.navy : v.blue}` }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, color: i === 0 ? v.navy : v.blueLight, fontWeight: 600, marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.65 }}>{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      {pillars.map((pillar, index) => {
        const outputs = [...(pillar.research_outputs || [])].sort((a, b) => a.display_order - b.display_order);
        return (
          <div key={pillar.id} id={pillar.slug} style={{ borderBottom: `1px solid ${v.border}` }}>
            <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

              {/* Left — The Problem */}
              <div style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "56px 48px", borderRight: `1px solid ${v.border}` }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#c0392b", fontWeight: 500, marginBottom: 14 }}>{pillar.problem_label} · {pillar.number}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 16, fontStyle: "italic" }}>
                  &ldquo;{pillar.problem_headline}&rdquo;
                </div>
                <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8 }}>{pillar.problem_body}</p>
                {(() => {
                  const images: Record<string, string> = {
                    'responsible-ai': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/resp_ai_shield_169_1.png',
                    'ai-governance': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/governance_169_1.png',
                    'future-workforce': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/education_gap_2.png',
                  };
                  return images[pillar.slug] ? (
                    <img
                      src={images[pillar.slug]}
                      alt={pillar.title}  
                      style={{ 
                        width: "100%", 
                        maxHeight: 280,
                        objectFit: "contain", 
                        objectPosition: "center",
                        display: "block", 
                        borderRadius: 4, 
                        marginTop: 32
                      }}                    />
                  ) : null;
                })()}
                </div>
              {/* Right — Our Research with table */}
              <div style={{ background: index % 2 === 0 ? v.bgSoft : "#fff", padding: "56px 48px" }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>{pillar.response_label} · {pillar.number}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 16 }}>{pillar.response_headline}</div>
                <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 24 }}>{pillar.response_body}</p>

                {/* Table header */}
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 12 }}>Research output</div>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 110px 100px", gap: 8, padding: "8px 12px", borderBottom: `2px solid ${v.border}`, marginBottom: 4 }}>
                  {["Date", "Title", "Status", ""].map((h) => (
                    <div key={h} style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: "#9aaabb", fontWeight: 500 }}>{h}</div>
                  ))}
                </div>

                {/* Scrollable rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 280, overflowY: "auto" }}>
                  {outputs.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedOutput(r)}
                      style={{ display: "grid", gridTemplateColumns: "80px 1fr 110px 100px", gap: 8, padding: "12px", background: index % 2 === 0 ? "#fff" : v.bgSoft, borderLeft: `3px solid ${r.status === "published" ? "#0f6e3a" : r.status === "forthcoming" ? "#c8a020" : v.blue}`, alignItems: "center", cursor: "pointer" }}
                    >
                      <div style={{ fontSize: 12, color: "#6a7a8a" }}>{r.date}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 600, color: v.navy, lineHeight: 1.4 }}>{r.title}</div>
                      <div><StatusBadge status={r.status} /></div>
                      <div style={{ fontSize: 12, color: v.blue, fontWeight: 500 }}>View details →</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        );
      })}

      {/* Commission strip */}
      <div id="commission" className="two-col-grid" style={{ background: v.navy, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Commission Research</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: "#fff", lineHeight: 1.25, marginBottom: 14 }}>Have a specific AI question your organization needs answered independently?</div>
          <p style={{ fontSize: 14, color: "#a8c8e8", lineHeight: 1.75, marginBottom: 24 }}>The Verita takes on a small number of commissioned research engagements each quarter. You fund the question. We produce the answer the market can trust.</p>
    {!researchSubmitted ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        <input
          type="text"
          placeholder="Your name"
          value={researchForm.name}
          onChange={(e) => setResearchForm({ ...researchForm, name: e.target.value })}
          style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#fff", background: "rgba(255,255,255,0.08)", outline: "none" }}
        />
        <input
          type="email"
          placeholder="Your email"
          value={researchForm.email}
          onChange={(e) => setResearchForm({ ...researchForm, email: e.target.value })}
          style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#fff", background: "rgba(255,255,255,0.08)", outline: "none" }}
        />
        <input
          type="text"
          placeholder="Organization"
          value={researchForm.org}
          onChange={(e) => setResearchForm({ ...researchForm, org: e.target.value })}
          style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#fff", background: "rgba(255,255,255,0.08)", outline: "none" }}
        />
        <textarea
          rows={3}
          placeholder="Briefly describe your research question..."
          value={researchForm.message}
          onChange={(e) => setResearchForm({ ...researchForm, message: e.target.value })}
          style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#fff", background: "rgba(255,255,255,0.08)", outline: "none", resize: "vertical" }}
        />
       <button onClick={async () => {
          if (!researchForm.name.trim()) { alert("Please enter your name"); return; }
          if (!researchForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(researchForm.email)) { alert("Please enter a valid email"); return; }
          if (!researchForm.message.trim()) { alert("Please enter a message"); return; }
          try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                name: researchForm.name,
                email: researchForm.email,
                org: researchForm.org,
                role: "",
                interest: "Research commission",
                message: researchForm.message,
                form_type: "research"
              })
              });
              if (res.ok) setResearchSubmitted(true);
            } catch (e) {
              setResearchSubmitted(true);
            }
          }}
      style={{ background: "#fff", color: v.navy, padding: "13px 28px", fontSize: 13, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
    >
      Submit research brief
    </button>
  </div>
) : (
  <div style={{ background: "rgba(255,255,255,0.1)", padding: "20px 24px", borderLeft: "3px solid #5a9ad4" }}>
    <div style={{ fontSize: 14, color: "#fff", fontWeight: 500, marginBottom: 4 }}>Thank you for your brief.</div>
    <div style={{ fontSize: 13, color: "#a8c8e8" }}>We will be in touch within 2 business days.</div>
  </div>
)}

        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { step: "Step 01", title: "Submit a research brief", body: "Tell us your question, your focus area, and what you need to understand." },
            { step: "Step 02", title: "We scope and agree terms", body: "We propose a methodology and timeline. Independence of findings is non-negotiable." },
            { step: "Step 03", title: "Research and publication", body: "Commissioning partners receive early access, named partnership, and co-publication option." }
          ].map((s) => (
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
