"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", border: "#e8edf2", textBody: "#4a5568" };

type Module = {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
};

type Program = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  duration: string | null;
  effort: string | null;
  format: string | null;
  status: string;
  objectives: string | null;
  outcomes: string | null;
  homepage_eyebrow: string | null;
  homepage_body: string | null;
  homepage_tags: string[] | null;
  homepage_differentiator: string | null;
  image_url: string | null;
  homepage_order: number;
  audience: string;
  section_slug: string;
  modules: Module[];
};

function Modal({ program, onClose }: { program: Program; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", maxWidth: 620, width: "100%", padding: "40px", position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aaabb" }}>✕</button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: v.blueLight, fontWeight: 500 }}>{program.audience}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" as const }}>
          {program.duration && <span style={{ fontSize: 12, color: "#9aaabb" }}>⏱ {program.duration}</span>}
          {program.effort && <span style={{ fontSize: 12, color: "#9aaabb" }}>📋 {program.effort}</span>}
          {program.format && <span style={{ fontSize: 12, color: "#9aaabb" }}>📍 {program.format}</span>}
        </div>

        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 24 }}>
          {program.name}
        </div>

        {/* Objectives */}
        {program.objectives && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, marginBottom: 10 }}>Course objectives</div>
            <div style={{ background: v.bgSoft, padding: "16px 20px", borderLeft: `3px solid ${v.blue}`, fontSize: 14, color: v.textBody, lineHeight: 1.75 }}>
              {program.objectives}
            </div>
          </div>
        )}

        {/* Outcomes */}
        {program.outcomes && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, marginBottom: 10 }}>What you will be able to do</div>
            <div style={{ background: v.bgSoft, padding: "16px 20px", borderLeft: `3px solid ${v.blueLight}`, fontSize: 14, color: v.textBody, lineHeight: 1.75 }}>
              {program.outcomes}
            </div>
          </div>
        )}

        {/* Modules */}
        {program.modules.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, marginBottom: 10 }}>Program modules</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {program.modules.map((m, i) => (
                <div key={m.id} style={{ background: v.bgSoft, padding: "14px 16px", borderLeft: `3px solid ${v.blue}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: m.description ? 6 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 10, color: v.blueLight, fontWeight: 600, minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: 13, color: v.navy, fontWeight: 500 }}>{m.title}</span>
                    </div>
                    {m.duration && <span style={{ fontSize: 11, color: "#9aaabb", flexShrink: 0 }}>{m.duration}</span>}
                  </div>
                  {m.description && <div style={{ fontSize: 12, color: "#6a7a8a", lineHeight: 1.5, marginTop: 4, marginLeft: 30 }}>{m.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {program.modules.length === 0 && (
          <p style={{ fontSize: 14, color: "#9aaabb", lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>
            Full program details coming soon.
          </p>
        )}
          <div style={{ borderTop: `1px solid ${v.border}`, paddingTop: 20 }}>
            <a 
              href={`mailto:education@theveritaai.com?subject=Registration Interest: ${program.name}`}
              style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}
            >
              Register your interest →
            </a>
          </div>
                  
        </div>
    </div>
  );
}

export default function EducationCTA() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch programs with section info
      const { data: programsData, error } = await supabase
        .from('education_programs')
        .select(`
          *,
          education_sections (audience, slug)
        `)
        .eq('show_on_homepage', true)
        .order('homepage_order');

      if (!programsData) return;

      // Fetch modules for each program
      const result: Program[] = [];
      for (const prog of programsData) {
        const { data: moduleLinks } = await supabase
          .from('program_modules')
          .select(`
            display_order,
            education_modules (id, title, description, duration)
          `)
          .eq('program_id', prog.id)
          .order('display_order');

        const modules = moduleLinks?.map((ml: any) => ml.education_modules).filter(Boolean) || [];

        result.push({
          ...prog,
          audience: prog.education_sections?.audience || '',
          section_slug: prog.education_sections?.slug || '',
          modules
        });
      }

      setPrograms(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return null;

  // Image URLs — update these when you upload to Supabase Storage
  const images: Record<string, string> = {
    'ai-pilot-to-production': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/corp2.png',
    'ai-launch-pad': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/studen1.png',
  };

  // Mobile breakpoint media query
  const mobileStyle = `
    @media (max-width: 768px) {
      .two-col-grid {
        grid-template-columns: 1fr !important;
      }
      .two-col-grid > div:first-child {
        border-right: none !important;
        border-bottom: 3px solid ${v.blueLight} !important;
        min-height: 240px !important;
      }
      .two-col-grid > div:last-child {
        padding: 32px 20px !important;
      }
      .section-header {
        padding: 48px 20px 32px !important;
      }
      .programs-container {
        padding: 32px 20px 40px !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyle}</style>
      <section style={{ borderBottom: `1px solid ${v.border}` }}>
        {selectedProgram && <Modal program={selectedProgram} onClose={() => setSelectedProgram(null)} />}

        {/* Section header */}
        <div className="section-header" style={{ padding: "64px 48px 40px", background: "#fff", borderBottom: `1px solid ${v.border}` }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>
            Education Programs
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2 }}>
            Education built for the AI era.
          </div>
        </div>

        {/* Program rows */}
        <div className="programs-container" style={{ padding: "40px 48px 48px", display: "flex", flexDirection: "column", gap: 24, background: v.bgSoft }}>
          {programs.map((program, index) => (
            <div key={program.id} className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>

              {/* Left — Image */}
              <div style={{
                overflow: "hidden",
                borderRight: `3px solid ${v.blueLight}`,
                background: index % 2 === 0 ? v.bgSoft : v.navy,
                minHeight: 280
              }}>
                {images[program.slug] ? (
                  <img
                    src={images[program.slug]}
                    alt={program.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                ) : (
                  <div style={{ height: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: index % 2 === 0 ? v.border : "rgba(255,255,255,0.1)", fontWeight: 600 }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                )}
              </div>

              {/* Right — Content */}
              <div style={{
                background: index % 2 === 0 ? v.navy : "#fff",
                padding: "40px 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: index % 2 === 0 ? "#4ade80" : v.blue, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: index % 2 === 0 ? "#4ade80" : v.blue, fontWeight: 500 }}>
                    {program.homepage_eyebrow || `${program.format} · ${program.duration}`}
                  </span>
                </div>

                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: index % 2 === 0 ? "#fff" : v.navy, lineHeight: 1.2, marginBottom: 16 }}>
                  {program.name}
                </div>

                <p style={{ fontSize: 14, color: index % 2 === 0 ? "#a8c8e8" : v.textBody, lineHeight: 1.75, marginBottom: 20 }}>
                  {program.homepage_body || program.description}
                </p>

                <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" as const }}>
                  {(program.homepage_tags || []).map((d: string) => (
                    <span key={d} style={{
                      fontSize: 11,
                      color: index % 2 === 0 ? "#5a9ad4" : v.blue,
                      background: index % 2 === 0 ? "rgba(90,154,212,0.15)" : v.bluePale,
                      padding: "4px 12px",
                      fontWeight: 500
                    }}>{d}</span>
                  ))}
                </div>

                {program.homepage_differentiator && (
                  <div style={{
                    fontSize: 13,
                    color: index % 2 === 0 ? "#7aaac8" : "#6a7a8a",
                    fontStyle: "italic",
                    marginBottom: 28,
                    paddingTop: 16,
                    borderTop: index % 2 === 0 ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${v.border}`
                  }}>
                    {program.homepage_differentiator}
                  </div>
                )}

                <button
                  onClick={() => setSelectedProgram(program)}
                  style={{
                    background: index % 2 === 0 ? "#fff" : v.navy,
                    color: index % 2 === 0 ? v.navy : "#fff",
                    padding: "13px 28px",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "inline-block",
                    alignSelf: "flex-start"
                  }}
                >
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
