"use client";
import { useState } from "react";

const v = { navy: "#1a3a5c", blue: "#2e75b6", blueLight: "#5a9ad4", bluePale: "#e6f0fb", bgSoft: "#f6f9fc", border: "#e8edf2", textBody: "#4a5568" };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Publication = {
  id: string;
  title: string;
  status: string;
  date: string;
  pdf_url: string | null;
  chunk_count: number;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    if (!password.trim()) {
      setMessage("Please enter a password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/publications`, {
        headers: { "x-admin-secret": password }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminSecret(password);
        setAuthenticated(true);
        setPublications(data.publications || []);
        setMessage("");
      } else {
        setMessage("Invalid password");
      }
    } catch (e) {
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPublications() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/publications`, {
        headers: { "x-admin-secret": adminSecret }
      });
      const data = await res.json();
      setPublications(data.publications || []);
    } catch (e) {
      setMessage("Failed to fetch publications");
    } finally {
      setLoading(false);
    }
  }

  async function processPDF(pub: Publication) {
    if (!pub.pdf_url) {
      setMessage(`No PDF uploaded for "${pub.title}"`);
      return;
    }
    setProcessing(pub.id);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/admin/process-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret
        },
        body: JSON.stringify({
          source_id: pub.id,
          source_title: pub.title,
          pdf_url: pub.pdf_url,
          source_type: "research"
        })
      });
      const data = await res.json();
      if (data.status === "success") {
        setMessage(`✅ Successfully processed ${data.chunks_processed} chunks for "${pub.title}"`);
        fetchPublications();
      } else {
        setMessage(`❌ Error: ${data.detail}`);
      }
    } catch (e) {
      setMessage("❌ Failed to process PDF");
    } finally {
      setProcessing(null);
    }
  }

  if (!authenticated) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: v.bgSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", padding: "48px", border: `1px solid ${v.border}`, maxWidth: 400, width: "100%" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy, marginBottom: 8 }}>Admin</div>
          <div style={{ fontSize: 13, color: "#6a7a8a", marginBottom: 24 }}>The Verita Content Management</div>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${v.border}`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box" as const }}
          />
          {message && <div style={{ fontSize: 12, color: "#e74c3c", marginBottom: 12 }}>{message}</div>}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ background: loading ? "#9aaabb" : v.navy, color: "#fff", border: "none", padding: "12px 24px", fontSize: 13, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", width: "100%", fontFamily: "'DM Sans', sans-serif" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: v.bgSoft }}>

      {/* Header */}
      <div style={{ background: v.navy, padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#fff" }}>The Verita — Admin</div>
        <button onClick={() => { setAuthenticated(false); setAdminSecret(""); setPassword(""); }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#a8c8e8", padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Sign out</button>
      </div>

      <div style={{ padding: "48px" }}>

        {/* Publications */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: v.navy }}>Research Publications</div>
            <button onClick={fetchPublications} style={{ background: "#fff", border: `1px solid ${v.border}`, color: v.navy, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Refresh
            </button>
          </div>

          {message && (
            <div style={{ padding: "12px 16px", background: message.includes("✅") ? "#e6f9ef" : "#fef0f0", border: `1px solid ${message.includes("✅") ? "#0f6e3a" : "#e74c3c"}`, color: message.includes("✅") ? "#0f6e3a" : "#e74c3c", fontSize: 13, marginBottom: 20, borderRadius: 2 }}>
              {message}
            </div>
          )}

          {loading ? (
            <div style={{ padding: 32, textAlign: "center", color: "#9aaabb" }}>Loading...</div>
          ) : (
            <div style={{ background: "#fff", border: `1px solid ${v.border}` }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 120px 80px 140px", gap: 16, padding: "12px 20px", borderBottom: `2px solid ${v.border}`, background: v.bgSoft }}>
                {["Title", "Status", "Date", "Chunks", "Action"].map((h) => (
                  <div key={h} style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: "#9aaabb", fontWeight: 500 }}>{h}</div>
                ))}
              </div>

              {publications.map((pub) => (
                <div key={pub.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 120px 80px 140px", gap: 16, padding: "16px 20px", borderBottom: `1px solid ${v.border}`, alignItems: "center" }}>
                  <div style={{ fontSize: 13, color: v.navy, fontWeight: 500, lineHeight: 1.4 }}>{pub.title}</div>
                  <div>
                    <span style={{ background: pub.status === "published" ? "#e6f9ef" : pub.status === "forthcoming" ? "#fef9e7" : v.bluePale, color: pub.status === "published" ? "#0f6e3a" : pub.status === "forthcoming" ? "#8a6500" : "#1a5276", fontSize: 10, padding: "2px 8px", fontWeight: 500 }}>
                      {pub.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6a7a8a" }}>{pub.date}</div>
                  <div style={{ fontSize: 13, color: pub.chunk_count > 0 ? "#0f6e3a" : "#9aaabb", fontWeight: pub.chunk_count > 0 ? 500 : 400 }}>
                    {pub.chunk_count > 0 ? `${pub.chunk_count} chunks` : "Not processed"}
                  </div>
                  <div>
                    {pub.pdf_url ? (
                      <button
                        onClick={() => processPDF(pub)}
                        disabled={processing === pub.id}
                        style={{ background: processing === pub.id ? "#9aaabb" : v.blue, color: "#fff", border: "none", padding: "8px 14px", fontSize: 12, cursor: processing === pub.id ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, width: "100%" }}
                      >
                        {processing === pub.id ? "Processing..." : pub.chunk_count > 0 ? "Re-process" : "Process PDF"}
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, color: "#9aaabb" }}>No PDF uploaded</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
```

