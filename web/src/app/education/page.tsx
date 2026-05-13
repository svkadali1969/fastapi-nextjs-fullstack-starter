"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

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
  duration: string | null;
  effort: string | null;
  format: string | null;
  status: string;
  objectives: string | null;
  outcomes: string | null;
  display_order: number;
  modules: Module[];
};

type EducationSection = {
  id: string;
  number: string;
  slug: string;
  audience: string;
  problem_headline: string;
  problem_body: string;
  program_name: string;
  program_sub: string;
  tailored_note: string;
  coming_soon: string;
  display_order: number;
  programs: Program[];
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: "#e6f9ef", color: "#0f6e3a", label: "Available" },
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

function Modal({ program, onClose }: { program: Program; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", maxWidth: 620, width: "100%", padding: "40px", position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aaabb" }}>✕</button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" as const }}>
          <StatusBadge status={program.status} />
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

        <div style={{ borderTop: `1px solid ${v.border}`, paddingTop: 20, display: "flex", gap: 12, flexWrap: "wrap" as const }}>
          <a href="mailto:education@theveritaai.com" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>
            Enquire about this program →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const [sections, setSections] = useState<EducationSection[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", org: "", role: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: sectionsData } = await supabase
        .from('education_sections')
        .select('*')
        .order('display_order');

      if (!sectionsData) return;

      const sectionsWithPrograms = await Promise.all(
        sectionsData.map(async (section) => {
          const { data: programsData } = await supabase
            .from('education_programs')
            .select('*')
            .eq('section_id', section.id)
            .order('display_order');

          const programs: Program[] = [];

          for (const prog of programsData || []) {
            const { data: moduleLinks } = await supabase
              .from('program_modules')
              .select(`display_order, education_modules (id, title, description, duration)`)
              .eq('program_id', prog.id)
              .order('display_order');

            const modules = moduleLinks?.map((ml: any) => ml.education_modules).filter(Boolean) || [];
            programs.push({ ...prog, modules });
          }

          return { ...section, programs };
        })
      );

      setSections(sectionsWithPrograms);

      // Collect all programs for enquiry dropdown
      const allProgs = sectionsWithPrograms.flatMap(s => s.programs);
      setAllPrograms(allProgs);
      if (allProgs.length > 0) {
        setFormData(prev => ({ ...prev, interest: allProgs[0].name }));
      }

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

  const sectionImages: Record<string, string> = {
    'students': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/edu_row_1.png',
    'workforce': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/edu_row_2.png',
    'leadership': 'https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/edu_row_3x.png',
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {selectedProgram && <Modal program={selectedProgram} onClose={() => setSelectedProgram(null)} />}

      {/* Hero */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ background: v.bgSoft, padding: "64px 48px", borderRight: `1px solid ${v.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#c0392b", fontWeight: 500, marginBottom: 20 }}>The Problem</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 20, fontStyle: "italic" }}>
            &ldquo;The workforce AI needs does not exist yet. And the institutions responsible for building it are not moving fast enough.&rdquo;
          </div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>
            Schools are debating AI policy while curricula age. Organizations are deploying AI while their people struggle to keep pace. Senior leaders are making consequential AI decisions without the capability to evaluate them. The problem is not awareness — it is preparation. And preparation requires research that is honest about what is actually broken.
          </p>
          <img
            src="https://lkpbwkuqmxyztmkyrukn.supabase.co/storage/v1/object/public/media/edu_hero_1.gif"
            alt="The AI Readiness Gap"
            style={{ width: "100%", objectFit: "contain", objectPosition: "top center", display: "block", marginTop: "auto" }}
          />
        </div>
        <div style={{ background: "#fff", padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Verita Response</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 20 }}>
            Our education programs start from a position, not a question.
          </div>
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8, marginBottom: 24 }}>
            Most AI education is academic theory dressed up as business training, or vendor-led programs designed to sell platforms. Neither produces the capability organizations actually need. The Verita&apos;s programs are different in three ways: they are built directly from our independent research — not theory; they put AI at the center of how business problems are solved — not as an add-on; and they teach people how to use AI to build new business models, not just automate old ones. This is education designed for the world that is actually coming.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "For aspiring students", body: "The four-year degree in its current form is not fit for the AI era. Curriculum needs to be rebuilt from the ground up, not patched. Our programs are focused on building genuine AI fluency from the foundations up." },
              { label: "For the experienced workforce", body: "One-day workshops and online modules are not workforce transformation. Organizations need structured, practical programs that take professionals from AI awareness to AI capability — in their actual business context." },
              { label: "For strategic leaders", body: "AI literacy at the board and executive level is not optional. Leaders who cannot evaluate AI decisions are a governance risk. Our programs build the decision-making capability senior leaders actually need." },
            ].map((b, i) => (
              <div key={b.label} style={{ background: v.bgSoft, padding: "18px 20px", borderLeft: `3px solid ${i === 0 ? v.navy : v.blue}` }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, color: i === 0 ? v.navy : v.blueLight, fontWeight: 600, marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.65 }}>{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Education Sections */}
      {sections.map((section, index) => (
        <div key={section.id} id={section.slug} style={{ borderBottom: `1px solid ${v.border}` }}>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

            {/* Left — The Problem */}
            <div style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "56px 48px", borderRight: `1px solid ${v.border}` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#c0392b", fontWeight: 500, marginBottom: 14 }}>KEY CHALLENGE · {section.audience}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 16, fontStyle: "italic" }}>
                &ldquo;{section.problem_headline}&rdquo;
              </div>
              <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8 }}>{section.problem_body}</p>
              {sectionImages[section.slug] && (
                <img
                  src={sectionImages[section.slug]}
                  alt={section.audience}
                  style={{ width: "75%", display: "block", borderRadius: 4, marginTop: 32, marginLeft: "auto", marginRight: "auto" }}
                />
              )}
            </div>

            {/* Right — Programs Table */}
            <div style={{ background: index % 2 === 0 ? v.bgSoft : "#fff", padding: "56px 48px" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Our Programs · {section.audience}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 24 }}>{section.program_name}</div>

              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "3fr 70px 80px 70px 80px 80px", gap: 8, padding: "8px 12px", borderBottom: `2px solid ${v.border}`, marginBottom: 4 }}>
                {["Course", "Duration", "Effort", "Format", "Status", ""].map((h) => (
                  <div key={h} style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: "#9aaabb", fontWeight: 500 }}>{h}</div>
                ))}
              </div>

              {/* Program rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 20, maxHeight: 360, overflowY: "auto" }}>
                {section.programs.map((program) => (
                  <div
                    key={program.id}
                    style={{ display: "grid", gridTemplateColumns: "3fr 70px 80px 70px 80px 80px", gap: 8, padding: "14px 12px", background: index % 2 === 0 ? "#fff" : v.bgSoft, borderLeft: `3px solid ${v.blue}`, alignItems: "center", cursor: "pointer" }}
                    onClick={() => setSelectedProgram(program)}
                  >
                    <div style={{ fontSize: 13, color: v.navy, fontWeight: 500, lineHeight: 1.4 }}>{program.name}</div>
                    <div style={{ fontSize: 12, color: "#6a7a8a" }}>{program.duration || "TBD"}</div>
                    <div style={{ fontSize: 12, color: "#6a7a8a" }}>{program.effort || "TBD"}</div>
                    <div style={{ fontSize: 12, color: "#6a7a8a" }}>{program.format || "TBD"}</div>
                    <div><StatusBadge status={program.status} /></div>
                    <div style={{ fontSize: 12, color: v.blue, fontWeight: 500 }}>View details →</div>
                  </div>
                ))}
              </div>

              {/* Tailored note */}
              <div style={{ fontSize: 12, color: "#6a7a8a", lineHeight: 1.6, fontStyle: "italic", padding: "12px 16px", background: index % 2 === 0 ? "#fff" : v.bgSoft, borderLeft: `3px solid #e8edf2`, marginBottom: 8 }}>
                {section.tailored_note}
              </div>
              <div style={{ fontSize: 12, color: v.blueLight, lineHeight: 1.6, marginTop: 8 }}>
                ↳ {section.coming_soon}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Enquiry strip */}
      <section id="enquiry" style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Get in touch</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, marginBottom: 16, lineHeight: 1.2 }}>Talk to us about your AI education needs.</div>
            <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.75, marginBottom: 24 }}>Whether you are a university exploring curriculum redesign, an organization building AI capability in your workforce, or a leadership team seeking to strengthen AI decision-making — we would like to hear from you.</p>
            {["education@theveritaai.com", "India — New Delhi & Mumbai", "United States — New York & San Francisco", "Response within 2 business days"].map((d) => (
              <div key={d} style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${v.border}`, fontSize: 13, color: "#3a4a5a" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: v.blue, flexShrink: 0, display: "inline-block" }} />
                {d}
              </div>
            ))}
          </div>
          <div>
            {submitted ? (
              <div style={{ background: v.bgSoft, padding: "32px", borderLeft: `3px solid ${v.blue}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: v.navy, marginBottom: 8 }}>Thank you for your enquiry.</div>
                <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.7 }}>We will be in touch within 2 business days.</p>
              </div>
            ) : (
              <>
                {[
                  { label: "Your name", key: "name", placeholder: "Full name" },
                  { label: "Your email", key: "email", placeholder: "your@email.com" },
                  { label: "Organization", key: "org", placeholder: "Company or institution" },
                  { label: "Your role", key: "role", placeholder: "e.g. CHRO, Dean, Head of L&D" }
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={formData[f.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" as const }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>I am enquiring about</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", appearance: "none" as const }}
                  >
                    {allPrograms.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Not sure yet">Not sure yet — tell me more</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your organization and what you are trying to achieve"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box" as const }}
                  />
                </div>
                <button
                  onClick={async () => {
                    if (!formData.name.trim()) { alert("Please enter your name"); return; }
                    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { alert("Please enter a valid email"); return; }
                    if (!formData.message.trim()) { alert("Please enter a message"); return; }
                    try {
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/submit`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: formData.name,
                          email: formData.email,
                          org: formData.org,
                          role: formData.role,
                          interest: formData.interest,
                          message: formData.message,
                          form_type: "education"
                        })
                      });
                      if (res.ok) setSubmitted(true);
                    } catch (e) {
                      setSubmitted(true);
                    }
                  }}
                  style={{ background: v.navy, color: "#fff", padding: "14px 32px", fontSize: 13, letterSpacing: 0.5, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, width: "100%", marginTop: 8 }}
                >
                  Send enquiry
                </button>
                <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 10, lineHeight: 1.5 }}>Your information is held in strict confidence and will not be shared with third parties.</div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
