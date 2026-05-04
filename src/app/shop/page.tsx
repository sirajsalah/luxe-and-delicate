"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BASE = "https://images.unsplash.com";
const PRODUCTS = [
  { id: "1", slug: "turquoise-stone-bead",   title: "Turquoise Stone Bead",      price: 68,  compareAt: null, badge: "TOP RATED",  material: "Turquoise",  style: "Beaded",  image: `${BASE}/photo-1601888238880-267580743a6d?w=700&q=85` },
  { id: "2", slug: "sodalite-heishi-bead",   title: "Sodalite Heishi Bead",      price: 58,  compareAt: null, badge: "LIMITED",    material: "Sodalite",   style: "Beaded",  image: `${BASE}/photo-1743127671067-62af70aa67c2?w=700&q=85` },
  { id: "3", slug: "hematite-bead-dark",     title: "Hematite Dark Stone",        price: 72,  compareAt: null, badge: "RESTOCKED",  material: "Hematite",   style: "Beaded",  image: `${BASE}/photo-1534976618208-4833d5b57d08?w=700&q=85` },
  { id: "4", slug: "jade-cube-bracelet",     title: "Jade Cube Stone",            price: 78,  compareAt: null, badge: null,         material: "Jade",       style: "Chunky",  image: `${BASE}/photo-1639363885736-b6685fcbf1f5?w=700&q=85` },
  { id: "5", slug: "amber-stone-bead",       title: "Amber Stone Bead",           price: 82,  compareAt: null, badge: "NEW",        material: "Amber",      style: "Beaded",  image: `${BASE}/photo-1637808248242-57a6265593ed?w=700&q=85` },
  { id: "6", slug: "silver-bead-bracelet",   title: "Silver Bead Stretch",        price: 54,  compareAt: 68,   badge: "SALE",       material: "Silver",     style: "Stretch", image: `${BASE}/photo-1743127671060-df0140e9edf0?w=700&q=85` },
  { id: "7", slug: "raw-diamond-bead",       title: "Raw Diamond Stone",          price: 96,  compareAt: null, badge: "TOP RATED",  material: "Diamond",    style: "Chunky",  image: `${BASE}/photo-1636520326725-ef3fe2bf0557?w=700&q=85` },
  { id: "8", slug: "keystone-bead-set",      title: "KeyStone Stack Set",         price: 144, compareAt: null, badge: "LIMITED",    material: "Mixed",      style: "Stack",   image: `${BASE}/photo-1639706188490-876064810182?w=700&q=85` },
  { id: "9", slug: "lapis-lazuli-bead",      title: "Lapis Lazuli Bead",          price: 88,  compareAt: null, badge: "NEW",        material: "Lapis",      style: "Beaded",  image: `${BASE}/photo-1633810543462-77c4a3b13f07?w=700&q=85` },
  { id: "10", slug: "onyx-matte-bead",       title: "Onyx Matte Bead",            price: 66,  compareAt: null, badge: null,         material: "Onyx",       style: "Beaded",  image: `${BASE}/photo-1601888238880-267580743a6d?w=700&q=85` },
  { id: "11", slug: "tiger-eye-stretch",     title: "Tiger Eye Stretch",          price: 74,  compareAt: 92,   badge: "SALE",       material: "Tiger Eye",  style: "Stretch", image: `${BASE}/photo-1743127671067-62af70aa67c2?w=700&q=85` },
  { id: "12", slug: "rose-quartz-bead",      title: "Rose Quartz Bead",           price: 79,  compareAt: null, badge: null,         material: "Quartz",     style: "Beaded",  image: `${BASE}/photo-1639363885736-b6685fcbf1f5?w=700&q=85` },
];

const MATERIALS = ["All", "Turquoise", "Sodalite", "Lapis", "Onyx", "Jade", "Amber", "Silver", "Tiger Eye", "Quartz", "Mixed"];
const STYLES    = ["All", "Beaded", "Stretch", "Chunky", "Stack"];
const SORTS     = ["Featured", "Price: Low → High", "Price: High → Low", "Newest"];

const C = {
  bg:      "#050505",
  surface: "#0f0f0f",
  card:    "#111111",
  border:  "rgba(184,134,11,0.18)",
  gold:    "#b8860b",
  text:    "#e8e0d8",
  muted:   "rgba(232,224,216,0.45)",
  font:    "'DM Sans', system-ui, sans-serif",
  serif:   "Georgia, 'Cormorant Garamond', serif",
};

export default function ShopPage() {
  const [material, setMaterial]   = useState("All");
  const [style, setStyle]         = useState("All");
  const [maxPrice, setMaxPrice]   = useState(200);
  const [sort, setSort]           = useState("Featured");
  const [wishlist, setWishlist]   = useState<string[]>([]);

  const filtered = PRODUCTS
    .filter((p) => material === "All" || p.material === material)
    .filter((p) => style    === "All" || p.style    === style)
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (sort === "Price: Low → High")  return a.price - b.price;
      if (sort === "Price: High → Low")  return b.price - a.price;
      return 0;
    });

  const toggleWish = (id: string) =>
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "64px 40px 40px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "20px" }}>
          <div style={{ width: "48px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold }}>
            The Collection
          </span>
          <div style={{ width: "48px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
        </div>
        <h1 style={{ fontFamily: C.serif, fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "0.06em", marginBottom: "12px" }}>
          Shop All Bracelets
        </h1>
        <p style={{ fontSize: "13px", color: C.muted, letterSpacing: "0.04em" }}>
          {filtered.length} pieces — genuine gemstones, handcrafted in small batches
        </p>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "20px", fontSize: "11px", color: C.muted, letterSpacing: "0.06em" }}>
          <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
          <span style={{ color: C.gold }}>›</span>
          <span style={{ color: C.text }}>Shop</span>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "0", padding: "0" }}>

        {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
        <aside style={{ width: "240px", flexShrink: 0, borderRight: `1px solid ${C.border}`, padding: "40px 28px", position: "sticky", top: "80px", height: "fit-content" }}>

          {/* Sort */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "14px" }}>Sort By</p>
            {SORTS.map((s) => (
              <button key={s} onClick={() => setSort(s)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 0", background: "none", border: "none", cursor: "pointer",
                  fontSize: "12px", letterSpacing: "0.04em", color: sort === s ? C.text : C.muted,
                  borderLeft: sort === s ? `2px solid ${C.gold}` : "2px solid transparent", paddingLeft: "10px" }}>
                {s}
              </button>
            ))}
          </div>

          {/* Price */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "14px" }}>
              Max Price — <span style={{ color: C.text }}>${maxPrice}</span>
            </p>
            <input type="range" min={40} max={200} step={10} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: C.gold }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: C.muted, marginTop: "6px" }}>
              <span>$40</span><span>$200</span>
            </div>
          </div>

          {/* Material */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "14px" }}>Material</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {MATERIALS.map((m) => (
                <button key={m} onClick={() => setMaterial(m)}
                  style={{ padding: "4px 10px", fontSize: "10px", letterSpacing: "0.06em", cursor: "pointer",
                    background: material === m ? C.gold : "transparent",
                    color: material === m ? "#fff" : C.muted,
                    border: `1px solid ${material === m ? C.gold : C.border}` }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: "14px" }}>Style</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {STYLES.map((s) => (
                <button key={s} onClick={() => setStyle(s)}
                  style={{ padding: "4px 10px", fontSize: "10px", letterSpacing: "0.06em", cursor: "pointer",
                    background: style === s ? C.gold : "transparent",
                    color: style === s ? "#fff" : C.muted,
                    border: `1px solid ${style === s ? C.gold : C.border}` }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button onClick={() => { setMaterial("All"); setStyle("All"); setMaxPrice(200); setSort("Featured"); }}
            style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted,
              background: "none", border: "none", cursor: "pointer", padding: "0", textDecoration: "underline" }}>
            Reset Filters
          </button>
        </aside>

        {/* ── PRODUCT GRID ────────────────────────────────────────────────── */}
        <main style={{ flex: 1, padding: "40px 40px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: C.muted }}>
              <p style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, marginBottom: "12px" }}>No results</p>
              <p style={{ fontSize: "13px" }}>Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "2px" }}>
              {filtered.map((p) => (
                <div key={p.id}
                  style={{ backgroundColor: C.card, position: "relative", overflow: "hidden", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.card)}>

                  {/* Badge */}
                  {p.badge && (
                    <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 2,
                      padding: "3px 10px", fontSize: "8px", fontWeight: 700, letterSpacing: "0.2em",
                      border: `1px solid ${C.gold}`, color: C.gold, backgroundColor: "rgba(0,0,0,0.6)" }}>
                      {p.badge}
                    </div>
                  )}

                  {/* Wishlist */}
                  <button onClick={() => toggleWish(p.id)}
                    style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2, background: "none", border: "none", cursor: "pointer",
                      fontSize: "18px", color: wishlist.includes(p.id) ? C.gold : "rgba(255,255,255,0.3)", lineHeight: 1 }}>
                    {wishlist.includes(p.id) ? "♥" : "♡"}
                  </button>

                  {/* Image */}
                  <Link href={`/shop/${p.slug}`}>
                    <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
                      <Image src={p.image} alt={p.title} fill sizes="300px"
                        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ padding: "16px 18px 20px" }}>
                    <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, marginBottom: "6px" }}>
                      {p.material}
                    </p>
                    <Link href={`/shop/${p.slug}`} style={{ textDecoration: "none" }}>
                      <p style={{ fontFamily: C.serif, fontSize: "1.05rem", fontWeight: 400, color: C.text, marginBottom: "10px", letterSpacing: "0.02em" }}>
                        {p.title}
                      </p>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span style={{ fontFamily: C.serif, fontSize: "1.1rem", color: C.gold, fontWeight: 500 }}>${p.price}</span>
                      {p.compareAt && (
                        <span style={{ fontSize: "12px", color: C.muted, textDecoration: "line-through" }}>${p.compareAt}</span>
                      )}
                    </div>
                    <Link href={`/shop/${p.slug}`}
                      style={{ display: "block", textAlign: "center", padding: "10px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em",
                        textTransform: "uppercase", backgroundColor: "transparent", color: C.gold, textDecoration: "none",
                        border: `1px solid ${C.gold}`, transition: "all 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.gold; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = C.gold; }}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
