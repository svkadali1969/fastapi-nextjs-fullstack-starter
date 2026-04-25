import Link from "next/link";

const SmallShield = () => (
  <svg width="28" height="32" viewBox="0 0 72 80" fill="none">
    <path d="M36 2L70 18V42Q70 62 52 72Q44 77 36 80Q28 77 20 72Q2 62 2 42V18Z" fill="#1a3a5c"/>
    <path d="M36 8L64 22V42Q64 58 48 67Q40 71 36 74Q32 71 24 67Q8 58 8 42V22Z" fill="none" stroke="#5a9ad4" strokeWidth="1.5"/>
    <path d="M20 28L36 58L52 28" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28L36 58L52 28" fill="none" stroke="#5a9ad4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="28" y1="43" x2="44" y2="43" stroke="#5a9ad4" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const FOOTER_LINKS = {
  Research: [
    { label: "AI Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Commission Research", href: "/research#commission" },
  ],
  Education: [
    { label: "AI Education", href: "/education" },
    { label: "AI Foundations Certificate", href: "/education#students" },
    { label: "AI in Practice", href: "/education#workforce" },
    { label: "Executive AI Leadership", href: "/education#leadership" },
  ],
  Institute: [
    { label: "Our Purpose", href: "/about" },
    { label: "The Institute", href: "/institute" },
    { label: "Fellows", href: "/fellows" },
    { label: "Partner with us", href: "/partner" },
  ],
};

export default function Footer() {
  return (
    <>

    <footer className="footer-grid" style={{ padding: "48px", borderTop: "1px solid #e8edf2", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <img src="/logo.png" alt="The Verita" style={{ height: 56, width: "auto" }} />
          </Link>
          <p style={{ fontSize: 12, color: "#6a7a8a", lineHeight: 1.6, marginTop: 12, maxWidth: 220 }}>
            Independent AI research and education for the workforce powering tomorrow's intelligent enterprise.
          </p>
        </div>
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a9aaa", fontWeight: 600, marginBottom: 16 }}>{section}</div>
            {links.map((link) => (
              <Link key={link.label} href={link.href} style={{ fontSize: 13, color: "#4a5568", marginBottom: 10, display: "block", textDecoration: "none" }}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </footer>
      <div style={{ padding: "20px 24px", borderTop: "1px solid #e8edf2", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#8a9aaa" }}>© 2025 The Verita Institute for AI Research</span>
        <span style={{ fontSize: 12, color: "#8a9aaa" }}>India · United States</span>
      </div>
    </>
  );
}
