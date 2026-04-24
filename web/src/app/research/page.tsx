import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = { title: "Research — The Verita Institute for AI Research" };

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

export default function ResearchPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "64px 24px 56px", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>Independent AI Research</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: v.navy, lineHeight: 1.1, marginBottom: 16 }}>
          Research funded by<br />the <em style={{ color: v.blue }}>question,</em><br />not the answer.
        </h1>
        <p style={{ fontSize: 16, color: v.textBody, lineHeight: 1.75, maxWidth: 640, marginBottom: 36 }}>
          The Verita produces independent research that enterprises cannot commission from vendors, that consultancies cannot produce without bias, and that governments have not yet had time to fund.
        </p>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {["No vendor relationships", "No sponsored findings", "All policy research published openly", "Applied research available for co-publication"].map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, background: v.blue, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontSize: 13, color: "#4a6a8a", fontWeight: 500 }}>{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pillar nav */}
      <div style={{ display: "flex", gap: 2, background: v.bgRule, padding: "0 48px", flexWrap: "wrap" }}>
        {[["#fa1", "Focus Area 01 — The Future Workforce"], ["#fa2", "Focus Area 02 — Responsible AI in Practice"], ["#fa3", "Focus Area 03 — Applied Sector Research"]].map(([href, label]) => (
          <a key={href} href={href} style={{ padding: "16px 28px", fontSize: 13, fontWeight: 500, color: v.navy, background: "#fff", borderBottom: `3px solid ${v.blue}`, textDecoration: "none", whiteSpace: "nowrap" }}>{label}</a>
        ))}
      </div>

      {/* FA1 */}
      <div id="fa1" style={{ borderBottom: `1px solid ${v.border}` }}>
        <div className="pillar-header-grid" style={{ background: v.bgSoft, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 64, borderBottom: `1px solid ${v.border}` }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Focus Area 01</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 600, color: v.navy, lineHeight: 1.15, marginBottom: 16 }}>The Future Workforce</div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 20 }}>AI is restructuring labor markets faster than institutions can respond. Our research studies how AI is reshaping work at the individual, organizational, and societal level — and what the organizations navigating this transition most effectively are doing differently.</p>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 12 }}>Research questions we are investigating</div>
            {["What capabilities distinguish AI-ready managers from those who are not — and can they be taught?", "How do organizations measure and close the AI readiness gap at the workforce level?", "What does responsible AI deployment look like for the managers and directors actually making daily decisions?"].map((q) => (
              <div key={q} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: v.blue, fontWeight: 600, flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 13, color: v.textBody, lineHeight: 1.55, fontStyle: "italic" }}>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ label: "Primary geography", value: "India & United States", sub: "Comparative research across both markets" }, { label: "Flagship report", value: "AI & the Future of Work: India 2025", sub: "Publication Q4 2025" }, { label: "Research status", value: "Active", sub: "Accepting founding research partners" }].map((m) => (
              <div key={m.label} style={{ background: "#fff", padding: "16px 18px", borderLeft: `3px solid ${v.blue}` }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 5 }}>{m.label}</div>
                <div style={{ fontSize: 14, color: v.navy, fontWeight: 500 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: "#6a7a8a", marginTop: 3 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "40px 48px" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 24 }}>Forthcoming research — Focus Area 01</div>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule }}>
            {[{ tag: "Future Workforce · India", badge: "Forthcoming 2025", bg: "#fef9e7", tc: "#8a6500", title: "AI & the Future of Work: India Report 2025", body: "The first comprehensive study of AI readiness across India's workforce — what the data actually shows about the gap between organizational AI ambition and workforce capability.", meta: "Flagship Report · Q4 2025", link: "Register for early access →" }, { tag: "Future Workforce · Methodology", badge: "Working Paper", bg: v.bluePale, tc: "#1a5276", title: "Measuring the AI Readiness Gap: A Framework for Organizations", body: "An independent diagnostic framework for measuring workforce AI readiness at the manager and director level.", meta: "Research Framework · Forthcoming 2025", link: "Download draft framework →" }, { tag: "Future Workforce · US/India", badge: "In development", bg: v.bluePale, tc: "#1a5276", title: "The Manager Layer: Why AI Transformation Succeeds or Fails in the Middle", body: "Case-based research on how AI deployment outcomes correlate with manager-level capability.", meta: "Sector Study · Forthcoming 2026", link: "Express research interest →" }].map((c) => (
              <a key={c.title} href="#" style={{ background: "#fff", padding: "28px 24px", textDecoration: "none", display: "block" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>{c.tag} <span style={{ background: c.bg, color: c.tc, fontSize: 10, padding: "2px 7px", fontWeight: 500, marginLeft: 4 }}>{c.badge}</span></div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65, marginBottom: 16 }}>{c.body}</div>
                <div style={{ fontSize: 11, color: "#9aaabb" }}>{c.meta}</div>
                <span style={{ fontSize: 12, color: v.blue, fontWeight: 500, marginTop: 12, display: "block" }}>{c.link}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FA2 */}
      <div id="fa2" style={{ borderBottom: `1px solid ${v.border}` }}>
        <div className="pillar-header-grid" style={{ background: "#fff", padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 64, borderBottom: `1px solid ${v.border}` }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Focus Area 02</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 600, color: v.navy, lineHeight: 1.15, marginBottom: 16 }}>Responsible AI in Practice</div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 20 }}>Responsible AI is not a compliance exercise — it is an organizational capability. Our research studies what effective AI governance actually looks like inside enterprises, what the regulatory landscape across India and the US requires, and how organizations can govern AI today while preparing for what regulation will demand tomorrow.</p>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 12 }}>Research questions we are investigating</div>
            {["What governance structures are most effective at managing AI risk without blocking AI value?", "How does the regulatory landscape differ across India, the US, and the EU — and what does that mean for enterprises operating in multiple markets?", "What is the relationship between AI governance maturity and AI deployment performance?"].map((q) => (
              <div key={q} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: v.blue, fontWeight: 600, flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 13, color: v.textBody, lineHeight: 1.55, fontStyle: "italic" }}>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ label: "Regulatory coverage", value: "India · US · EU", sub: "Comparative regulatory research" }, { label: "Flagship output", value: "Governance Framework Toolkit", sub: "For risk and compliance leaders" }, { label: "Research status", value: "Active", sub: "Policy research published openly" }].map((m) => (
              <div key={m.label} style={{ background: v.bgSoft, padding: "16px 18px", borderLeft: `3px solid ${v.blue}` }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 5 }}>{m.label}</div>
                <div style={{ fontSize: 14, color: v.navy, fontWeight: 500 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: "#6a7a8a", marginTop: 3 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "40px 48px" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 24 }}>Forthcoming research — Focus Area 02</div>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2, background: v.bgRule }}>
            {[{ badge: "Forthcoming 2025", bg: "#fef9e7", tc: "#8a6500", tag: "Responsible AI · Governance", title: "The Independent AI Governance Framework: A Practitioner's Guide", body: "A practical governance framework for enterprises deploying AI — independent of any vendor or platform. Designed for risk, legal, and compliance leaders.", meta: "Governance Framework · Q4 2025", link: "Register for early access →" }, { badge: "Working Paper", bg: v.bluePale, tc: "#1a5276", tag: "Responsible AI · Comparative", title: "EU AI Act, India Guidelines, US Blueprint: A Comparative Framework", body: "For enterprises operating across India, the US, and Europe — a comparative analysis of three regulatory approaches and their practical implications.", meta: "Comparative Study · Forthcoming 2025", link: "Register for early access →" }].map((c) => (
              <a key={c.title} href="#" style={{ background: "#fff", padding: "28px 24px", textDecoration: "none", display: "block" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>{c.tag} <span style={{ background: c.bg, color: c.tc, fontSize: 10, padding: "2px 7px", fontWeight: 500, marginLeft: 4 }}>{c.badge}</span></div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65, marginBottom: 16 }}>{c.body}</div>
                <div style={{ fontSize: 11, color: "#9aaabb" }}>{c.meta}</div>
                <span style={{ fontSize: 12, color: v.blue, fontWeight: 500, marginTop: 12, display: "block" }}>{c.link}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FA3 */}
      <div id="fa3" style={{ borderBottom: `1px solid ${v.border}` }}>
        <div className="pillar-header-grid" style={{ background: v.bgSoft, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 64, borderBottom: `1px solid ${v.border}` }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Focus Area 03</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 600, color: v.navy, lineHeight: 1.15, marginBottom: 16 }}>Applied Sector Research</div>
            <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8, marginBottom: 20 }}>Every sector is being reshaped by AI — but the research available to decision-makers is either too generic to act on or too compromised to trust.</p>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 12 }}>Active sectors</div>
            {["Financial Services — lending, fraud detection, wealth management, RegTech", "Healthcare — diagnostics, clinical decision support, patient engagement", "High-Tech — engineering productivity, AI-native talent models", "Education — learning design, workforce pipeline, AI-first curricula"].map((q) => (
              <div key={q} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: v.blue, fontWeight: 600, flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 13, color: v.textBody, lineHeight: 1.55, fontStyle: "italic" }}>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ label: "Research model", value: "Commission-based", sub: "Organizations fund the question. The Verita owns the methodology and findings." }, { label: "Publication", value: "Joint or sole authorship", sub: "Commissioning organization may co-publish or receive proprietary access" }, { label: "Typical engagement", value: "8–16 weeks", sub: "From brief to final report delivery" }, { label: "Founding partner program", value: "Now open", sub: "Early partners shape the research agenda and receive named partnership" }].map((m) => (
              <div key={m.label} style={{ background: "#fff", padding: "16px 18px", borderLeft: `3px solid ${v.blue}` }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 500, marginBottom: 5 }}>{m.label}</div>
                <div style={{ fontSize: 14, color: v.navy, fontWeight: 500 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: "#6a7a8a", marginTop: 3 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "40px 48px" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 24 }}>Forthcoming research — Focus Area 03</div>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: v.bgRule }}>
            {[{ badge: "Forthcoming 2025", bg: "#fef9e7", tc: "#8a6500", tag: "Financial Services", title: "AI Adoption in Indian Banking: Where the Readiness Gap Is Largest", body: "An independent study of AI deployment across India's banking sector — what is working, where organizational readiness is failing.", meta: "Sector Report · Q4 2025", link: "Enquire about co-commissioning →" }, { badge: "Forthcoming 2025", bg: "#fef9e7", tc: "#8a6500", tag: "Healthcare", title: "Algorithmic Bias in Clinical AI: A Framework for Independent Assessment", body: "An independent methodology for evaluating AI deployment in clinical settings across India and the US.", meta: "Research Framework · Q4 2025", link: "Enquire about co-commissioning →" }, { badge: "In development", bg: v.bluePale, tc: "#1a5276", tag: "High-Tech", title: "The AI-Native Tech Company: How Leading Firms Are Rebuilding Their Operating Models", body: "How the highest-performing high-tech firms are redesigning engineering teams and talent models around AI as a core capability.", meta: "Sector Report · Forthcoming 2026", link: "Enquire about co-commissioning →" }].map((c) => (
              <a key={c.title} href="#" style={{ background: "#fff", padding: "28px 24px", textDecoration: "none", display: "block" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 12 }}>{c.tag} <span style={{ background: c.bg, color: c.tc, fontSize: 10, padding: "2px 7px", fontWeight: 500, marginLeft: 4 }}>{c.badge}</span></div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: v.navy, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#5a6a7a", lineHeight: 1.65, marginBottom: 16 }}>{c.body}</div>
                <div style={{ fontSize: 11, color: "#9aaabb" }}>{c.meta}</div>
                <span style={{ fontSize: 12, color: v.blue, fontWeight: 500, marginTop: 12, display: "block" }}>{c.link}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Commission */}
      <div id="commission" className="commission-grid" style={{ background: v.navy, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 14 }}>Commission Research</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: "#fff", lineHeight: 1.25, marginBottom: 14 }}>Have a specific AI question your organization needs answered independently?</div>
          <p style={{ fontSize: 14, color: "#a8c8e8", lineHeight: 1.75, marginBottom: 24 }}>The Verita takes on a small number of commissioned research engagements each quarter. You fund the question. We produce the answer the market can trust.</p>
          <Link href="/about#contact" style={{ background: "#fff", color: v.navy, padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>Discuss a research brief</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[{ step: "Step 01", title: "Submit a research brief", body: "Tell us your question, your sector, and what you need to understand." }, { step: "Step 02", title: "We scope and agree terms", body: "We propose a methodology and timeline. Independence of findings is non-negotiable." }, { step: "Step 03", title: "Research and publication", body: "Commissioning partners receive early access, named partnership, and co-publication option." }].map((s) => (
            <div key={s.step} style={{ background: "rgba(255,255,255,0.06)", padding: "20px 22px", borderLeft: `2px solid ${v.blueLight}`, marginBottom: 2 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 7 }}>{s.step}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#e8f2fc", marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#7aaac8", lineHeight: 1.55 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fellows */}
      <section id="fellows" className="two-col-grid" style={{ padding: "64px 48px", borderBottom: `1px solid ${v.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, background: v.bgSoft }}>
        <div>
          <SectionRule label="Research Fellows" />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: v.navy, marginBottom: 14, lineHeight: 1.25 }}>Build your research career at the frontier of AI.</div>
          <p style={{ fontSize: 14, color: v.textBody, lineHeight: 1.75, marginBottom: 24 }}>The Verita's fellows program brings together researchers from AI, economics, public policy, and social science. Fellows contribute to published research and gain access to enterprise partners and policy networks in India and the US.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/about#fellows" style={{ background: v.navy, color: "#fff", padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>Apply for a fellowship</Link>
            <Link href="/about#fellows" style={{ background: "transparent", color: v.navy, padding: "13px 28px", fontSize: 13, textDecoration: "none", fontWeight: 500, border: `1.5px solid ${v.navy}`, display: "inline-block" }}>Learn more</Link>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[{ title: "Founding Research Fellows", body: "Senior researchers with PhD-level credentials. Co-author institute publications. Applications open for 2025 cohort." }, { title: "Visiting Researchers", body: "Faculty and independent researchers on short-term appointments. Available year-round." }, { title: "Industry Research Fellows", body: "Experienced practitioners contributing sector knowledge to applied research projects." }].map((f) => (
            <div key={f.title} style={{ background: "#fff", padding: "18px 20px", borderLeft: `3px solid ${v.blue}` }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: v.navy, marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#6a7a8a", lineHeight: 1.55 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
