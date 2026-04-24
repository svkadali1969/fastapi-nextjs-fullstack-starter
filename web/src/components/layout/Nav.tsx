"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { id: "research", label: "Research", href: "/research" },
  { id: "education", label: "Education", href: "/education" },
  { id: "about", label: "About", href: "/about" },
  { id: "fellows", label: "Fellows", href: "/about#fellows" },
  { id: "publications", label: "Publications", href: "/research#publications" },
];

const ShieldSVG = () => (
  <svg width="36" height="40" viewBox="0 0 72 80" fill="none">
    <path d="M36 2L70 18V42Q70 62 52 72Q44 77 36 80Q28 77 20 72Q2 62 2 42V18Z" fill="#1a3a5c"/>
    <path d="M36 8L64 22V42Q64 58 48 67Q40 71 36 74Q32 71 24 67Q8 58 8 42V22Z" fill="none" stroke="#5a9ad4" strokeWidth="1.5"/>
    <path d="M20 28L36 58L52 28" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28L36 58L52 28" fill="none" stroke="#5a9ad4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="28" y1="43" x2="44" y2="43" stroke="#5a9ad4" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #e8edf2", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="/logo.png" alt="The Verita" style={{ height: 56, width: "auto" }} />
      </Link>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href.split("#")[0] + "/");
          return (
            <Link key={link.id} href={link.href} style={{ fontSize: 13, color: isActive ? "#1a3a5c" : "#4a6a8a", textDecoration: "none", letterSpacing: 0.5, fontWeight: isActive ? 500 : 400, borderBottom: isActive ? "1.5px solid #2e75b6" : "1.5px solid transparent", paddingBottom: 2 }}>
              {link.label}
            </Link>
          );
        })}
      </div>
      <Link href="/about#contact" style={{ background: "#1a3a5c", color: "#fff", padding: "9px 22px", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
        Partner with us
      </Link>
    </nav>
  );
}
