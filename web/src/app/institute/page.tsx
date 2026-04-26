import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const metadata = { title: "The Institute — The Verita Institute for AI Research" };

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", bgRule: "#e8edf2", textBody: "#4a5568", border: "#e8edf2" };

function TeamCard({ member }: { member: any }) {
  return (
    <div style={{ background: "#fff", padding: "28px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: member.bg_color || v.bluePale, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: v.navy, flexShrink: 0 }}>
        {member.initials}
      </div>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: v.navy, marginBottom: 3 }}>{member.name}</div>
        <div style={{ fontSize: 11, color: v.blue, fontWeight: 500, letterSpacing: 0.3, marginBottom: 10 }}>{member.role}</div>
        {member.bio && <div style={{ fontSize: 13, color: "#6a7a8a", lineHeight: 1.65 }}>{member.bio}</div>}
      </div>
    </div>
  );
}

export default async function InstitutePage() {
  const { data: allMembers } = await supabase
    .from('team_members')
    .select('*')
    .eq('active', true)
    .order('display_order');

  const foundingTeam = allMembers?.filter(m => m.type === 'founding') || [];
  const advisoryBoard = allMembers?.filter(m => m.type === 'advisory') || [];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <section className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${v.border}` }}>
        <div style={{ background: v.navy, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>The Institute</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
            Built by people who believe independent research is the most valuable thing an institution can produce.
          </div>
        </div>
        <div style={{ background: v.bgSoft, padding: "64px 48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: v.blueLight, fontWeight: 500, marginBottom: 20 }}>Who We Are Building</div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 20 }}>
            The Verita is at the founding stage. We are building a small, exceptional team of researchers, educators, and practitioners who share a commitment to independent inquiry and a belief that the AI era requires institutions willing to ask the questions others cannot.
          </p>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.85, marginBottom: 24 }}>
            We are actively hiring for key roles and constituting our advisory board. If you want to build something that matters from the ground up — we want to hear from you.
          </p>
          <a href="mailto:hello@theveritaai.com" style={{ background: v.navy, color: "#fff", padding: "12px 24px", fontSize: 13, textDecoration: "none", fontWeight: 500, display: "inline-block" }}>Get in touch — hello@theveritaai.com</a>
        </div>
      </section>

      {/* Founding Team */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}` }}>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: v.navy, lineHeight: 1.2 }}>The people building The Verita.</div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>A small, exceptional founding team of researchers, educators, and practitioners. We are hiring for key roles — if you believe independent research is the most important contribution an institution can make, we want to hear from you.</p>
        </div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2, background: v.bgRule }}>
          {foundingTeam.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "20px 28px", background: v.bgSoft, borderLeft: `3px solid ${v.blue}` }}>
          <p style={{ fontSize: 13, color: v.textBody, lineHeight: 1.7 }}>
            Interested in joining the founding team? Contact us at <a href="mailto:hello@theveritaai.com" style={{ color: v.blue, textDecoration: "none", fontWeight: 500 }}>hello@theveritaai.com</a>
          </p>
        </div>
      </section>

      {/* Advisory Board */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${v.border}`, background: v.bgSoft }}>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: v.navy, lineHeight: 1.2 }}>Shaping the research agenda.</div>
          <p style={{ fontSize: 15, color: v.textBody, lineHeight: 1.8 }}>The Verita&apos;s advisory board is currently being constituted. We are seeking advisors who share our commitment to independent research and bring expertise across AI research, policy, enterprise, and academia.</p>
        </div>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2, background: v.bgRule }}>
          {advisoryBoard.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "20px 28px", background: "#fff", borderLeft: `3px solid ${v.blue}` }}>
          <p style={{ fontSize: 13, color: v.textBody, lineHeight: 1.7 }}>
            Interested in joining the advisory board? Contact us at <a href="mailto:hello@theveritaai.com" style={{ color: v.blue, textDecoration: "none", fontWeight: 500 }}>hello@theveritaai.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
