import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = { title: "About — The Verita Institute for AI Research" };

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

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "64px 48px 72px", borderBottom: `1px solid ${v.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>About The Verita</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: v.navy, lineHeight: 1.1 }}>
            Built for the <em style={{ color: v.blue }}>AI era.</em><br />Independent by design.
          </h1>
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: v.blue, lineHeight: 1.55, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${v.border}` }}>
            "The most valuable thing an institution can produce is research that enterprises, governments, and the public can trust unconditionally. That trust is built through structure, not through good intentions."
          </div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>The Verita is an independent institute for AI research and education. We produce research that nobody with a commercial stake in AI can produce honestly — and we build education programs that teach organizations how to navigate AI transformation without a vendor agenda.</p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "80px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, lineHeight: 1.2, marginBottom: 24 }}>Why The Verita exists.</div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 16 }}>AI is the most consequential technology organizations have ever had to navigate. The decisions being made right now — about how to deploy it, how to govern it, how to prepare workforces for it — will define organizations for a decade.</p>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 16 }}>And yet the research landscape is compromised. Vendors fund studies that validate their products. Consultancies produce frameworks that lead to their own engagements. Governments are years behind. The result is that decision-makers lack the independent, trustworthy research they most need.</p>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: v.navy, lineHeight: 1.5, padding: "24px 0", borderTop: `1px solid ${v.border}`, borderBottom: `1px solid ${v.border}`, margin: "24px 0" }}>
              The Verita was founded to fill that gap. Not to be the most prolific research institute. To be the most trusted one.
            </div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85 }}>We focus on three areas where the need for independent research is most acute: the future workforce, responsible AI in practice, and applied sector research. We produce what the market needs to know — not what is convenient to publish.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: v.navy, marginBottom: 16, lineHeight: 1.2 }}>Our founding principles.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, background: v.bgRule, marginTop: 8 }}>
              {[{ num: "01", title: "Independence is structural", body: "Our funding model, research governance, and publication policies are designed to make genuine independence structurally unavoidable — not aspirationally intended." }, { num: "02", title: "Research serves decision-makers", body: "We produce research for the people who need to act on it — enterprises navigating transformation, governments setting policy, organizations building workforces." }, { num: "03", title: "Education follows research", body: "Every Verita education program is built from our own research findings. We teach what the evidence actually shows — not what theory predicts or vendors recommend." }, { num: "04", title: "India and the United States", body: "We operate across both markets because the AI research questions facing India and the US are both distinct and interconnected. Independent comparative research requires presence in both." }].map((p) => (
                <div key={p.num} style={{ background: "#fff", padding: "20px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.blue, lineHeight: 1, flexShrink: 0, width: 32 }}>{p.num}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: v.navy, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#6a7a8a", lineHeight: 1.6 }}>{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section style={{ background: v.navy, padding: "80px 48px", borderBottom: "1px solid #2a4a6a" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Our mission</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, fontStyle: "italic", color: "#fff", lineHeight: 1.5, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              To produce the independent AI research and education that enterprises, governments, and workforces need to navigate the AI era with confidence.
            </div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Our vision</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: "#a8c8e8", lineHeight: 1.65 }}>
              A world where AI is deployed responsibly, workforces are genuinely prepared, and the research informing those decisions is trustworthy because it was produced independently.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[{ title: "Structural independence", body: "No vendor relationships. No single funder above 30%. All policy research published openly. Independence is not a value — it is a governance rule." }, { title: "Research quality", body: "Peer-reviewed methodology. External academic review. We publish findings that are inconvenient for commissioning partners when the evidence demands it." }, { title: "Practical utility", body: "Research designed to be acted on — not to fill academic journals. Decision-makers should be able to use our findings the day they are published." }, { title: "Geographic integrity", body: "We do not apply Western frameworks to Indian contexts. Our India research is conducted in India, with Indian researchers, using India-appropriate methodology." }].map((val) => (
              <div key={val.title} style={{ background: "rgba(255,255,255,0.06)", padding: "18px 22px", borderLeft: `2px solid ${v.blueLight}` }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#e8f2fc", marginBottom: 4 }}>{val.title}</div>
                <div style={{ fontSize: 13, color: "#7aaac8", lineHeight: 1.6 }}>{val.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ padding: "80px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <SectionRule label="Leadership & Team" />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, marginBottom: 14 }}>The people building The Verita.</div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>The Verita is built by researchers, educators, and practitioners at the intersection of AI, enterprise, and policy. We are actively building our founding team.</p>
        </div>

        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 24 }}>Founding team</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule }}>
          {[{ initials: "FD", bg: v.bluePale, name: "Founder & Director", role: "Founding · India & US", bio: "The Verita's founder brings deep expertise in AI strategy, enterprise transformation, and the workforce challenges AI creates. Operating across India and the United States with a focus on building the intelligent enterprise." }, { initials: "AR", bg: "#eaf2ea", name: "Academic Research Director", role: "Hiring · PhD required", bio: "Leading The Verita's research agenda across all three focus areas. Responsible for research quality, publication standards, and academic partnerships. The single most important hire for the institute's credibility." }, { initials: "EP", bg: "#fef3e2", name: "Education Programs Director", role: "Hiring · India & US", bio: "Designing and delivering The Verita's enterprise cohort and executive education programs. Responsible for curriculum architecture, faculty relationships, and corporate client delivery." }].map((t) => (
            <div key={t.name} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, marginBottom: 16 }}>{t.initials}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: v.blue, fontWeight: 500, letterSpacing: 0.5, marginBottom: 12 }}>{t.role}</div>
              <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65 }}>{t.bio}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginTop: 40, marginBottom: 24 }}>Advisory board — being constituted</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, background: v.bgRule }}>
          {[{ initials: "AI", bg: v.bluePale, name: "AI Research Advisor", role: "Research · India", affil: "Senior AI researcher validating research methodology and publication standards." }, { initials: "PE", bg: "#eaf2ea", name: "Policy & Regulation Advisor", role: "Policy · India or US", affil: "Background in AI policy or government. Connects The Verita to policy conversations in both markets." }, { initials: "EA", bg: "#fef3e2", name: "Enterprise Advisor", role: "Industry · CHRO or CTO", affil: "Senior enterprise leader who has navigated AI transformation. Grounds the research agenda in organizational reality." }, { initials: "UA", bg: "#f0eeff", name: "University Partner Advisor", role: "Academic · India or US", affil: "Senior academic facilitating university research partnerships and joint publications." }].map((b) => (
            <div key={b.name} style={{ background: "#fff", padding: "22px 20px" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: b.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 600, color: v.navy, marginBottom: 12 }}>{b.initials}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: v.navy, marginBottom: 3 }}>{b.name}</div>
              <div style={{ fontSize: 11, color: v.blue, fontWeight: 500, letterSpacing: 0.3, marginBottom: 8 }}>{b.role}</div>
              <div style={{ fontSize: 12, color: "#7a8a9a", lineHeight: 1.5 }}>{b.affil}</div>
            </div>
          ))}
        </div>

        <div id="fellows" style={{ background: v.bgSoft, padding: "32px 36px", borderLeft: `3px solid ${v.blue}`, marginTop: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>We are hiring</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: v.navy, marginBottom: 8 }}>Join The Verita at the founding stage.</div>
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.7, marginBottom: 16 }}>We are building a small, exceptional founding team. If you are a researcher, educator, or practitioner who wants to work at the frontier of AI research and education — and who believes independent research is the most valuable thing an institution can produce — we want to hear from you.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            {["Academic Research Director", "Education Programs Director", "Founding Research Fellows", "Research Associate", "Operations Lead"].map((role) => (
              <span key={role} style={{ background: v.bluePale, color: "#1a5276", fontSize: 12, padding: "5px 12px", fontWeight: 500 }}>{role}</span>
            ))}
          </div>
          <Link href="#contact" style={{ background: v.navy, color: "#fff", padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>View open roles & apply</Link>
        </div>
      </section>

      {/* Independence */}
      <section style={{ padding: "80px 48px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <SectionRule label="Our independence policy" />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: v.navy, marginBottom: 16, lineHeight: 1.2 }}>Independence is not a value. It is a structural commitment.</div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 16 }}>Every research institute claims to be independent. Most are not — because their funding model makes genuine independence structurally impossible. The Verita's independence is built into how we operate, how we fund research, and how we publish findings.</p>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85 }}>We believe the most valuable thing an institution can produce is research that all parties — enterprises, governments, and the public — can trust unconditionally. That trust is built through structure, not through good intentions.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[{ rule: "No research sponsor directs findings.", detail: "Partners fund questions. The Verita owns the methodology, the analysis, and the conclusions." }, { rule: "No vendor relationships.", detail: "We do not recommend, endorse, or receive payment from technology vendors." }, { rule: "All policy research is published openly.", detail: "Applied corporate research may be proprietary for up to six months, after which it is published." }, { rule: "No single funder exceeds 30% of income.", detail: "Revenue diversification ensures no single relationship can compromise the research agenda." }, { rule: "Inconvenient findings are published.", detail: "If our research produces conclusions uncomfortable for any party — we publish them. Credibility requires this unconditionally." }].map((r) => (
              <div key={r.rule} style={{ background: "#fff", padding: "18px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ width: 8, height: 8, background: v.blue, borderRadius: "50%", flexShrink: 0, marginTop: 5, display: "inline-block" }} />
                <div style={{ fontSize: 14, color: "#3a4a5a", lineHeight: 1.6 }}><strong style={{ color: v.navy, fontWeight: 500 }}>{r.rule}</strong> {r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 48px", borderBottom: `1px solid ${v.border}` }}>
        <SectionRule label="Contact & locations" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule, marginTop: 40 }}>
          {[{ label: "Research enquiries", title: "Commission or collaborate on research", body: "For commissioned research, research partnerships, policy engagement, or media enquiries about our research agenda.", email: "research@theverita.ai" }, { label: "Education enquiries", title: "Programs for your organization", body: "For enterprise cohort programs, executive education intensives, AI readiness assessments, or fellowship enquiries.", email: "education@theverita.ai" }, { label: "General & partnerships", title: "Everything else", body: "For founding research partner enquiries, university partnership discussions, press, and general correspondence.", email: "hello@theverita.ai" }].map((c) => (
            <div key={c.label} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>{c.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, marginBottom: 10 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65, marginBottom: 16 }}>{c.body}</div>
              <a href={`mailto:${c.email}`} style={{ fontSize: 13, color: v.blue, fontWeight: 500, textDecoration: "none" }}>{c.email}</a>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: v.bgRule, marginTop: 2 }}>
          {[{ country: "India", cities: "New Delhi · Mumbai", note: "Primary research and education operations. India-focused research agenda, enterprise program delivery, and government engagement." }, { country: "United States", cities: "New York · San Francisco", note: "US research partnerships, enterprise education delivery, and policy engagement with US government bodies and foundations." }].map((o) => (
            <div key={o.country} style={{ background: v.bgSoft, padding: "24px 28px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 10 }}>{o.country}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: v.navy, marginBottom: 8 }}>{o.cities}</div>
              <div style={{ fontSize: 13, color: "#6a7a8a", lineHeight: 1.6 }}>{o.note}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
