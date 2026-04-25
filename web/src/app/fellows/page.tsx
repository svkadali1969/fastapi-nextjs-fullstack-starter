import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Fellows — The Verita Institute for AI Research",
  description: "Join the researchers asking the questions that matter. The Verita Fellows Program for academic researchers, visiting faculty, and industry practitioners.",
};
const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

function SectionRule({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
      <div style={{ flex: 1, height: 1, background: v.border }} />
      <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: v.blueLight, fontWeight: 600, whiteSpace: "nowrap" as const }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: v.border }} />
    </div>
  );
}

const FELLOW_TYPES = [
  {
    initials: "FR",
    bg: v.bluePale,
    name: "Founding Research Fellows",
    audience: "Researchers & Academics",
    body: "Senior researchers with PhD-level credentials who co-author institute publications. Founding Fellows shape The Verita's research agenda and gain access to enterprise partners and policy networks across India and the United States. Applications open for the 2025 cohort.",
    tags: ["PhD required", "Co-authorship", "India & US", "2025 cohort open"],
  },
  {
    initials: "VR",
    bg: "#eaf2ea",
    name: "Visiting Researchers",
    audience: "Faculty & Independent Researchers",
    body: "Faculty members and independent researchers on short-term appointments contributing to active research projects. Available year-round. Visiting researchers bring specialist expertise to specific research questions within The Verita's three focus areas.",
    tags: ["Short-term appointments", "Year-round", "Specialist expertise"],
  },
  {
    initials: "IF",
    bg: "#fef3e2",
    name: "Industry Research Fellows",
    audience: "Senior Practitioners",
    body: "Experienced practitioners from financial services, healthcare, high-tech, and education contributing sector knowledge to applied research projects. Industry Fellows bridge the gap between organizational reality and independent research.",
    tags: ["Senior practitioners", "Sector expertise", "Applied research"],
  },
];

const ADVISORY_ROLES = [
  { initials: "AI", bg: v.bluePale, name: "AI Research Advisor", role: "Research · India", body: "Senior AI researcher validating research methodology and publication standards." },
  { initials: "PE", bg: "#eaf2ea", name: "Policy & Regulation Advisor", role: "Policy · India or US", body: "Background in AI policy or government. Connects The Verita to policy conversations in both markets." },
  { initials: "EA", bg: "#fef3e2", name: "Enterprise Advisor", role: "Industry · CHRO or CTO", body: "Senior enterprise leader who has navigated AI transformation. Grounds the research agenda in organizational reality." },
  { initials: "UA", bg: "#f0eeff", name: "University Partner Advisor", role: "Academic · India or US", body: "Senior academic facilitating university research partnerships and joint publications." },
];

export default function FellowsPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section className="two-col-grid" style={{ padding: "64px 48px 72px", borderBottom: `1px solid ${v.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 600, marginBottom: 16 }}>The Verita Fellows Program</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: v.navy, lineHeight: 1.1 }}>
            Join the researchers asking the questions that matter.
          </h1>
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, fontStyle: "italic", color: v.blue, lineHeight: 1.55, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${v.border}` }}>
            &ldquo;The most valuable thing an institution can produce is research that all parties can trust unconditionally. Fellows are the people who make that possible.&rdquo;
          </div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>
            The Verita brings together researchers, educators, and practitioners at the intersection of AI, enterprise, and policy. Whether you are an academic researcher, a visiting faculty member, or a senior practitioner — if you believe independent research is the most important contribution an institution can make, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Who it is for */}
      <section style={{ background: v.navy, padding: "56px 48px", borderBottom: `1px solid #2a4a6a` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 600, marginBottom: 32 }}>Who the Fellows Program is for</div>
        <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
          {[{ title: "Academic researchers", body: "PhD researchers and faculty who want to contribute to independent, policy-relevant AI research and publish with a credible institute." }, { title: "Enterprise practitioners", body: "Senior professionals from organizations navigating AI transformation who want to contribute sector knowledge to research that shapes the field." }, { title: "Organizations", body: "Companies and institutions looking to partner with The Verita through research fellowships — gaining access to independent findings and named research partnership." }].map((w) => (
            <div key={w.title} style={{ background: "rgba(255,255,255,0.06)", padding: "28px 24px", borderLeft: `2px solid ${v.blueLight}` }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e8f2fc", marginBottom: 10 }}>{w.title}</div>
              <div style={{ fontSize: 13, color: "#7aaac8", lineHeight: 1.65 }}>{w.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fellow types */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <SectionRule label="Fellowship types" />
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 16 }}>
          {FELLOW_TYPES.map((f) => (
            <div key={f.name} className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, background: v.bgSoft, padding: "36px 40px", alignItems: "start" }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, flexShrink: 0 }}>{f.initials}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 600, marginBottom: 6 }}>{f.audience}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: v.navy, marginBottom: 10, lineHeight: 1.2 }}>{f.name}</div>
                  <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.7 }}>{f.body}</p>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 600, marginBottom: 14 }}>Program details</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {f.tags.map((tag) => (
                    <span key={tag} style={{ background: v.bluePale, color: "#1a5276", fontSize: 12, padding: "5px 12px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
                <a href="mailto:fellows@theveritaai.com" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 600, display: "inline-block", letterSpacing: 0.3 }}>Apply — fellows@theveritaai.com</a>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Why join */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <SectionRule label="Why join The Verita" />
        <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule, marginTop: 16 }}>
          {[{ title: "Research that matters", body: "Contribute to independent research that enterprises, governments, and the public can trust. Your work will be cited, acted on, and published openly." }, { title: "India & United States network", body: "Access to enterprise partners, policy networks, and academic collaborators across both markets. The Verita operates at the intersection of two of the world's most important AI markets." }, { title: "Independence guaranteed", body: "No vendor relationships. No sponsored findings. Fellows publish what the evidence shows — not what any funder wants to hear. That is what makes The Verita's research credible." }].map((w) => (
            <div key={w.title} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ width: 36, height: 3, background: v.blue, marginBottom: 20 }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: v.navy, marginBottom: 12, lineHeight: 1.3 }}>{w.title}</div>
              <div style={{ fontSize: 13, color: v.textBody, lineHeight: 1.7 }}>{w.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Apply CTA */}
      <section style={{ background: v.navy, padding: "64px 48px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 600, marginBottom: 16 }}>Apply or enquire</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: "#fff", lineHeight: 1.25, marginBottom: 16 }}>
            Ready to join the researchers asking the questions that matter?
          </div>
          <p style={{ fontSize: 14, color: "#a8c8e8", lineHeight: 1.75, marginBottom: 32 }}>
            Send us a brief note about your background, your research interests, and why you want to work with The Verita. We respond to every application within 5 business days.
          </p>
          <a href="mailto:fellows@theveritaai.com" style={{ background: "#fff", color: v.navy, padding: "16px 36px", fontSize: 14, textDecoration: "none", fontWeight: 600, display: "inline-block", letterSpacing: 0.5 }}>
            fellows@theveritaai.com
          </a>
          <p style={{ fontSize: 12, color: "#7aaac8", marginTop: 16 }}>For organizational partnerships, contact hello@theveritaai.com</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
