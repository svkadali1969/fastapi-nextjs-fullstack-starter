"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useState } from "react";

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

export default function EducationPage() {
  const [formData, setFormData] = useState({ name: "", org: "", role: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "64px 48px 56px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Research-led AI Education</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: v.navy, lineHeight: 1.1, marginBottom: 16 }}>
          Education built<br />for the <em style={{ color: v.blue }}>AI-native</em><br />organization.
        </h1>
        <p style={{ fontSize: 16, color: v.textBody, lineHeight: 1.75, maxWidth: 620 }}>
          Not AI added to existing programs. AI at the center — with everything else built around it. Programs designed for the managers, directors, and leaders navigating AI transformation inside their organizations right now.
        </p>
      </section>

      {/* Problem section */}
      <section style={{ padding: "72px 48px", background: v.bgSoft, borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 24 }}>The Problem We Are Solving</div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 20 }}>AI transformation succeeds or fails at the manager and director level.</div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 16 }}>Not at the C-suite. The executives can commission the strategy. But it is the managers and directors who actually make AI work — or watch it stall. They are the ones who decide how to redesign team workflows, how to evaluate AI outputs, and how to lead teams through uncertainty.</p>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 16 }}>Traditional training programs either pitch too high — leadership strategy for the board — or too low — technical courses for engineers. The middle layer of the organization, where AI transformation actually happens, is being underserved.</p>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>Every Verita program is built for that middle layer.</p>
          </div>
          <div>
            {[{ num: "87%", label: "of executives say their organization is deploying AI faster than their workforce is ready for it", source: "McKinsey Global Survey, 2024" }, { num: "74%", label: "of managers report receiving no structured support for leading AI-enabled teams", source: "Verita research, forthcoming 2025" }, { num: "3×", label: "higher AI deployment success rates in organizations with structured manager-level AI education", source: "MIT Sloan Management Review, 2024" }].map((s) => (
              <div key={s.num} style={{ background: "#fff", padding: "22px 26px", borderLeft: `3px solid ${v.blue}`, marginBottom: 2 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 600, color: v.navy, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#5a7a9a", marginTop: 6, lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 4, fontStyle: "italic" }}>{s.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference section */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 40 }}>What makes The Verita different</div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: v.bgRule }}>
          <div style={{ background: "#fafafa", padding: "40px 36px" }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, color: "#9aaabb", marginBottom: 24 }}>Conventional AI training</div>
            {["Vendor-led or vendor-funded programs", "Technology-first — tools over strategy", "Built for technical teams or the C-suite", "Generic frameworks not grounded in research", "One-size programs regardless of sector", "No independence from commercial interests"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "13px 0", borderBottom: `1px solid #eef2f6` }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#f0f0f0", color: "#9aaabb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>✕</div>
                <span style={{ fontSize: 14, color: "#7a8a9a", lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", padding: "40px 36px" }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, color: v.blue, marginBottom: 24 }}>The Verita approach</div>
            {["Built from independent research — no vendor relationships", "Workforce-first — capability, governance, and leadership", "Designed for the manager and director layer", "Every program grounded in Verita research findings", "Sector-adapted — financial services, healthcare, high-tech", "Structurally independent — no platform agenda"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "13px 0", borderBottom: `1px solid #eef2f6` }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: v.bluePale, color: v.blue, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>✓</div>
                <span style={{ fontSize: 14, color: "#3a4a5a", lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="cohort" style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <SectionRule label="Education programs" />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, marginBottom: 32 }}>Programs for every layer of AI leadership.</h2>

        {[{
          tag: "Enterprise Program · Cohort 1", name: "The AI Leadership Cohort", desc: "A 4-week intensive program for managers and directors leading AI-enabled teams. Built from The Verita's workforce research — covering AI strategy for the middle layer, team redesign, governance in practice, and responsible AI decision-making. Enterprise cohorts are delivered in-company or as cross-industry open programs.",
          details: [{ k: "Audience", v: "Managers & Directors" }, { k: "Format", v: "In-person or hybrid" }, { k: "Duration", v: "4 weeks · 2 days/week" }, { k: "Cohort size", v: "12–20 participants" }],
          pills: ["Enterprise or open cohort", "India and US delivery", "Verita research included", "Certificate of completion"],
        }, {
          tag: "Executive Program · Cohort 2", name: "The Intelligent Enterprise Intensive", desc: "A 3-day open enrollment program for directors, senior managers, and department heads who need a rapid, rigorous grounding in AI strategy and governance. Designed for leaders who are already deploying AI and need to lead the transformation — not just understand it.",
          details: [{ k: "Audience", v: "Directors & Senior Managers" }, { k: "Format", v: "In-person" }, { k: "Duration", v: "3 days" }, { k: "Cohort size", v: "15–25 participants" }],
          pills: ["Cross-industry peer cohort", "Quarterly runs — India and US", "Verita research included", "Certificate of completion"],
        }, {
          tag: "Specialist Program · Cohort 3", name: "Responsible AI for Risk & Compliance Leaders", desc: "A focused 2-day program for Chief Risk Officers, General Counsels, and compliance managers building AI governance frameworks in the absence of comprehensive regulation. Covers independent governance frameworks, the regulatory landscape in India and the US, AI risk assessment capability, and how to advise leadership on AI liability.",
          details: [{ k: "Audience", v: "Risk & Compliance leaders" }, { k: "Format", v: "In-person or virtual" }, { k: "Duration", v: "2 days" }, { k: "Cohort size", v: "10–20 participants" }],
          pills: ["Grounded in Verita governance research", "India and US regulatory context", "Framework toolkit included", "Certificate of completion"],
        }].map((p) => (
          <div key={p.name} style={{ border: `1px solid ${v.border}`, marginBottom: 2, background: "#fff" }}>
            <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", padding: "32px 36px", gap: 32 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 10 }}>{p.tag}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 14, color: v.textBody, lineHeight: 1.65, maxWidth: 600 }}>{p.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14, flexShrink: 0, minWidth: 180 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-end" }}>
                  {p.details.map((d) => <div key={d.k} style={{ fontSize: 12, color: "#7a8a9a", textAlign: "right" }}><strong style={{ color: v.navy, fontWeight: 500 }}>{d.k}</strong> — {d.v}</div>)}
                </div>
                <Link href="#enquiry" style={{ background: v.navy, color: "#fff", padding: "10px 22px", fontSize: 12, letterSpacing: 0.5, textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap", display: "block", textAlign: "center" }}>Register interest</Link>
              </div>
            </div>
            <div style={{ background: v.bgSoft, padding: "18px 36px", display: "flex", gap: 28, flexWrap: "wrap", borderTop: `1px solid ${v.border}` }}>
              {p.pills.map((pill) => (
                <div key={pill} style={{ fontSize: 12, color: "#4a6a8a", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: v.blue, flexShrink: 0, display: "inline-block" }} />
                  {pill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Assessment strip */}
      <div id="assessment" className="two-col-grid" style={{ background: v.navy, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Organizational Diagnostic</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "#fff", lineHeight: 1.25, marginBottom: 12 }}>Not sure where your organization stands?<br />Start with an AI Readiness Assessment.</div>
          <p style={{ fontSize: 14, color: "#a8c8e8", lineHeight: 1.7, maxWidth: 560 }}>Before committing to a program, The Verita can conduct an independent AI Readiness Assessment — evaluating workforce capability at the manager and director level, governance maturity, and AI deployment readiness by function.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", flexShrink: 0 }}>
          <Link href="#enquiry" style={{ background: "#fff", color: v.navy, padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block", whiteSpace: "nowrap" }}>Request an assessment</Link>
          <Link href="#enquiry" style={{ background: "transparent", color: "#fff", padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, border: "1px solid rgba(255,255,255,0.35)", display: "inline-block", whiteSpace: "nowrap" }}>Download framework</Link>
        </div>
      </div>

      {/* Why section */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <SectionRule label="Why organizations choose The Verita" />
        <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule, marginTop: 40 }}>
          {[{ title: "Research informs every program", body: "Our education programs are built from The Verita's own independent research — what is actually happening in organizations deploying AI at scale. Not from theory. Not from vendor case studies. From evidence." }, { title: "AI-first architecture — not AI-added", body: "Every program assumes AI is already in the room. We teach how to lead, govern, decide, and create value when AI is the permanent operating context. Legacy institutions cannot replicate this without rebuilding from scratch." }, { title: "Independent — no vendor agenda", body: "The Verita has no technology vendor relationships and no platform to sell. Our programs give participants frameworks to evaluate and govern any AI system — without a commercial agenda shaping what they learn." }].map((w) => (
            <div key={w.title} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ width: 36, height: 3, background: v.blue, marginBottom: 20 }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: v.navy, marginBottom: 12, lineHeight: 1.3 }}>{w.title}</div>
              <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.7 }}>{w.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <SectionRule label="Get in touch" />
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, marginBottom: 16, lineHeight: 1.2 }}>Talk to us about your organization's AI education needs.</div>
            <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.75, marginBottom: 24 }}>Whether you are looking for an enterprise cohort for your management layer, an open enrollment intensive for your directors, a governance workshop for your risk team, or want to understand where your organization stands — we would like to hear from you.</p>
            {["education@theverita.ai", "India — New Delhi & Mumbai", "United States — New York & San Francisco", "Response within 2 business days"].map((d) => (
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
                {[{ label: "Your name", key: "name", placeholder: "Full name", type: "text" }, { label: "Organization", key: "org", placeholder: "Company or institution", type: "text" }, { label: "Your role", key: "role", placeholder: "e.g. CHRO, Head of L&D, Chief AI Officer", type: "text" }].map((f) => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={formData[f.key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>I am interested in</label>
                  <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", appearance: "none" }}>
                    <option>Enterprise cohort — managers & directors</option>
                    <option>Executive intensive — directors & senior managers</option>
                    <option>Responsible AI for risk & compliance</option>
                    <option>AI Readiness Assessment</option>
                    <option>Not sure yet — tell me more</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea rows={3} placeholder="Tell us about your organization and what you are trying to achieve" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <button onClick={() => setSubmitted(true)} style={{ background: v.navy, color: "#fff", padding: "14px 32px", fontSize: 13, letterSpacing: 0.5, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, width: "100%", marginTop: 8 }}>Send enquiry</button>
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
