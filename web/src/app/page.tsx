"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

const RESPONSES: Record<string, string> = {
  gap: "The AI readiness gap refers to the growing mismatch between how fast organizations are deploying AI and how prepared their workforces are to work within it. Our forthcoming research shows this gap is most acute at the manager and director level — the layer where AI transformation actually succeeds or fails. It is not a technical gap. It is an organizational one.",
  commission: "Commissioning research with The Verita is straightforward. You bring a specific AI question within our focus areas — financial services, healthcare, high-tech, or education. We scope the methodology, conduct the research independently, and deliver findings you can act on. You fund the question. We own the methodology and conclusions. Contact research@theverita.ai to discuss a brief.",
  programs: "The Verita offers three education programs: the AI Leadership Cohort — a 4-week program for managers and directors; The Intelligent Enterprise Intensive — a 3-day open enrollment program for directors and senior managers; and Responsible AI for Risk & Compliance Leaders — a 2-day specialist program. We also offer AI Readiness Assessments.",
  independent: "Our independence is structural, not aspirational. We have no technology vendor relationships. No single funder exceeds 30% of our income. All policy research is published openly. And if our findings are inconvenient for a commissioning partner, we publish them anyway.",
  partner: "There are several ways to partner with The Verita — commission a sector research study, enrol your team in the AI Leadership Cohort or The Intelligent Enterprise Intensive, or become a Founding Research Partner. Contact hello@theverita.ai to start the conversation.",
};

function getResponse(input: string): string {
  const l = input.toLowerCase();
  if (l.includes("readiness") || l.includes("gap") || l.includes("workforce")) return RESPONSES.gap;
  if (l.includes("commission") || l.includes("brief")) return RESPONSES.commission;
  if (l.includes("program") || l.includes("cohort") || l.includes("intensive") || l.includes("education") || l.includes("training")) return RESPONSES.programs;
  if (l.includes("independent") || l.includes("vendor") || l.includes("trust") || l.includes("unbiased")) return RESPONSES.independent;
  if (l.includes("partner") || l.includes("work with") || l.includes("collaborate") || l.includes("organisation") || l.includes("organization")) return RESPONSES.partner;
  return "Thank you for your question. The Verita focuses on three areas: The Future Workforce, Responsible AI in Practice, and Applied Sector Research. For a detailed conversation, please contact hello@theverita.ai.";
}

type Message = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "What is the AI readiness gap?",
  "How do I commission research?",
  "What programs do you offer?",
  "What makes your research independent?",
  "How can my organization partner with The Verita?",
];

const TICKER_ITEMS = [
  "Forthcoming — AI & the Future of Work: India Report 2025",
  "Applications open — Founding Research Fellows Program",
  "Launching — AI Leadership Cohort · Managers & Directors · Cohort 1",
  "Forthcoming — Responsible AI Governance Frameworks Report",
];

const FOCUS_AREAS = [
  {
    num: "Focus Area 01",
    title: "The Future Workforce",
    body: "Organizations are transforming at unprecedented speed — but their workforces are not keeping pace. We study how AI is reshaping work and build education programs that are AI-first by architecture, not addition.",
    link: "Explore the AI Leadership Cohort →",
    href: "/education#cohort",
  },
  {
    num: "Focus Area 02",
    title: "Responsible AI in Practice",
    body: "Responsible AI cannot be a compliance exercise. We help organizations govern AI today while producing the independent research that informs what regulation should look like tomorrow.",
    link: "Commission a Governance Framework →",
    href: "/research#fa2",
  },
  {
    num: "Focus Area 03",
    title: "Applied Sector Research",
    body: "Independent, sector-specific AI research for decision-makers who need to act. Financial services, healthcare, high-tech, and education — funded by the question, not the answer.",
    link: "Commission Sector Research →",
    href: "/research#commission",
  },
];

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  function sendMessage(text?: string) {
    const query = text ?? input.trim();
    if (!query) return;
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setThinking(true);
    setShowSuggestions(false);
    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [...prev, { role: "ai", text: getResponse(query) }]);
    }, 800 + Math.random() * 400);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>

      {/* Nav */}
      <Nav />  
      {/* Hero */}
      <section style={{ padding: "72px 48px 0", textAlign: "center", borderBottom: "1px solid #e8edf2" }}>
        <p style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#5a8ab8", fontWeight: 500, marginBottom: 18 }}>
          Independent AI Research &amp; Education
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 500, color: "#1a3a5c", lineHeight: 1.05, marginBottom: 16 }}>
          Truth in AI.
        </h1>
      <p style={{ fontSize: 15, color: "#5a7090", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
          Advancing AI-literate workforces through independent research and future-ready education.
      </p>

        {/* Chat */}
        <div style={{ maxWidth: 660, margin: "0 auto 18px" }}>
          <div style={{ border: "1.5px solid #1a3a5c", background: "#fff", overflow: "hidden" }}>
            {messages.length > 0 && (
              <div style={{ padding: "18px 22px 0", maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 500, marginTop: 2, background: m.role === "user" ? "#1a3a5c" : "#e6f0fb", color: m.role === "user" ? "#fff" : "#2e75b6" }}>
                      {m.role === "user" ? "You" : "V"}
                    </div>
                    <div style={{ maxWidth: "80%", padding: "9px 13px", fontSize: 13, lineHeight: 1.6, background: m.role === "user" ? "#1a3a5c" : "#f0f5fa", color: m.role === "user" ? "#fff" : "#1a1a1a", borderLeft: m.role === "ai" ? "3px solid #2e75b6" : "none" }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {thinking && (
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e6f0fb", color: "#2e75b6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 500 }}>V</div>
                    <div style={{ padding: "9px 13px", background: "#f0f5fa", borderLeft: "3px solid #2e75b6" }}>
                      <span style={{ color: "#2e75b6", fontSize: 13 }}>Thinking…</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "stretch", borderTop: messages.length > 0 ? "1px solid #e8edf2" : "none" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about our research, programs, or how we can help your organization…"
                style={{ flex: 1, padding: "15px 18px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", border: "none", outline: "none", color: "#1a1a1a", background: "#fff" }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={thinking}
                style={{ background: thinking ? "#9aaabb" : "#1a3a5c", color: "#fff", border: "none", padding: "0 20px", cursor: thinking ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", letterSpacing: 0.3 }}
              >
                Ask Verita →
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => sendMessage(s)} style={{ border: "1px solid #dce6f0", padding: "7px 15px", fontSize: 12, color: "#4a6a8a", cursor: "pointer", background: "#fff", fontFamily: "'DM Sans', sans-serif", borderRadius: 20 }}>
                {s}
              </button>
            ))}
          </div>
        )}
      </section>

 {/* Focus Areas */}
 
 {/* Focus Areas Banner */}
 
 
{/* Focus Areas */}
    <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#e8edf2" }}>
        {/* AI Research */}
        <div style={{ background: "#fff", padding: "48px 40px", borderLeft: "4px solid #1a3a5c", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: "#5a9ad4", fontWeight: 500, marginBottom: 20 }}>AI Research</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: "#1a3a5c", lineHeight: 1.2, marginBottom: 20 }}>
            Beyond the Model: Who Is Asking the Harder Questions?
          </div>
          <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.8, marginBottom: 24, flex: 1 }}>
            The race to build better models is well funded. The harder question — how organizations leverage their real assets: their data, their people, their institutional knowledge — to create lasting, responsible business value from AI — is not. That is where The Verita&apos;s research agenda is focused. We study how organizations can capture value from AI in the near term while building toward the deeper transformation that long-term competitiveness will require. And we are honest about both horizons — including what it will eventually take to compete in a world where AI is at the core of every business system.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#2e75b6", marginBottom: 24, paddingTop: 20, borderTop: "1px solid #e8edf2" }}>
            Near-term value. Long-term transformation. Independent research.
          </div>
          <Link href="/research" style={{ fontSize: 13, color: "#2e75b6", fontWeight: 500, textDecoration: "none", letterSpacing: 0.3 }}>
            Read our research agenda →
          </Link>
        </div>

        {/* AI Education */}
        <div style={{ background: "#f6f9fc", padding: "48px 40px", borderLeft: "4px solid #1a3a5c", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: "#5a9ad4", fontWeight: 500, marginBottom: 20 }}>AI Education</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 500, color: "#1a3a5c", lineHeight: 1.2, marginBottom: 20 }}>
            Are We Educating Students for a World That No Longer Exists?
          </div>
          <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.8, marginBottom: 24, flex: 1 }}>
            Many institutions are still debating whether students should use AI at all. We think that&apos;s the wrong question. The right question is how AI gets integrated into learning — responsibly, critically, and in ways that prepare students for the world they will actually work in. The Verita&apos;s education research studies what curricula need to look like for the AI era: not AI as an add-on subject, but AI woven into how students learn, work, and are assessed every single day.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#2e75b6", marginBottom: 24, paddingTop: 20, borderTop: "1px solid #e8edf2" }}>
            Not AI as a subject. AI as the environment.
          </div>
          <Link href="/education" style={{ fontSize: 13, color: "#2e75b6", fontWeight: 500, textDecoration: "none", letterSpacing: 0.3 }}>
            Read our education research →
          </Link>
        </div>

      </div>

      {/* Ticker */}
      <div style={{ background: "#1a3a5c", padding: "12px 48px", display: "flex", gap: 48, overflowX: "auto" }}>
        {TICKER_ITEMS.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5a9ad4", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#c8d8e8", whiteSpace: "nowrap", letterSpacing: 0.3 }}>{item}</span>
          </div>
        ))}
      </div>
    <Footer />
    </div>
  );
}
