"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  bg:     "#050505",
  card:   "#0f0f0f",
  surface:"#111111",
  border: "rgba(184,134,11,0.18)",
  gold:   "#b8860b",
  text:   "#e8e0d8",
  muted:  "rgba(232,224,216,0.45)",
  font:   "'DM Sans', system-ui, sans-serif",
  serif:  "Georgia, 'Cormorant Garamond', serif",
};

const ORDERS = [
  { id: "#LD-00124", date: "Apr 18, 2025", status: "Delivered",   total: 156, items: ["Turquoise Stone Bead", "Lapis Lazuli Bead"] },
  { id: "#LD-00098", date: "Mar 02, 2025", status: "Delivered",   total: 88,  items: ["Hematite Dark Stone"] },
  { id: "#LD-00077", date: "Jan 15, 2025", status: "Delivered",   total: 212, items: ["KeyStone Stack Set", "Jade Cube Bracelet"] },
];

const statusColor: Record<string, string> = {
  "Delivered":   "#4caf50",
  "In Transit":  C.gold,
  "Processing":  "#ff9800",
};

type Tab = "login" | "register" | "account";

export default function AccountPage() {
  const [tab, setTab]             = useState<Tab>("login");
  const [loggedIn, setLoggedIn]   = useState(false);
  const [accountTab, setAccountTab] = useState<"orders"|"wishlist"|"settings">("orders");

  // Form state
  const [loginEmail, setLoginEmail]       = useState("");
  const [loginPass, setLoginPass]         = useState("");
  const [regName, setRegName]             = useState("");
  const [regEmail, setRegEmail]           = useState("");
  const [regPass, setRegPass]             = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTab("account");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTab("account");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", backgroundColor: "#0a0a0a",
    border: `1px solid ${C.border}`, color: C.text, fontSize: "13px",
    outline: "none", fontFamily: C.font, boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
    textTransform: "uppercase", color: C.gold, marginBottom: "8px",
  };

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* Page header */}
      <div style={{ padding: "56px 48px 36px", borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "16px" }}>
          <div style={{ width: "40px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>
            {loggedIn ? "My Account" : "Welcome Back"}
          </span>
          <div style={{ width: "40px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
        </div>
        <h1 style={{ fontFamily: C.serif, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, letterSpacing: "0.05em" }}>
          {loggedIn ? "Sofia's Account" : "Sign In"}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "16px", fontSize: "11px", color: C.muted, letterSpacing: "0.06em" }}>
          <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
          <span style={{ color: C.gold }}>›</span>
          <span style={{ color: C.text }}>Account</span>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 40px" }}>

        {/* ── NOT LOGGED IN ────────────────────────────────────────────── */}
        {!loggedIn && (
          <div style={{ maxWidth: "480px", margin: "0 auto" }}>
            {/* Tab switcher */}
            <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: "40px" }}>
              {(["login", "register"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ flex: 1, padding: "16px", background: "none", border: "none", cursor: "pointer",
                    fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: tab === t ? C.text : C.muted,
                    borderBottom: tab === t ? `2px solid ${C.gold}` : "2px solid transparent" }}>
                  {t === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {/* LOGIN */}
            {tab === "login" && (
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="your@email.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••" required style={inputStyle} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="button" style={{ background: "none", border: "none", cursor: "pointer",
                    fontSize: "11px", color: C.muted, textDecoration: "underline", letterSpacing: "0.04em" }}>
                    Forgot password?
                  </button>
                </div>
                <button type="submit"
                  style={{ padding: "15px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em",
                    textTransform: "uppercase", backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer" }}>
                  Sign In →
                </button>
                <p style={{ textAlign: "center", fontSize: "12px", color: C.muted }}>
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setTab("register")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: C.gold, fontSize: "12px", textDecoration: "underline" }}>
                    Create one
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER */}
            {tab === "register" && (
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)}
                    placeholder="Sofia Martinez" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="your@email.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)}
                    placeholder="Min. 8 characters" required style={inputStyle} />
                </div>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "12px", color: C.muted, lineHeight: 1.6 }}>
                  <input type="checkbox" style={{ accentColor: C.gold, marginTop: "2px", flexShrink: 0 }} />
                  I&apos;d like to receive exclusive offers, new arrivals & styling inspiration from Luxe &amp; Delicate
                </label>
                <button type="submit"
                  style={{ padding: "15px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em",
                    textTransform: "uppercase", backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer" }}>
                  Create Account →
                </button>
                <p style={{ textAlign: "center", fontSize: "12px", color: C.muted }}>
                  Already have an account?{" "}
                  <button type="button" onClick={() => setTab("login")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: C.gold, fontSize: "12px", textDecoration: "underline" }}>
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        )}

        {/* ── LOGGED IN DASHBOARD ──────────────────────────────────────── */}
        {loggedIn && (
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px" }}>

            {/* Sidebar nav */}
            <aside>
              <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "28px" }}>
                <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: C.gold, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: C.serif, fontSize: "1.4rem", color: "#fff", marginBottom: "10px" }}>
                    S
                  </div>
                  <p style={{ fontFamily: C.serif, fontSize: "1.1rem" }}>Sofia Martinez</p>
                  <p style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>sofia@example.com</p>
                </div>
                {(["orders", "wishlist", "settings"] as const).map((t) => (
                  <button key={t} onClick={() => setAccountTab(t)}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", background: "none", border: "none", cursor: "pointer",
                      fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: accountTab === t ? C.text : C.muted,
                      borderLeft: accountTab === t ? `2px solid ${C.gold}` : "2px solid transparent",
                      paddingLeft: "12px" }}>
                    {t === "orders" ? "Order History" : t === "wishlist" ? "Wishlist" : "Settings"}
                  </button>
                ))}
                <button onClick={() => { setLoggedIn(false); setTab("login"); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none",
                    cursor: "pointer", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginTop: "16px" }}>
                  Sign Out
                </button>
              </div>
            </aside>

            {/* Content */}
            <div>
              {/* Orders */}
              {accountTab === "orders" && (
                <div>
                  <h2 style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, marginBottom: "28px" }}>Order History</h2>
                  {ORDERS.length === 0 ? (
                    <p style={{ color: C.muted, fontSize: "13px" }}>No orders yet.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {ORDERS.map((o) => (
                        <div key={o.id} style={{ backgroundColor: C.card, padding: "24px 28px", border: `1px solid ${C.border}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                            <div>
                              <p style={{ fontFamily: C.serif, fontSize: "1.1rem", marginBottom: "4px" }}>{o.id}</p>
                              <p style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.04em" }}>{o.date}</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span style={{ display: "inline-block", padding: "3px 12px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em",
                                border: `1px solid ${statusColor[o.status] ?? C.border}`, color: statusColor[o.status] ?? C.text }}>
                                {o.status}
                              </span>
                              <p style={{ fontFamily: C.serif, fontSize: "1.1rem", color: C.gold, marginTop: "6px" }}>${o.total}</p>
                            </div>
                          </div>
                          <p style={{ fontSize: "12px", color: C.muted, letterSpacing: "0.04em" }}>
                            {o.items.join(", ")}
                          </p>
                          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                            <button style={{ padding: "7px 20px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em",
                              textTransform: "uppercase", background: "none", border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer" }}>
                              View Order
                            </button>
                            <button style={{ padding: "7px 20px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em",
                              textTransform: "uppercase", background: "none", border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer" }}>
                              Track
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist */}
              {accountTab === "wishlist" && (
                <div>
                  <h2 style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, marginBottom: "28px" }}>Your Wishlist</h2>
                  <div style={{ textAlign: "center", padding: "64px 0", color: C.muted }}>
                    <p style={{ fontSize: "2.5rem", marginBottom: "16px" }}>♡</p>
                    <p style={{ fontFamily: C.serif, fontSize: "1.4rem", fontWeight: 300, marginBottom: "8px" }}>Nothing saved yet</p>
                    <p style={{ fontSize: "13px", marginBottom: "28px" }}>Browse the collection and tap ♡ to save favourites.</p>
                    <Link href="/shop" style={{ padding: "12px 40px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
                      textTransform: "uppercase", backgroundColor: C.gold, color: "#fff", textDecoration: "none" }}>
                      Browse Shop
                    </Link>
                  </div>
                </div>
              )}

              {/* Settings */}
              {accountTab === "settings" && (
                <div>
                  <h2 style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, marginBottom: "28px" }}>Account Settings</h2>
                  <form style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" defaultValue="Sofia Martinez" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" defaultValue="sofia@example.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone (Optional)</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
                    </div>
                    <div style={{ height: "1px", backgroundColor: C.border }} />
                    <div>
                      <label style={labelStyle}>New Password</label>
                      <input type="password" placeholder="Leave blank to keep current" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Confirm New Password</label>
                      <input type="password" placeholder="••••••••" style={inputStyle} />
                    </div>
                    <button type="submit"
                      style={{ padding: "13px 32px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                        backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
