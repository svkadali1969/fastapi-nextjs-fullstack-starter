"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";
import ChatWidget from "./ChatWidget";


const RESPONSES: Record<string, string> = {
  gap: "The AI readiness gap refers to the growing mismatch between how fast organizations are deploying AI and how prepared their workforces are to work within it. Our forthcoming research shows this gap is most acute at the manager and director level — the layer where AI transformation actually succeeds or fails. It is not a technical gap. It is an organizational one.",
  commission: "Commissioning research with The Verita is straightforward. You bring a specific AI question within our focus areas — financial services, healthcare, high-tech, or education. We scope the methodology, conduct the research independently, and deliver findings you can act on. You fund the question. We own the methodology and conclusions. Contact research@theveritaai.com to discuss a brief.",
  programs: "The Verita offers three education programs: the AI Foundations Certificate — a 3-month program for students and early-career professionals; AI in Practice — for working professionals applying AI to real business problems; and the Executive AI Leadership Program — for senior leaders building AI-ready organizations.",
  independent: "Our independence is structural, not aspirational. We have no technology vendor relationships. No single funder exceeds 30% of our income. All policy research is published openly. And if our findings are inconvenient for a commissioning partner, we publish them anyway.",
  partner: "There are several ways to partner with The Verita — commission a sector research study, enrol your team in one of our education programs, or become a Founding Research Partner. Contact hello@theveritaai.com to start the conversation.",
};

function getResponse(input: string): string {
  const l = input.toLowerCase();
  if (l.includes("readiness") || l.includes("gap") || l.includes("workforce")) return RESPONSES.gap;
  if (l.includes("commission") || l.includes("brief")) return RESPONSES.commission;
  if (l.includes("program") || l.includes("cohort") || l.includes("intensive") || l.includes("education") || l.includes("training")) return RESPONSES.programs;
  if (l.includes("independent") || l.includes("vendor") || l.includes("trust") || l.includes("unbiased")) return RESPONSES.independent;
  if (l.includes("partner") || l.includes("work with") || l.includes("collaborate") || l.includes("organisation") || l.includes("organization")) return RESPONSES.partner;
  return "Thank you for your question. The Verita focuses on independent AI research and education across three pillars: Responsible AI, AI Governance, and the Future Workforce. For a detailed conversation, please contact hello@theveritaai.com.";
}

type Message = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "What is the AI readiness gap?",
  "How do I commission research?",
  "What programs do you offer?",
  "What makes your research independent?",
  "How can my organization partner with The Verita?",
];




export default function HomeContent({ tickerItems }: { tickerItems: string[] }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  async function sendMessage(text?: string) {
    const query = text ?? input.trim();
    if (!query) return;
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setThinking(true);
    setShowSuggestions(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response || "I apologize, I could not process your request." }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: getResponse(query) }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "72px 48px 0", textAlign: "center", borderBottom: "1px solid #e8edf2" }}>
        <p style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#5a8ab8", fontWeight: 600, marginBottom: 18 }}>
          Independent AI Research &amp; Education
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 600, color: "#1a3a5c", lineHeight: 1.05, marginBottom: 16 }}>
          Truth in AI.
        </h1>
        <p style={{ fontSize: 15, color: "#5a7090", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
          Advancing AI-literate workforces through independent research and future-ready education.
        </p>


      </section>

      {/* Focus Areas */}
      <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#e8edf2" }}>

        {/* AI Research */}
        <div style={{ background: "#fff", padding: "48px 40px", borderLeft: "4px solid #1a3a5c", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: "#5a9ad4", fontWeight: 600, marginBottom: 20 }}>AI Research</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: "#1a3a5c", lineHeight: 1.2, marginBottom: 20 }}>
            Beyond the Model: Who Is Asking the Harder Questions?
          </div>
          <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.8, marginBottom: 24, flex: 1 }}>
            The Verita&apos;s research is focused on three areas where independent inquiry is most needed: Responsible AI, AI Governance, and the Future Workforce. Our research equips organizations with the insight to deploy AI responsibly — not waiting for regulation to arrive, but building the ethical frameworks and workforce capability that sustainable AI adoption requires. We are a research and education institute. We do not implement, we do not consult, and we do not have a platform to sell. What we produce is independent research — and education programs built directly from that research. Our findings inform what we teach. What we teach is grounded in evidence, not vendor agendas. Organizations gain both the insight to understand what AI requires of them, and the capability to act on it.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#2e75b6", marginBottom: 24, paddingTop: 20, borderTop: "1px solid #e8edf2" }}>
             Research that informs. Education that builds capability.
          </div>
          <Link href="/research" style={{ fontSize: 13, color: "#2e75b6", fontWeight: 600, textDecoration: "none", letterSpacing: 0.3 }}>
            Read our research agenda →
          </Link>
        </div>

        {/* AI Education */}
        <div style={{ background: "#f6f9fc", padding: "48px 40px", borderLeft: "4px solid #1a3a5c", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: "#5a9ad4", fontWeight: 600, marginBottom: 20 }}>AI Education</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: "#1a3a5c", lineHeight: 1.2, marginBottom: 20 }}>
            Are We Educating Students for a World That No Longer Exists?
          </div>
          <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.8, marginBottom: 24, flex: 1 }}>
            Many institutions are still debating whether students should use AI at all. We think that&apos;s the wrong question. The right question is how AI gets integrated into learning — responsibly, critically, and in ways that prepare students for the world they will actually work in. The Verita&apos;s education research studies what curricula need to look like for the AI era: not AI as an add-on subject, but AI woven into how students learn, work, and are assessed every single day.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#2e75b6", marginBottom: 24, paddingTop: 20, borderTop: "1px solid #e8edf2" }}>
            Not AI as a subject. AI as the environment.
          </div>
          <Link href="/education" style={{ fontSize: 13, color: "#2e75b6", fontWeight: 600, textDecoration: "none", letterSpacing: 0.3 }}>
            Read our education research →
          </Link>
        </div>

      </div>

      {/* Chat */}
      {/* Research Agent Section */}
      <section style={{ padding: "64px 48px 0", textAlign: "center", borderTop: "1px solid #e8edf2" }}>
        <p style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#5a8ab8", fontWeight: 600, marginBottom: 18 }}>
          AI Research Agent
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: "#1a3a5c", lineHeight: 1.05, marginBottom: 16 }}>
          The Verita Research Agent.
        </h2>
        <p style={{ fontSize: 15, color: "#5a7090", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
          Ask our AI research agent about our work, programs, or how The Verita can help your organization navigate the AI era.
        </p>
        <ChatWidget />
    </section>
    
      {/* Ticker */}
      <div style={{ background: "#1a3a5c", padding: "12px 48px", display: "flex", gap: 48, overflowX: "auto" }}>
        {tickerItems.map((item) => (
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
