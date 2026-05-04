"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BASE = "https://images.unsplash.com";

const ORDER_ITEMS = [
  { id: "1", title: "Turquoise Stone Bead",  size: "S/M", price: 68,  qty: 1, image: `${BASE}/photo-1601888238880-267580743a6d?w=300&q=80` },
  { id: "2", title: "Lapis Lazuli Bead",     size: "M/L", price: 88,  qty: 2, image: `${BASE}/photo-1743127671067-62af70aa67c2?w=300&q=80` },
  { id: "3", title: "KeyStone Stack Set",    size: "S/M", price: 144, qty: 1, image: `${BASE}/photo-1639706188490-876064810182?w=300&q=80` },
];

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "France", "Germany", "UAE", "Saudi Arabia", "Netherlands"];

const C = {
  bg:     "#050505",
  card:   "#0f0f0f",
  surface:"#0a0a0a",
  border: "rgba(184,134,11,0.18)",
  gold:   "#b8860b",
  text:   "#e8e0d8",
  muted:  "rgba(232,224,216,0.45)",
  font:   "'DM Sans', system-ui, sans-serif",
  serif:  "Georgia, 'Cormorant Garamond', serif",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", backgroundColor: C.surface,
  border: `1px solid ${C.border}`, color: C.text, fontSize: "13px",
  outline: "none", fontFamily: C.font, boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
  textTransform: "uppercase", color: C.gold, marginBottom: "8px",
};

type Step = "shipping" | "payment" | "confirmed";

export default function CheckoutPage() {
  const [step, setStep]           = useState<Step>("shipping");
  const [sameAsBilling, setSame]  = useState(true);

  // Shipping fields
  const [firstName, setFirst]   = useState("");
  const [lastName, setLast]     = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [address, setAddress]   = useState("");
  const [apt, setApt]           = useState("");
  const [city, setCity]         = useState("");
  const [state, setState]       = useState("");
  const [zip, setZip]           = useState("");
  const [country, setCountry]   = useState("United States");

  const subtotal     = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping     = subtotal >= 65 ? 0 : 9;
  const discount     = 30; // applied code LUXE10
  const total        = subtotal + shipping - discount;

  const handleShipping = (e: React.FormEvent) => { e.preventDefault(); setStep("payment"); };
  const handlePayment  = (e: React.FormEvent) => { e.preventDefault(); setStep("confirmed"); };

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: C.serif, fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.1em", color: C.text, textDecoration: "none" }}>
          LUXE &amp; DELICATE
        </Link>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {([["shipping", "Shipping"], ["payment", "Payment"], ["confirmed", "Confirmed"]] as const).map(([s, label], i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  backgroundColor: step === s ? C.gold : (i < ["shipping","payment","confirmed"].indexOf(step) ? "#2d6a2d" : "transparent"),
                  border: `1px solid ${step === s ? C.gold : C.border}`,
                  fontSize: "10px", fontWeight: 700, color: step === s || i < ["shipping","payment","confirmed"].indexOf(step) ? "#fff" : C.muted }}>
                  {i < ["shipping","payment","confirmed"].indexOf(step) ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: step === s ? C.text : C.muted }}>{label}</span>
              </div>
              {i < 2 && <span style={{ color: C.border, fontSize: "12px" }}>›</span>}
            </div>
          ))}
        </div>
        <Link href="/cart" style={{ fontSize: "11px", color: C.muted, textDecoration: "none", letterSpacing: "0.06em" }}>
          ← Back to cart
        </Link>
      </div>

      {/* Confirmed state */}
      {step === "confirmed" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 40px", textAlign: "center" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "rgba(76,175,80,0.15)", border: "1px solid #4caf50",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "28px", color: "#4caf50" }}>
            ✓
          </div>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
            Order Confirmed
          </p>
          <h1 style={{ fontFamily: C.serif, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "16px" }}>
            Thank you, {firstName || "Beautiful"}!
          </h1>
          <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.9, marginBottom: "8px" }}>
            Your order <span style={{ color: C.text, fontWeight: 600 }}>#LD-00{Math.floor(Math.random() * 900 + 100)}</span> has been placed.
          </p>
          <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.9, marginBottom: "40px" }}>
            A confirmation email has been sent to <span style={{ color: C.text }}>{email || "your inbox"}</span>.
            Expected dispatch within 1–2 business days.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/account" style={{ padding: "12px 32px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              backgroundColor: C.gold, color: "#fff", textDecoration: "none" }}>
              View Order
            </Link>
            <Link href="/shop" style={{ padding: "12px 32px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              backgroundColor: "transparent", color: C.text, textDecoration: "none", border: `1px solid ${C.border}` }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Main checkout layout */}
      {step !== "confirmed" && (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr 420px", gap: "64px" }}>

          {/* LEFT — Forms */}
          <div>

            {/* SHIPPING FORM */}
            {step === "shipping" && (
              <form onSubmit={handleShipping}>
                <h2 style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, marginBottom: "32px", letterSpacing: "0.03em" }}>
                  Shipping Address
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input required value={firstName} onChange={(e) => setFirst(e.target.value)} placeholder="Sofia" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <input required value={lastName} onChange={(e) => setLast(e.target.value)} placeholder="Martinez" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Email Address *</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sofia@example.com" style={inputStyle} />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle} />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Address *</label>
                  <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main Street" style={inputStyle} />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Apartment, Suite, etc.</label>
                  <input value={apt} onChange={(e) => setApt(e.target.value)} placeholder="Apt 4B (optional)" style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="New York" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>State / Region</label>
                    <input value={state} onChange={(e) => setState(e.target.value)} placeholder="NY" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>ZIP / Postal Code *</label>
                    <input required value={zip} onChange={(e) => setZip(e.target.value)} placeholder="10001" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <label style={labelStyle}>Country *</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Shipping method */}
                <h3 style={{ fontFamily: C.serif, fontSize: "1.3rem", fontWeight: 300, marginBottom: "16px" }}>Shipping Method</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "32px" }}>
                  {[
                    { id: "free", label: "Standard Shipping (5-7 days)", price: "FREE", note: "Orders over $65" },
                    { id: "exp",  label: "Express Shipping (2-3 days)",  price: "$12",  note: "" },
                  ].map((opt) => (
                    <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px 20px",
                      border: `1px solid ${opt.id === "free" ? C.gold : C.border}`, cursor: "pointer", backgroundColor: opt.id === "free" ? "rgba(184,134,11,0.05)" : "transparent" }}>
                      <input type="radio" name="ship" defaultChecked={opt.id === "free"} style={{ accentColor: C.gold }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "13px", marginBottom: "2px" }}>{opt.label}</p>
                        {opt.note && <p style={{ fontSize: "11px", color: C.muted }}>{opt.note}</p>}
                      </div>
                      <span style={{ fontFamily: C.serif, fontSize: "1rem", color: opt.id === "free" ? "#4caf50" : C.text }}>{opt.price}</span>
                    </label>
                  ))}
                </div>

                <button type="submit"
                  style={{ width: "100%", padding: "16px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em",
                    textTransform: "uppercase", backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer" }}>
                  Continue to Payment →
                </button>
              </form>
            )}

            {/* PAYMENT FORM */}
            {step === "payment" && (
              <form onSubmit={handlePayment}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                  <button type="button" onClick={() => setStep("shipping")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: "14px" }}>←</button>
                  <h2 style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, letterSpacing: "0.03em" }}>Payment Details</h2>
                </div>

                {/* Shipping summary pill */}
                <div style={{ padding: "14px 20px", border: `1px solid ${C.border}`, backgroundColor: C.card, marginBottom: "28px",
                  display: "flex", justifyContent: "space-between", fontSize: "12px", color: C.muted }}>
                  <span>📍 {address || "123 Main St"}, {city || "New York"}, {zip || "10001"}</span>
                  <button type="button" onClick={() => setStep("shipping")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: C.gold, fontSize: "12px", textDecoration: "underline" }}>
                    Change
                  </button>
                </div>

                {/* Payment methods */}
                <div style={{ display: "flex", gap: "2px", marginBottom: "28px" }}>
                  {[{ id: "card", label: "Credit / Debit Card" }, { id: "paypal", label: "PayPal" }].map((m, i) => (
                    <button key={m.id} type="button"
                      style={{ flex: 1, padding: "14px", fontSize: "11px", letterSpacing: "0.08em",
                        backgroundColor: i === 0 ? "rgba(184,134,11,0.1)" : "transparent",
                        border: `1px solid ${i === 0 ? C.gold : C.border}`, color: i === 0 ? C.text : C.muted, cursor: "pointer" }}>
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Card Number *</label>
                  <input required placeholder="1234  5678  9012  3456" style={{ ...inputStyle, letterSpacing: "0.1em" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Name on Card *</label>
                  <input required defaultValue={`${firstName} ${lastName}`.trim() || ""} placeholder="Sofia Martinez" style={inputStyle} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div>
                    <label style={labelStyle}>Expiry Date *</label>
                    <input required placeholder="MM / YY" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Security Code *</label>
                    <input required placeholder="CVV" style={inputStyle} />
                  </div>
                </div>

                {/* Billing address */}
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginBottom: "28px", fontSize: "13px", color: C.muted }}>
                  <input type="checkbox" checked={sameAsBilling} onChange={(e) => setSame(e.target.checked)} style={{ accentColor: C.gold }} />
                  Billing address is the same as shipping
                </label>

                <button type="submit"
                  style={{ width: "100%", padding: "16px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em",
                    textTransform: "uppercase", backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer", marginBottom: "12px" }}>
                  🔒  Place Order · ${total}
                </button>
                <p style={{ fontSize: "11px", color: C.muted, textAlign: "center", letterSpacing: "0.04em" }}>
                  Your payment is encrypted with 256-bit SSL security.
                </p>
              </form>
            )}
          </div>

          {/* RIGHT — Order summary */}
          <div>
            <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "32px", position: "sticky", top: "24px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "24px" }}>
                Order Summary
              </p>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px", paddingBottom: "24px", borderBottom: `1px solid ${C.border}` }}>
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ position: "relative", width: "56px", height: "56px", flexShrink: 0, backgroundColor: "#0a0a0a", overflow: "hidden" }}>
                      <Image src={item.image} alt={item.title} fill sizes="56px" style={{ objectFit: "cover" }} />
                      {/* qty badge */}
                      <div style={{ position: "absolute", top: "-6px", right: "-6px", width: "18px", height: "18px", borderRadius: "50%",
                        backgroundColor: C.gold, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", fontWeight: 700, color: "#fff" }}>
                        {item.qty}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "12px", color: C.text, marginBottom: "2px" }}>{item.title}</p>
                      <p style={{ fontSize: "10px", color: C.muted }}>Size {item.size}</p>
                    </div>
                    <p style={{ fontFamily: C.serif, fontSize: "1rem", color: C.text }}>${item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: C.muted }}>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#4caf50" }}>Discount (LUXE10)</span>
                  <span style={{ color: "#4caf50" }}>−${discount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: C.muted }}>Shipping</span>
                  <span style={{ color: "#4caf50" }}>FREE</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Total</span>
                <span style={{ fontFamily: C.serif, fontSize: "1.8rem", color: C.gold }}>${total}</span>
              </div>

              {/* Policies */}
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {["🔒 256-bit SSL encryption", "🔄 100-day free returns", "📦 Ships in 1-2 business days"].map((p) => (
                  <p key={p} style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.04em" }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
