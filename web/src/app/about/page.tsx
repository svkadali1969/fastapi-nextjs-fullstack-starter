import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "About — The Verita Institute for AI Research" };

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const PRINCIPLES = [
  { num: "01", title: "Independence", body: "No vendor relationships. No sponsored findings. No platform agenda. Our independence is the foundation everything else is built on." },
  { num: "02", title: "Trust", body: "Everything we produce — research, education, frameworks — is built to be trusted unconditionally. That trust is structural, not aspirational." },
  { num: "03", title: "AI First", body: "We do not add AI to existing thinking. We start from AI as the operating reality and build everything — research questions, curricula, frameworks — from there." },
  { num: "04", title: "Built for the Future", body: "Our purpose is to build the AI-ready workforce the future requires. Not incrementally. Not by adding AI to what already exists. By researching and building what genuinely needs to change." },
];

const COMMITMENTS = [
  { num: "01", title: "No vendor relationships.", body: "We do not recommend, endorse, or receive payment from technology vendors. Ever." },
  { num: "02", title: "No sponsored findings.", body: "Research partners fund the question. The Verita owns the methodology and conclusions — including when they are inconvenient." },
  { num: "03", title: "All policy research published openly.", body: "Applied corporate research may be proprietary for up to six months. After that, it is published." },
  { num: "04", title: "No single funder exceeds 30% of income.", body: "Revenue diversification ensures no single relationship can compromise the research agenda." },
  { num: "05", title: "No platform or vendor drives our education content.", body: "Every program is built from independent research findings — not from what any technology company wants taught. Our curriculum is ours." },
];

const CONTACTS = [
  { label: "Research enquiries", email: "research@theverita.ai", body: "For commissioned research, research partnerships, policy engagement, or media enquiries." },
  { label: "Education enquiries", email: "education@theverita.ai", body: "For program enquiries, curriculum partnerships, and organizational education needs." },
  { label: "General & partnerships", email: "hello@theverita.ai", body: "For founding research partner enquiries, press, and general correspondence." },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Who We Are */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>

        {/* Left — Four Principles */}
        <div style={{ background: v.navy, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 32 }}>What We Stand For</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} style={{ background: "rgba(255,255,255,0.06)", padding: "20px 24px", borderLeft: `3px solid ${v.blueLight}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: v.blueLight, fontWeight: 500 }}>{p.num}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#fff", letterSpacing: 0.5 }}>{p.title}</span>
                </div>
                <div style={{ fontSize: 13, color: "#a8c8e8", lineHeight: 1.65 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Who We Are */}
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>About The Verita</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: v.navy, lineHeight: 1.2, marginBottom: 24 }}>
            Independent.<br />By design.<br />By necessity.
          </div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 20 }}>
            The Verita is an independent institute for AI research and education. We have no vendor relationships, no sponsored findings, and no platform to sell. Our only commitment is to the quality and independence of our work.
          </p>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85 }}>
            We were founded on the belief that the most consequential AI questions — how organizations govern it responsibly, how workforces prepare for it genuinely, how education systems rebuild for it structurally — are not being answered by anyone with the independence to answer them honestly. That is the gap The Verita exists to fill.
          </p>
        </div>

      </section>

      {/* Mission & Vision */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ background: "#fff", padding: "64px 48px", borderRight: `1px solid ${v.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Our Mission</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: v.navy, lineHeight: 1.3, marginBottom: 20 }}>
            Through independent AI research and education, The Verita equips organizations, institutions, and individuals with the insight and capability to lead responsibly in an AI-driven world.
          </div>
          <div style={{ width: 48, height: 3, background: v.blue }} />
        </div>
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Our Vision</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: v.navy, lineHeight: 1.3, marginBottom: 20 }}>
            A world where AI is deployed responsibly, workforces are genuinely prepared, and the research informing those decisions can be trusted unconditionally.
          </div>
          <div style={{ width: 48, height: 3, background: v.blueLight }} />
        </div>
      </section>

      {/* Independence */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Our Independence</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: v.navy, lineHeight: 1.2, marginBottom: 20 }}>
              Independence is not a value. It is a structural commitment.
            </div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85 }}>
              Every research institute claims to be independent. Most are not — because their funding model makes genuine independence structurally impossible. The Verita&apos;s independence is built into how we operate, how we fund research, and how we publish findings. These are not aspirations. They are rules.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {COMMITMENTS.map((c) => (
              <div key={c.num} style={{ background: v.bgSoft, padding: "20px 24px", borderLeft: `3px solid ${v.blue}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: v.blue, flexShrink: 0, lineHeight: 1, width: 28 }}>{c.num}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: v.navy, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.6 }}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Contact</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: v.navy, marginBottom: 40, lineHeight: 1.2 }}>Get in touch.</div>
        <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule, marginBottom: 2 }}>
          {CONTACTS.map((c) => (
            <div key={c.label} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>{c.label}</div>
              <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65, marginBottom: 16 }}>{c.body}</div>
              <a href={`mailto:${c.email}`} style={{ fontSize: 14, color: v.blue, fontWeight: 500, textDecoration: "none" }}>{c.email}</a>
            </div>
          ))}
        </div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: v.bgRule }}>
          {[{ country: "India", cities: "New Delhi · Mumbai", note: "Primary research and education operations. India-focused research agenda, enterprise program delivery, and government engagement." }, { country: "United States", cities: "New York · San Francisco", note: "US research partnerships, enterprise education delivery, and policy engagement with US government bodies and foundations." }].map((o) => (
            <div key={o.country} style={{ background: "#fff", padding: "24px 28px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 10 }}>{o.country}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: v.navy, marginBottom: 8 }}>{o.cities}</div>
              <div style={{ fontSize: 13, color: "#6a7a8a", lineHeight: 1.6 }}>{o.note}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
