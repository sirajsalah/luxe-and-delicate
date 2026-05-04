"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BASE = "https://images.unsplash.com";

interface CartItem {
  id: string;
  slug: string;
  title: string;
  material: string;
  size: string;
  price: number;
  qty: number;
  image: string;
}

const INITIAL_CART: CartItem[] = [
  { id: "1", slug: "turquoise-stone-bead",   title: "Turquoise Stone Bead Bracelet", material: "Turquoise", size: "S/M", price: 68,  qty: 1, image: `${BASE}/photo-1601888238880-267580743a6d?w=400&q=80` },
  { id: "2", slug: "lapis-lazuli-bead",       title: "Lapis Lazuli Bead Bracelet",   material: "Lapis",     size: "M/L", price: 88,  qty: 2, image: `${BASE}/photo-1743127671067-62af70aa67c2?w=400&q=80` },
  { id: "3", slug: "keystone-bead-set",       title: "KeyStone Stack Set",           material: "Mixed",     size: "S/M", price: 144, qty: 1, image: `${BASE}/photo-1639706188490-876064810182?w=400&q=80` },
];

const SHIPPING = [
  { label: "Standard (5-7 days)", value: "standard", cost: 0,  note: "Free" },
  { label: "Express (2-3 days)",  value: "express",  cost: 12, note: "$12.00" },
  { label: "Overnight (1 day)",   value: "overnight", cost: 28, note: "$28.00" },
];

const DISCOUNT_CODES: Record<string, number> = {
  "LUXE10":   10,
  "WELCOME15": 15,
  "STONE20":  20,
};

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

export default function CartPage() {
  const [items, setItems]             = useState<CartItem[]>(INITIAL_CART);
  const [shipping, setShipping]       = useState("standard");
  const [code, setCode]               = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [codeError, setCodeError]     = useState("");

  const updateQty = (id: string, delta: number) =>
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal      = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost  = SHIPPING.find((s) => s.value === shipping)?.cost ?? 0;
  const discountPct   = appliedCode ? (DISCOUNT_CODES[appliedCode] ?? 0) : 0;
  const discountAmt   = Math.round(subtotal * discountPct / 100);
  const total         = subtotal + shippingCost - discountAmt;

  const applyCode = () => {
    const upper = code.trim().toUpperCase();
    if (DISCOUNT_CODES[upper]) {
      setAppliedCode(upper);
      setCodeError("");
    } else {
      setCodeError("Invalid code. Try LUXE10 or WELCOME15.");
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: C.font, textAlign: "center" }}>
        <p style={{ fontSize: "3rem", marginBottom: "20px" }}>◈</p>
        <h2 style={{ fontFamily: C.serif, fontSize: "2.4rem", fontWeight: 300, marginBottom: "12px" }}>Your bag is empty</h2>
        <p style={{ fontSize: "13px", color: C.muted, marginBottom: "36px" }}>Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" style={{ padding: "14px 48px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
          backgroundColor: C.gold, color: "#fff", textDecoration: "none" }}>
          Browse the Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* Page header */}
      <div style={{ padding: "56px 48px 36px", borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "16px" }}>
          <div style={{ width: "40px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Your Bag</span>
          <div style={{ width: "40px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
        </div>
        <h1 style={{ fontFamily: C.serif, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, letterSpacing: "0.05em" }}>
          Shopping Bag <span style={{ fontSize: "1.4rem", color: C.muted }}>({items.reduce((s, i) => s + i.qty, 0)})</span>
        </h1>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "16px", fontSize: "11px", color: C.muted, letterSpacing: "0.06em" }}>
          <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
          <span style={{ color: C.gold }}>›</span>
          <span style={{ color: C.text }}>Cart</span>
        </div>
      </div>

      {/* Checkout progress */}
      <div style={{ backgroundColor: C.card, borderBottom: `1px solid ${C.border}`, padding: "16px 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "0" }}>
          {[["Cart", true], ["Checkout", false], ["Confirmation", false]].map(([label, active], i) => (
            <div key={String(label)} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  backgroundColor: active ? C.gold : "transparent", border: `1px solid ${active ? C.gold : C.border}`,
                  fontSize: "11px", fontWeight: 700, color: active ? "#fff" : C.muted }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: active ? C.text : C.muted }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: "80px", height: "1px", backgroundColor: C.border, margin: "0 8px 20px" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 40px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "56px" }}>

        {/* LEFT — Cart items */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "16px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold }}>Your Items</p>
            <Link href="/shop" style={{ fontSize: "11px", color: C.muted, textDecoration: "none", letterSpacing: "0.06em" }}>
              + Continue Shopping
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {items.map((item) => (
              <div key={item.id} style={{ backgroundColor: C.card, padding: "24px", display: "grid", gridTemplateColumns: "96px 1fr auto", gap: "24px", alignItems: "start" }}>
                {/* Image */}
                <Link href={`/shop/${item.slug}`}>
                  <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
                    <Image src={item.image} alt={item.title} fill sizes="96px" style={{ objectFit: "cover" }} />
                  </div>
                </Link>

                {/* Details */}
                <div>
                  <Link href={`/shop/${item.slug}`} style={{ textDecoration: "none" }}>
                    <p style={{ fontFamily: C.serif, fontSize: "1.1rem", color: C.text, marginBottom: "6px", letterSpacing: "0.02em" }}>{item.title}</p>
                  </Link>
                  <p style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.08em", marginBottom: "4px" }}>{item.material} · Size {item.size}</p>
                  <p style={{ fontFamily: C.serif, fontSize: "1.1rem", color: C.gold, marginBottom: "16px" }}>${item.price}</p>

                  {/* Qty control */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0", border: `1px solid ${C.border}`, width: "fit-content" }}>
                    <button onClick={() => updateQty(item.id, -1)}
                      style={{ width: "36px", height: "36px", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: "16px" }}>−</button>
                    <span style={{ width: "32px", textAlign: "center", fontSize: "13px" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}
                      style={{ width: "36px", height: "36px", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: "16px" }}>+</button>
                  </div>
                </div>

                {/* Right — subtotal + remove */}
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: C.serif, fontSize: "1.2rem", color: C.text, marginBottom: "12px" }}>${item.price * item.qty}</p>
                  <button onClick={() => removeItem(item.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: C.muted, letterSpacing: "0.08em", textDecoration: "underline" }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Order summary */}
        <div>
          <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "32px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "24px" }}>Order Summary</p>

            {/* Line items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", paddingBottom: "24px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: C.muted }}>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {discountAmt > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#4caf50" }}>Discount ({discountPct}%)</span>
                  <span style={{ color: "#4caf50" }}>−${discountAmt}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: C.muted }}>Shipping</span>
                <span style={{ color: shippingCost === 0 ? "#4caf50" : C.text }}>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                </span>
              </div>
            </div>

            {/* Shipping options */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>Shipping</p>
              {SHIPPING.map((s) => (
                <label key={s.value}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", cursor: "pointer", fontSize: "12px", color: C.muted }}>
                  <input type="radio" name="shipping" value={s.value} checked={shipping === s.value}
                    onChange={() => setShipping(s.value)}
                    style={{ accentColor: C.gold }} />
                  <span style={{ flex: 1 }}>{s.label}</span>
                  <span style={{ color: s.cost === 0 ? "#4caf50" : C.text }}>{s.note}</span>
                </label>
              ))}
            </div>

            {/* Discount code */}
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "10px" }}>Discount Code</p>
              {appliedCode ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: `1px solid #4caf50`, backgroundColor: "rgba(76,175,80,0.08)" }}>
                  <span style={{ color: "#4caf50", fontSize: "12px" }}>✓ {appliedCode} — {discountPct}% off</span>
                  <button onClick={() => { setAppliedCode(null); setCode(""); }}
                    style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: "14px" }}>×</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: "0" }}>
                    <input
                      type="text" value={code} onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter code" onKeyDown={(e) => e.key === "Enter" && applyCode()}
                      style={{ flex: 1, padding: "10px 14px", backgroundColor: "#0a0a0a", border: `1px solid ${C.border}`,
                        color: C.text, fontSize: "12px", outline: "none", fontFamily: C.font }} />
                    <button onClick={applyCode}
                      style={{ padding: "10px 20px", backgroundColor: C.gold, border: "none", color: "#fff",
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>
                      Apply
                    </button>
                  </div>
                  {codeError && <p style={{ fontSize: "11px", color: "#e57373", marginTop: "6px" }}>{codeError}</p>}
                </div>
              )}
            </div>

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "20px 0", borderTop: `1px solid ${C.border}`, marginBottom: "24px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Total</span>
              <span style={{ fontFamily: C.serif, fontSize: "1.8rem", color: C.gold }}>${total}</span>
            </div>

            {/* Checkout button */}
            <Link href="/checkout"
              style={{ display: "block", textAlign: "center", padding: "16px", fontSize: "10px", fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase", backgroundColor: C.gold, color: "#fff",
                textDecoration: "none", marginBottom: "12px" }}>
              Proceed to Checkout →
            </Link>
            <p style={{ fontSize: "10px", color: C.muted, textAlign: "center", letterSpacing: "0.04em" }}>
              🔒 Secure checkout · SSL encrypted
            </p>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
            {["✦ Free Returns", "◈ Secure Payment", "⬡ Genuine Stones", "✈ Fast Dispatch"].map((b) => (
              <div key={b} style={{ padding: "12px", backgroundColor: C.card, border: `1px solid ${C.border}`,
                fontSize: "10px", color: C.muted, textAlign: "center", letterSpacing: "0.06em" }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
