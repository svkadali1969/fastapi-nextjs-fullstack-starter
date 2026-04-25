import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "The Institute — The Verita Institute for AI Research" };

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

const TEAM = [
  { initials: "FD", bg: v.bluePale, name: "Founder & Director", role: "Founding · India & US", bio: "The Verita's founder brings deep expertise in AI strategy, enterprise transformation, and the workforce challenges AI creates. Operating across India and the United States with a focus on building the intelligent enterprise." },
  { initials: "RD", bg: "#eaf2ea", name: "Research Director", role: "Hiring Now · PhD required", bio: "Leading The Verita's research agenda across all three pillars. Responsible for research quality, publication standards, and academic partnerships. The single most important hire for the institute's credibility." },
  { initials: "ED", bg: "#fef3e2", name: "Education Director", role: "Hiring Now · India & US", bio: "Designing and delivering The Verita's education programs across all three audience segments. Responsible for curriculum architecture, faculty relationships, and program delivery." },
];

const ADVISORY = [
  { initials: "AI", bg: v.bluePale, name: "AI Research Advisor", role: "Research · India", body: "Senior AI researcher validating research methodology and publication standards." },
  { initials: "PE", bg: "#eaf2ea", name: "Policy & Regulation Advisor", role: "Policy · India or US", body: "Background in AI policy or government. Connects The Verita to policy conversations in both markets." },
  { initials: "EA", bg: "#fef3e2", name: "Enterprise Advisor", role: "Industry · CHRO or CTO", body: "Senior enterprise leader who has navigated AI transformation. Grounds the research agenda in organizational reality." },
  { initials: "UA", bg: "#f0eeff", name: "University Partner Advisor", role: "Academic · India or US", body: "Senior academic facilitating university research partnerships and joint publications." },
];

export default function InstitutePage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ background: v.navy, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Institute</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 500, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
            Built by people who believe independent research is the most valuable thing an institution can produce.
          </div>
        </div>
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Who We Are Building</div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 20 }}>
            The Verita is at the founding stage. We are building a small, exceptional team of researchers, educators, and practitioners who share a commitment to independent inquiry and a belief that the AI era requires institutions willing to ask the questions others cannot.
          </p>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85 }}>
            We are actively hiring for key roles and constituting our advisory board. If you want to build something that matters from the ground up — we want to hear from you.
          </p>
          <div style={{ marginTop: 24 }}>
            <a href="mailto:hello@theverita.ai" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>Get in touch — hello@theverita.ai</a>
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Founding Team</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: v.navy, marginBottom: 40, lineHeight: 1.2, maxWidth: 560 }}>The people building The Verita.</div>
        <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule }}>
          {TEAM.map((t) => (
            <div key={t.name} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: v.navy, marginBottom: 16 }}>{t.initials}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: v.navy, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: v.blue, fontWeight: 500, letterSpacing: 0.5, marginBottom: 12 }}>{t.role}</div>
              <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65 }}>{t.bio}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory Board */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Advisory Board</div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: v.navy, lineHeight: 1.2 }}>Shaping the research agenda.</div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>The Verita&apos;s advisory board is currently being constituted. We are seeking advisors who share our commitment to independent research and bring expertise across AI research, policy, enterprise, and academia.</p>
        </div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2, background: v.bgRule }}>
          {ADVISORY.map((b) => (
            <div key={b.name} style={{ background: "#fff", padding: "28px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: b.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 500, color: v.navy, flexShrink: 0 }}>{b.initials}</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: v.navy, marginBottom: 3 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: v.blue, fontWeight: 500, letterSpacing: 0.3, marginBottom: 8 }}>{b.role}</div>
                <div style={{ fontSize: 13, color: "#6a7a8a", lineHeight: 1.6 }}>{b.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "20px 28px", background: "#fff", borderLeft: `3px solid ${v.blue}` }}>
          <p style={{ fontSize: 13, color: v.textBody, lineHeight: 1.7 }}>Interested in joining the advisory board? Contact us at <a href="mailto:hello@theverita.ai" style={{ color: v.blue, textDecoration: "none", fontWeight: 500 }}>hello@theverita.ai</a></p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
