"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const NAV_LINKS = [
  { id: "research", label: "AI Research", href: "/research" },
  { id: "education", label: "AI Education", href: "/education" },
  { id: "publications", label: "Publications", href: "/publications" },
  { id: "about", label: "Our Purpose", href: "/about" },
  { id: "institute", label: "The Institute", href: "/institute" },
  { id: "fellows", label: "Fellows", href: "/fellows" },
  { id: "partner", label: "Partner with us", href: "/partner" },
];


export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #e8edf2", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
      
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
        <img src="/logo.png" alt="The Verita" style={{ height: 56, width: "auto" }} />
      </Link>

      {/* Desktop links */}
      <div className="nav-desktop" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href.split("#")[0] + "/");
          return (
            <Link key={link.id} href={link.href} style={{ fontSize: 13, color: isActive ? "#1a3a5c" : "#4a6a8a", textDecoration: "none", letterSpacing: 0.5, fontWeight: isActive ? 500 : 400, borderBottom: isActive ? "1.5px solid #2e75b6" : "1.5px solid transparent", paddingBottom: 2, whiteSpace: "nowrap" }}>
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-mobile"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}
        aria-label="Toggle menu"
      >
        <span style={{ width: 24, height: 2, background: "#1a3a5c", display: "block", transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ width: 24, height: 2, background: "#1a3a5c", display: "block", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
        <span style={{ width: 24, height: 2, background: "#1a3a5c", display: "block", transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="nav-mobile" style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", borderBottom: "1px solid #e8edf2", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 0, zIndex: 200 }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.id} href={link.href} onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: "#1a3a5c", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid #f0f4f8", fontWeight: 400 }}>
              {link.label}
            </Link>
          ))}
          <Link href="/about#contact" onClick={() => setMenuOpen(false)} style={{ background: "#1a3a5c", color: "#fff", padding: "14px 18px", fontSize: 13, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", fontWeight: 600, marginTop: 16, textAlign: "center" }}>
            Partner with us
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
