"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const SECTIONS = [
  {
    id: "students",
    num: "Education Focus 01",
    audience: "Aspiring Students",
    problemLabel: "The Problem",
    problemHeadline: "The degree students are earning today may not prepare them for the jobs that will exist when they graduate.",
    problemBody: "Universities are still debating whether students should use AI at all. Meanwhile the economy is moving. The four-year degree in its current form was designed for a world where knowledge was scarce and credentials were the signal. In an AI era, both assumptions are breaking down. Students graduating in 2027 will enter a workforce where AI fluency is not a differentiator — it is a baseline requirement.",
    programLabel: "Our Program",
    programName: "AI Foundations Certificate",
    programSub: "A 3-month certification for students and early-career professionals entering an AI-native world.",
    modules: [
      "Fundamentals of AI",
      "Concepts of ML, LLM, Generative AI and Agentic AI",
      "Introduction to Responsible AI",
      "How to identify business use cases for AI",
    ],
    specializations: [],
    tailored: "Programs are tailored to the specific needs of your institution or cohort.",
    coming: "Further programs in development — including sector-specific AI literacy tracks.",
  },
  {
    id: "workforce",
    num: "Education Focus 02",
    audience: "Experienced Workforce",
    problemLabel: "The Problem",
    problemHeadline: "Millions of working professionals are navigating AI transformation with no structured support.",
    problemBody: "Organizations are deploying AI faster than their people can adapt. Managers are redesigning workflows they don't fully understand. Individual contributors are being asked to work alongside AI systems nobody has trained them to evaluate or govern. Corporate L&D is responding with one-day workshops and online modules that scratch the surface of a deep transformation.",
    programLabel: "Our Program",
    programName: "AI in Practice",
    programSub: "For working professionals ready to apply AI to real business problems — from use case to production.",
    modules: [
      "Identifying and scoping business use cases for AI",
      "Scaling AI from pilot to production",
      "AI governance and operational frameworks",
      "Managing AI in live business environments",
    ],
    specializations: [
      "AI in Finance — use cases, risk, and regulatory considerations",
      "AI in Supply Chain — optimization, forecasting, and operational AI",
      "AI in HR — workforce analytics, talent AI, and ethical considerations",
    ],
    tailored: "All programs are tailored to the specific needs of your organization or cohort.",
    coming: "Further functional specializations in development.",
  },
  {
    id: "leadership",
    num: "Education Focus 03",
    audience: "Strategic Leadership",
    problemLabel: "The Problem",
    problemHeadline: "Most senior leaders can talk about AI strategy. Very few can lead it.",
    problemBody: "There is a difference between understanding AI as a concept and being able to make consequential decisions about AI deployment, governance, and organizational transformation. Boards are approving AI investments they cannot evaluate. Executives are commissioning AI strategies they cannot interrogate. The leadership layer is underprepared — and the consequences are already showing up in failed deployments and governance failures.",
    programLabel: "Our Program",
    programName: "Executive AI Leadership Program",
    programSub: "For senior leaders building AI-ready organizations — strategy, governance, and the workforce of the future.",
    modules: [
      "Keeping the workforce ready for an AI-first future",
      "Positioning AI for long-term organizational advantage",
      "Governance and regulatory compliance",
      "Building and sustaining AI leadership capability",
    ],
    specializations: [],
    tailored: "Programs are tailored to the specific needs of your leadership team and organizational context.",
    coming: "Further programs for boards and non-executive directors in development.",
  },
];

export default function EducationPage() {
  const [formData, setFormData] = useState({ name: "", org: "", role: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>

        {/* Left — The Problem */}
        <div style={{ background: v.bgSoft, padding: "64px 48px", borderRight: `1px solid ${v.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#c0392b", fontWeight: 500, marginBottom: 20 }}>The Problem</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 20, fontStyle: "italic" }}>
            &ldquo;The workforce AI needs does not exist yet. And the institutions responsible for building it are not moving fast enough.&rdquo;
          </div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>
            Schools are debating AI policy while curricula age. Organizations are deploying AI while their people struggle to keep pace. Senior leaders are making consequential AI decisions without the capability to evaluate them. The problem is not awareness — it is preparation. And preparation requires research that is honest about what is actually broken.
          </p>
        </div>

        {/* Right — Verita Response */}
        <div style={{ background: "#fff", padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Verita Response</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 28 }}>
            Our education programs start from a position, not a question.
          </div>
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
      {SECTIONS.map((section, index) => (
        <div key={section.id} id={section.id} style={{ borderBottom: `1px solid ${v.border}` }}>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

            {/* Left — The Problem */}
            <div style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "56px 48px", borderRight: `1px solid ${v.border}` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#c0392b", fontWeight: 500, marginBottom: 14 }}>{section.problemLabel} · {section.num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 16, fontStyle: "italic" }}>
                &ldquo;{section.problemHeadline}&rdquo;
              </div>
              <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8 }}>{section.problemBody}</p>
            </div>

            {/* Right — Our Program */}
            <div style={{ background: index % 2 === 0 ? v.bgSoft : "#fff", padding: "56px 48px" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>{section.programLabel} · {section.audience}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, lineHeight: 1.25, marginBottom: 8 }}>{section.programName}</div>
              <p style={{ fontSize: 13, color: "#6a7a8a", lineHeight: 1.6, marginBottom: 24, fontStyle: "italic" }}>{section.programSub}</p>

              {/* Modules */}
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 12 }}>Program modules</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: section.specializations.length > 0 ? 24 : 16 }}>
                {section.modules.map((m) => (
                  <div key={m} style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "12px 16px", borderLeft: `3px solid ${v.blue}`, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 6, height: 6, background: v.blue, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 13, color: v.navy, lineHeight: 1.5 }}>{m}</span>
                  </div>
                ))}
              </div>

              {/* Functional specializations */}
              {section.specializations.length > 0 && (
                <>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 12 }}>Functional specializations</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 16 }}>
                    {section.specializations.map((s) => (
                      <div key={s} style={{ background: index % 2 === 0 ? "#fff" : v.bgSoft, padding: "12px 16px", borderLeft: `3px solid ${v.blueLight}`, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 6, height: 6, background: v.blueLight, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
                        <span style={{ fontSize: 13, color: v.textBody, lineHeight: 1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tailored note */}
              <div style={{ fontSize: 12, color: "#6a7a8a", lineHeight: 1.6, fontStyle: "italic", padding: "12px 16px", background: index % 2 === 0 ? "#fff" : v.bgSoft, borderLeft: `3px solid #e8edf2`, marginBottom: 8 }}>
                {section.tailored}
              </div>

              {/* Coming soon */}
              <div style={{ fontSize: 12, color: v.blueLight, lineHeight: 1.6, marginTop: 8 }}>
                ↳ {section.coming}
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
                {[{ label: "Your name", key: "name", placeholder: "Full name" }, { label: "Organization", key: "org", placeholder: "Company or institution" }, { label: "Your role", key: "role", placeholder: "e.g. CHRO, Dean, Head of L&D" }].map((f) => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input type="text" placeholder={f.placeholder} value={formData[f.key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" as const }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>I am enquiring about</label>
                  <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", appearance: "none" as const }}>
                    <option>AI Foundations Certificate — aspiring students</option>
                    <option>AI in Practice — experienced workforce</option>
                    <option>Executive AI Leadership Program — strategic leaders</option>
                    <option>Functional specialization — Finance, Supply Chain, HR</option>
                    <option>Not sure yet — tell me more</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea rows={3} placeholder="Tell us about your organization and what you are trying to achieve" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box" as const }} />
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
