"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Product data (replace with Supabase query in Session 4) ───────────────
const BASE = "https://images.unsplash.com";

const GALLERY = [
  `${BASE}/photo-1601888238880-267580743a6d?w=900&q=90`,
  `${BASE}/photo-1639363885736-b6685fcbf1f5?w=900&q=90`,
  `${BASE}/photo-1637808248242-57a6265593ed?w=900&q=90`,
  `${BASE}/photo-1534976618208-4833d5b57d08?w=900&q=90`,
];

const REVIEWS = [
  { id: 1, name: "Sofia R.",       rating: 5, date: "Apr 12, 2025", text: "Absolutely stunning. The lapis lazuli colour is so rich in person — photos don't do it justice. Wear it every day." },
  { id: 2, name: "Amelia K.",      rating: 5, date: "Mar 28, 2025", text: "Quality is incredible. Arrived in beautiful packaging. My second purchase from Luxe & Delicate and won't be my last." },
  { id: 3, name: "Priya T.",       rating: 4, date: "Mar 10, 2025", text: "Love the bracelet! Sizing ran slightly small so I'd recommend sizing up. Customer service was super helpful." },
  { id: 4, name: "Charlotte M.",   rating: 5, date: "Feb 22, 2025", text: "I bought this as a gift and she was absolutely obsessed. Perfect weight, feels luxurious on the wrist." },
];

const RELATED = [
  { slug: "sodalite-heishi-bead", title: "Sodalite Heishi Bead",    price: 58,  image: `${BASE}/photo-1743127671067-62af70aa67c2?w=500&q=80` },
  { slug: "hematite-bead-dark",   title: "Hematite Dark Stone",     price: 72,  image: `${BASE}/photo-1534976618208-4833d5b57d08?w=500&q=80` },
  { slug: "jade-cube-bracelet",   title: "Jade Cube Stone",         price: 78,  image: `${BASE}/photo-1639363885736-b6685fcbf1f5?w=500&q=80` },
  { slug: "amber-stone-bead",     title: "Amber Stone Bead",        price: 82,  image: `${BASE}/photo-1637808248242-57a6265593ed?w=500&q=80` },
];

const C = {
  bg:     "#050505",
  card:   "#0f0f0f",
  border: "rgba(184,134,11,0.18)",
  gold:   "#b8860b",
  text:   "#e8e0d8",
  muted:  "rgba(232,224,216,0.45)",
  font:   "'DM Sans', system-ui, sans-serif",
  serif:  "Georgia, 'Cormorant Garamond', serif",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: C.gold, fontSize: "14px", letterSpacing: "2px" }}>
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

export default function ProductPage() {
  const [activeImg, setActiveImg]     = useState(0);
  const [size, setSize]               = useState("S/M");
  const [material, setMaterial]       = useState("Lapis Lazuli");
  const [qty, setQty]                 = useState(1);
  const [added, setAdded]             = useState(false);
  const [activeTab, setActiveTab]     = useState<"details"|"care"|"sizing">("details");

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const avgRating = Math.round(REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length);

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* Breadcrumb */}
      <div style={{ padding: "20px 48px", borderBottom: `1px solid ${C.border}`, fontSize: "11px", color: C.muted, letterSpacing: "0.06em" }}>
        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
          <span style={{ color: C.gold }}>›</span>
          <Link href="/shop" style={{ color: C.muted, textDecoration: "none" }}>Shop</Link>
          <span style={{ color: C.gold }}>›</span>
          <span style={{ color: C.text }}>Lapis Lazuli Stone Bead Bracelet</span>
        </span>
      </div>

      {/* ── MAIN PRODUCT AREA ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "56px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px" }}>

        {/* LEFT — Gallery */}
        <div>
          {/* Main image */}
          <div style={{ position: "relative", aspectRatio: "1/1", backgroundColor: C.card, overflow: "hidden", marginBottom: "12px" }}>
            <Image src={GALLERY[activeImg]} alt="Product" fill sizes="600px"
              style={{ objectFit: "cover" }} priority />
            {/* Nav arrows */}
            {activeImg > 0 && (
              <button onClick={() => setActiveImg((i) => i - 1)}
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)",
                  border: `1px solid ${C.border}`, color: C.text, width: "38px", height: "38px", cursor: "pointer", fontSize: "16px" }}>
                ‹
              </button>
            )}
            {activeImg < GALLERY.length - 1 && (
              <button onClick={() => setActiveImg((i) => i + 1)}
                style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)",
                  border: `1px solid ${C.border}`, color: C.text, width: "38px", height: "38px", cursor: "pointer", fontSize: "16px" }}>
                ›
              </button>
            )}
            {/* Badge */}
            <div style={{ position: "absolute", top: "16px", left: "16px", padding: "3px 12px", fontSize: "8px", fontWeight: 700,
              letterSpacing: "0.2em", border: `1px solid ${C.gold}`, color: C.gold, backgroundColor: "rgba(0,0,0,0.7)" }}>
              TOP RATED
            </div>
          </div>
          {/* Thumbnails */}
          <div style={{ display: "flex", gap: "10px" }}>
            {GALLERY.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                style={{ position: "relative", width: "76px", height: "76px", flexShrink: 0, cursor: "pointer", padding: 0,
                  border: `2px solid ${activeImg === i ? C.gold : "transparent"}`, overflow: "hidden", backgroundColor: C.card }}>
                <Image src={src} alt={`View ${i + 1}`} fill sizes="76px" style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div>
          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Stars rating={avgRating} />
            <span style={{ fontSize: "12px", color: C.muted }}>({REVIEWS.length} reviews)</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "8px", lineHeight: 1.15 }}>
            Lapis Lazuli Stone<br />
            <span style={{ fontStyle: "italic", color: "#c8b896" }}>Bead Bracelet</span>
          </h1>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px", margin: "20px 0 28px" }}>
            <span style={{ fontFamily: C.serif, fontSize: "2rem", color: C.gold, fontWeight: 500 }}>$88</span>
            <span style={{ fontSize: "12px", color: C.muted, letterSpacing: "0.04em" }}>Free shipping over $65</span>
          </div>

          <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.9, marginBottom: "32px", maxWidth: "420px" }}>
            Hand-knotted with genuine lapis lazuli beads sourced from Afghanistan. Each bead is selected for its deep royal blue tone and natural gold pyrite inclusions. Elastic fit, no clasp needed.
          </p>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "28px" }} />

          {/* Material selector */}
          <div style={{ marginBottom: "22px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>
              Stone — <span style={{ color: C.text }}>{material}</span>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Lapis Lazuli", "Sodalite", "Turquoise", "Onyx", "Tiger Eye"].map((m) => (
                <button key={m} onClick={() => setMaterial(m)}
                  style={{ padding: "7px 16px", fontSize: "11px", letterSpacing: "0.06em", cursor: "pointer",
                    background: material === m ? C.gold : "transparent",
                    color: material === m ? "#fff" : C.text,
                    border: `1px solid ${material === m ? C.gold : C.border}` }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, margin: 0 }}>
                Size — <span style={{ color: C.text }}>{size}</span>
              </p>
              <button style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.08em", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                Size Guide
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["XS", "S/M", "M/L", "L/XL"].map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  style={{ width: "56px", height: "40px", fontSize: "11px", letterSpacing: "0.06em", cursor: "pointer",
                    background: size === s ? C.gold : "transparent",
                    color: size === s ? "#fff" : C.text,
                    border: `1px solid ${size === s ? C.gold : C.border}` }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            {/* Qty */}
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}` }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{ width: "40px", height: "52px", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: "18px" }}>
                −
              </button>
              <span style={{ width: "36px", textAlign: "center", fontSize: "14px" }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}
                style={{ width: "40px", height: "52px", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: "18px" }}>
                +
              </button>
            </div>
            {/* Add to cart */}
            <button onClick={handleAddToCart}
              style={{ flex: 1, padding: "0 32px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                backgroundColor: added ? "#2d6a2d" : C.gold, color: "#fff", border: "none", cursor: "pointer", transition: "background 0.3s" }}>
              {added ? "✓  ADDED TO BAG" : "ADD TO BAG"}
            </button>
          </div>

          {/* Wishlist */}
          <button style={{ width: "100%", padding: "14px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            backgroundColor: "transparent", color: C.text, border: `1px solid ${C.border}`, cursor: "pointer", marginBottom: "28px" }}>
            ♡  Save to Wishlist
          </button>

          {/* Trust signals */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: "✦", label: "Genuine Gemstones" },
              { icon: "◈", label: "100-Day Returns" },
              { icon: "⬡", label: "Handcrafted in Small Batches" },
              { icon: "✈", label: "Free Shipping Over $65" },
            ].map((t) => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", border: `1px solid ${C.border}` }}>
                <span style={{ color: C.gold, fontSize: "14px" }}>{t.icon}</span>
                <span style={{ fontSize: "10px", letterSpacing: "0.06em", color: C.muted }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex" }}>
            {(["details", "care", "sizing"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "18px 32px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase",
                  background: "none", border: "none", cursor: "pointer",
                  color: activeTab === tab ? C.text : C.muted,
                  borderBottom: activeTab === tab ? `2px solid ${C.gold}` : "2px solid transparent" }}>
                {tab === "details" ? "Product Details" : tab === "care" ? "Care Guide" : "Size Guide"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "36px 0", maxWidth: "680px", fontSize: "13px", color: C.muted, lineHeight: 2 }}>
          {activeTab === "details" && (
            <div>
              <p style={{ marginBottom: "16px" }}>Each Lapis Lazuli bracelet is individually handcrafted using genuine, natural-grade stones. Slight variations in colour, pattern, and texture are a mark of authenticity — no two pieces are identical.</p>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "8px" }}>
                {["Stone: Natural Lapis Lazuli (Afghanistan)", "Bead size: 8mm round", "Elastic stretch cord — no clasp", "Finished with 18k gold-plated spacer beads", "Packaged in a signature Luxe & Delicate gift box"].map((d) => (
                  <li key={d} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ color: C.gold, fontSize: "10px" }}>✦</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "care" && (
            <div>
              <p style={{ marginBottom: "16px" }}>To preserve the natural beauty of your stone bracelet, follow these simple care guidelines:</p>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "8px" }}>
                {["Avoid contact with water, perfumes & lotions", "Store flat in the provided gift box when not wearing", "Clean gently with a dry soft cloth", "Remove before swimming, showering, or exercising", "Keep away from direct sunlight for extended periods"].map((d) => (
                  <li key={d} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ color: C.gold, fontSize: "10px" }}>◈</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "sizing" && (
            <div>
              <p style={{ marginBottom: "20px" }}>Our bracelets are designed with a comfortable elastic stretch. Measure your wrist circumference and refer to the chart below:</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Size", "Wrist Circumference", "Inner Diameter"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: C.gold, fontWeight: 600, letterSpacing: "0.08em", fontSize: "10px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[["XS", "5.5\" – 6\"", "55 – 60 mm"], ["S/M", "6\" – 6.7\"", "60 – 68 mm"], ["M/L", "6.7\" – 7.5\"", "68 – 76 mm"], ["L/XL", "7.5\" – 8.5\"", "76 – 86 mm"]].map(([s, w, d]) => (
                    <tr key={s} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "12px 16px", color: C.text, fontWeight: 600 }}>{s}</td>
                      <td style={{ padding: "12px 16px" }}>{w}</td>
                      <td style={{ padding: "12px 16px" }}>{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── REVIEWS ─────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.card }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "72px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
            <div>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "10px" }}>Customer Reviews</p>
              <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, letterSpacing: "0.04em" }}>
                What Our Customers Say
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "3rem", fontFamily: C.serif, color: C.gold, fontWeight: 300, lineHeight: 1 }}>{avgRating}.0</div>
              <Stars rating={avgRating} />
              <p style={{ fontSize: "11px", color: C.muted, marginTop: "4px" }}>{REVIEWS.length} verified reviews</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {REVIEWS.map((r) => (
              <div key={r.id} style={{ padding: "28px", border: `1px solid ${C.border}`, backgroundColor: "#0a0a0a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <Stars rating={r.rating} />
                  <span style={{ fontSize: "10px", color: C.muted }}>{r.date}</span>
                </div>
                <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.8, marginBottom: "14px" }}>&ldquo;{r.text}&rdquo;</p>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: C.text }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "10px" }}>You May Also Love</p>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, letterSpacing: "0.04em" }}>Related Pieces</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
          {RELATED.map((r) => (
            <Link key={r.slug} href={`/shop/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ backgroundColor: C.card, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
                  <Image src={r.image} alt={r.title} fill sizes="300px" style={{ objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <p style={{ fontFamily: C.serif, fontSize: "1rem", marginBottom: "6px" }}>{r.title}</p>
                  <p style={{ color: C.gold, fontFamily: C.serif, fontSize: "1rem" }}>${r.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
