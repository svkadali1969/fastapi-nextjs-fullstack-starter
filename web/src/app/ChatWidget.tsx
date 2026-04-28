"use client";
import { useState, useRef, useEffect } from "react";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", border: "#e8edf2" };

type Message = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "What is the AI readiness gap?",
  "How do I commission research?",
  "What programs do you offer?",
  "What makes your research independent?",
  "How can my organization partner with The Verita?",
];

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Process links first [text](url)
    const processLine = (content: string) => {
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = linkRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.slice(lastIndex, match.index));
        }
        parts.push(
          <a key={match.index} href={match[2]} target="_blank" rel="noreferrer" style={{ color: v.blue, textDecoration: "underline", fontWeight: 500 }}>
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex));
      }
      return parts.length > 0 ? parts : content;
    };

    // Bold text
    const processBold = (content: string) => {
      const parts = content.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j} style={{ color: v.navy, fontWeight: 600 }}>{part}</strong> : part
      );
    };

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('• ')) {
      const content = line.replace(/^[-•]\s/, '');
      return (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          <span style={{ color: v.blue, flexShrink: 0 }}>•</span>
          <span>{processLine(content)}</span>
        </div>
      );
    }
    return line ? <p key={i} style={{ margin: "0 0 8px 0" }}>{processLine(line)}</p> : <div key={i} style={{ height: 4 }} />;
  });
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>(() => {
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem('verita-chat-messages');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
  });
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, [messages, thinking]);

  useEffect(() => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('verita-chat-messages', JSON.stringify(messages));
  }
  }, [messages]);

  async function sendMessage(text?: string) {
    const query = text ?? input.trim();
    if (!query || thinking) return;
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setThinking(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response || "I apologize, I could not process your request." }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: "I apologize, I am having trouble connecting. Please try again shortly." }]);
    } finally {
      setThinking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  return (
  <div className="chat-widget-container" style={{ maxWidth: 900, margin: "0 auto 36px", fontFamily: "'DM Sans', sans-serif", display: "grid", gridTemplateColumns: "200px 1fr", gap: 0, border: `1.5px solid ${v.navy}`, borderRadius: 2, boxShadow: "0 4px 24px rgba(26,58,92,0.08)", overflow: "hidden" }}>
      {/* Left — Suggestions */}
      <div style={{ background: v.bgSoft, borderRight: `2px solid ${v.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${v.border}` }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: "#9aaabb", fontWeight: 500 }}>Quick questions</div>
        </div>
        <div style={{ padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={thinking}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px 10px",
                fontSize: 12,
                color: thinking ? "#9aaabb" : "#3a4a5a",
                cursor: thinking ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left" as const,
                lineHeight: 1.5,
                borderRadius: 4,
                transition: "background 0.15s",
                width: "100%",
                whiteSpace: "normal" as const,
              }}
              onMouseEnter={(e) => { if (!thinking) e.currentTarget.style.background = v.bluePale; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Right — Chat */}
      <div style={{ display: "flex", flexDirection: "column", background: "#fff" }}>

        {/* Header */}
        <div style={{ background: v.navy, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: v.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>V</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: 0.3 }}>The Verita Research Agent</div>
            <div style={{ fontSize: 11, color: "#a8c8e8", marginTop: 1 }}>Powered by independent research · Claude AI</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 11, color: "#a8c8e8" }}>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ height: 260, overflowY: "auto", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12, background: v.bgSoft }}>

          {messages.length === 0 && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: v.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>V</div>
              <div style={{ background: "#fff", padding: "10px 14px", borderRadius: "0 10px 10px 10px", border: `1px solid ${v.border}`, maxWidth: "90%", fontSize: 13, color: "#3a4a5a", lineHeight: 1.65 }}>
                Welcome to The Verita Research Agent. Ask me about our research agenda, education programs, or how we can help your organization navigate the AI era.
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, background: m.role === "user" ? v.blue : v.navy, color: "#fff" }}>
                {m.role === "user" ? "You" : "V"}
              </div>
              <div style={{ maxWidth: "88%", padding: "10px 14px", fontSize: 13, lineHeight: 1.65, borderRadius: m.role === "user" ? "10px 0 10px 10px" : "0 10px 10px 10px", background: m.role === "user" ? v.blue : "#fff", color: m.role === "user" ? "#fff" : "#1a1a1a", border: m.role === "ai" ? `1px solid ${v.border}` : "none" }}>
                {m.role === "ai" ? renderMarkdown(m.text) : m.text}
              </div>
            </div>
          ))}

          {thinking && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: v.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>V</div>
              <div style={{ background: "#fff", padding: "10px 14px", borderRadius: "0 10px 10px 10px", border: `1px solid ${v.border}`, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: v.blueLight, animation: `bounce 1s ease ${i * 0.15}s infinite` }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: "#9aaabb", fontStyle: "italic" }}>Researching...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} style={{ height: 8 }} />
        </div>

        {/* Input */}
        <div style={{ background: "#fff", borderTop: `1px solid ${v.border}`, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask about our research or programs…"
            disabled={thinking}
            style={{ flex: 1, padding: "9px 12px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", border: `1px solid ${v.border}`, outline: "none", color: "#1a1a1a", background: thinking ? v.bgSoft : "#fff", borderRadius: 4 }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={thinking || !input.trim()}
            style={{ background: thinking || !input.trim() ? "#9aaabb" : v.navy, color: "#fff", border: "none", padding: "9px 16px", cursor: thinking || !input.trim() ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 600, letterSpacing: 0.3, borderRadius: 4, whiteSpace: "nowrap" as const }}
          >
            Ask →
          </button>
        </div>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @media (max-width: 768px) {
          .chat-widget-container {
            grid-template-columns: 1fr !important;
          }
          .chat-widget-container > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
