"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const C = {
  bg:     "#050505",
  card:   "#0f0f0f",
  border: "rgba(184,134,11,0.2)",
  gold:   "#b8860b",
  text:   "#e8e0d8",
  muted:  "rgba(232,224,216,0.45)",
  font:   "'DM Sans', system-ui, sans-serif",
  serif:  "Georgia, serif",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.font }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: C.gold }} />
            <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold }}>Admin</span>
            <div style={{ width: "32px", height: "1px", backgroundColor: C.gold }} />
          </div>
          <h1 style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, color: C.text, letterSpacing: "0.08em" }}>
            Luxe &amp; Delicate
          </h1>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "40px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "28px", textAlign: "center" }}>
            Dashboard Login
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoFocus
                style={{ width: "100%", padding: "12px 16px", backgroundColor: "#0a0a0a", border: `1px solid ${C.border}`, color: C.text, fontSize: "14px", outline: "none", fontFamily: C.font, boxSizing: "border-box" }}
              />
            </div>

            {error && (
              <p style={{ fontSize: "12px", color: "#e57373", textAlign: "center" }}>{error}</p>
            )}

            <button type="submit" disabled={loading}
              style={{ padding: "13px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                backgroundColor: loading ? "rgba(184,134,11,0.5)" : C.gold, color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: C.muted }}>
          ← <a href="/" style={{ color: C.muted, textDecoration: "underline" }}>Back to store</a>
        </p>
      </div>
    </div>
  );
}
