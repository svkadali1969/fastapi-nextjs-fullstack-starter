"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const PARTNERSHIP_TYPES = [
  {
    num: "01",
    title: "University Research Partners",
    body: "We are looking to establish joint research partnerships with universities across India and the United States. If your institution is interested in co-producing independent AI research, we would like to hear from you.",
    benefits: ["Joint research publications", "Shared access to enterprise networks", "Named research partnership", "Co-branded research agenda"],
    contact: "research@theverita.ai",
  },
  {
    num: "02",
    title: "Enterprise Research Partners",
    body: "Organizations that commission research with The Verita become founding research partners — gaining access to independent findings, named partnership, and co-publication options. A small number of founding partner slots remain open.",
    benefits: ["Commission independent research", "Early access to findings", "Named founding partnership", "Co-publication options"],
    contact: "research@theverita.ai",
  },
  {
    num: "03",
    title: "Policy & Government Partners",
    body: "The Verita is actively seeking relationships with government bodies and policy organizations in India and the US interested in independent AI research to inform regulation and policy development.",
    benefits: ["Independent policy research", "Regulatory landscape analysis", "Access to enterprise research network", "Named policy partnership"],
    contact: "hello@theverita.ai",
  },
];

export default function PartnerPage() {
  const [formData, setFormData] = useState({ name: "", org: "", role: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ background: v.navy, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Partner with The Verita</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 500, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
            The right partnerships shape the research agenda for years to come.
          </div>
          <p style={{ fontSize: 14, color: "#a8c8e8", lineHeight: 1.75 }}>
            The Verita is at a formative stage. Founding partners — universities, enterprises, and policy organizations — will help define what independent AI research looks like for the next decade.
          </p>
        </div>
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Why Partner with Us</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Shape the research agenda", body: "Founding partners help define the questions The Verita investigates — within our independence constraints. Your sector knowledge informs research that the whole market benefits from." },
              { label: "Access independent findings first", body: "Partners receive early access to research findings before public publication — giving your organization a genuine first-mover advantage on independent AI intelligence." },
              { label: "Named founding partnership", body: "A small number of founding partner slots are available. Named partnerships carry lasting credibility as the institute's research reputation grows." },
            ].map((b, i) => (
              <div key={b.label} style={{ background: "#fff", padding: "18px 20px", borderLeft: `3px solid ${i === 0 ? v.navy : v.blue}` }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, color: i === 0 ? v.navy : v.blueLight, fontWeight: 600, marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.65 }}>{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Partnership Types</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: v.navy, marginBottom: 40, lineHeight: 1.2 }}>Three ways to partner with The Verita.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PARTNERSHIP_TYPES.map((p, index) => (
            <div key={p.num} className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: index % 2 === 0 ? v.bgSoft : "#fff" }}>
              <div style={{ padding: "40px 48px", borderRight: `1px solid ${v.border}` }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Partnership {p.num}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: v.navy, lineHeight: 1.25, marginBottom: 16 }}>{p.title}</div>
                <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.8 }}>{p.body}</p>
              </div>
              <div style={{ padding: "40px 48px" }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 16 }}>What partners receive</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                  {p.benefits.map((b) => (
                    <div key={b} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ width: 6, height: 6, background: v.blue, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
                      <span style={{ fontSize: 13, color: v.textBody }}>{b}</span>
                    </div>
                  ))}
                </div>
                <a href={`mailto:${p.contact}`} style={{ fontSize: 13, color: v.blue, fontWeight: 500, textDecoration: "none" }}>Enquire — {p.contact} →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Get in touch</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: v.navy, marginBottom: 16, lineHeight: 1.2 }}>Tell us about your organization.</div>
            <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.75, marginBottom: 24 }}>Whether you are a university, an enterprise, or a policy organization — if you are interested in partnering with The Verita, we would like to hear from you. We respond to every enquiry within 2 business days.</p>
            {["hello@theverita.ai", "India — New Delhi & Mumbai", "United States — New York & San Francisco"].map((d) => (
              <div key={d} style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${v.border}`, fontSize: 13, color: "#3a4a5a" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: v.blue, flexShrink: 0, display: "inline-block" }} />
                {d}
              </div>
            ))}
          </div>
          <div>
            {submitted ? (
              <div style={{ background: "#fff", padding: "32px", borderLeft: `3px solid ${v.blue}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: v.navy, marginBottom: 8 }}>Thank you for your enquiry.</div>
                <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.7 }}>We will be in touch within 2 business days.</p>
              </div>
            ) : (
              <div style={{ background: "#fff", padding: "32px" }}>
                {[{ label: "Your name", key: "name", placeholder: "Full name" }, { label: "Organization", key: "org", placeholder: "Company, university, or institution" }, { label: "Your role", key: "role", placeholder: "e.g. VP Research, Dean, Policy Director" }].map((f) => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input type="text" placeholder={f.placeholder} value={formData[f.key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" as const }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>Partnership type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", appearance: "none" as const }}>
                    <option>University Research Partner</option>
                    <option>Enterprise Research Partner</option>
                    <option>Policy & Government Partner</option>
                    <option>Not sure yet — tell me more</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a9aaa", fontWeight: 500, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea rows={3} placeholder="Tell us about your organization and what you are looking to achieve" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1px solid #dce6f0`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box" as const }} />
                </div>
                <button onClick={() => setSubmitted(true)} style={{ background: v.navy, color: "#fff", padding: "14px 32px", fontSize: 13, letterSpacing: 0.5, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, width: "100%", marginTop: 8 }}>Send enquiry</button>
                <div style={{ fontSize: 11, color: "#9aaabb", marginTop: 10, lineHeight: 1.5 }}>Your information is held in strict confidence and will not be shared with third parties.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Current Partners — placeholder */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Our Partners</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: v.navy, marginBottom: 16, lineHeight: 1.2 }}>Founding partners coming soon.</div>
        <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, maxWidth: 560, marginBottom: 40 }}>
          The Verita is actively building its founding partner network across universities, enterprises, and policy organizations in India and the United States. Founding partners will be listed here as partnerships are confirmed.
        </p>
        <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule }}>
          {["University Partners", "Enterprise Partners", "Policy Partners"].map((type) => (
            <div key={type} style={{ background: "#fff", padding: "32px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: v.bgSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px dashed ${v.blueLight}` }} />
              </div>
              <div style={{ fontSize: 12, color: "#9aaabb", fontWeight: 500, letterSpacing: 0.5, textAlign: "center" as const }}>{type}</div>
              <div style={{ fontSize: 11, color: "#b0c0d0", marginTop: 4, textAlign: "center" as const }}>Forthcoming 2025</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
