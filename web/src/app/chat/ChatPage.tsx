"use client";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/app/ChatWidget";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bgSoft: "#f6f9fc", border: "#e8edf2" };

export default function ChatPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />
      <section style={{ padding: "64px 48px 0", textAlign: "center", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 16 }}>
          AI Research Agent
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: v.navy, lineHeight: 1.1, marginBottom: 16 }}>
          The Verita Research Agent.
        </h1>
        <p style={{ fontSize: 15, color: "#5a7090", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 36px" }}>
          Ask our AI research agent about our research agenda, education programs, or how The Verita can help your organization navigate the AI era. Powered by independent research and Claude AI.
        </p>
        <ChatWidget />
      </section>
      <Footer />
    </div>
  );
}