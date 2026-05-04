"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// TODO — Replace every placeholder URL with your own product photos.
//  Upload them to /public/images/ in the Next.js project, or to Supabase Storage
//  (covered in Session 4), then swap the strings below.
//  Format: "/images/your-photo.jpg"  OR  "https://your-supabase-url.co/..."
// ─────────────────────────────────────────────────────────────────────────────
const BASE = "https://images.unsplash.com";

// All confirmed bracelet photos from Unsplash (free, no attribution required)
const IMG = {
  // Hero — close up of person wearing a bracelet on wrist
  hero:      `${BASE}/photo-1633810543462-77c4a3b13f07?w=2000&q=85`,

  // Collection tiles — all actual bracelet images
  col1:      `${BASE}/photo-1639363885736-b6685fcbf1f5?w=800&q=80`,  // bracelet on table close-up
  col2:      `${BASE}/photo-1743127671067-62af70aa67c2?w=800&q=80`,  // purple beaded bracelet
  col3:      `${BASE}/photo-1637808248242-57a6265593ed?w=800&q=80`,  // group of bracelets on shell
  col4:      `${BASE}/photo-1601888238880-267580743a6d?w=800&q=80`,  // silver & black beaded bracelet
  col5:      `${BASE}/photo-1636520326725-ef3fe2bf0557?w=800&q=80`,  // bracelets on shell group
  col6:      `${BASE}/photo-1639706188490-876064810182?w=800&q=80`,  // beaded bracelet on table
  col7:      `${BASE}/photo-1534976618208-4833d5b57d08?w=800&q=80`,  // person wearing beaded black bracelet

  // Product images — all actual bracelet photos
  p1: `${BASE}/photo-1601888238880-267580743a6d?w=700&q=85`,  // silver & black beaded bracelet
  p2: `${BASE}/photo-1743127671067-62af70aa67c2?w=700&q=85`,  // purple beaded bracelet displayed
  p3: `${BASE}/photo-1534976618208-4833d5b57d08?w=700&q=85`,  // person wearing beaded black bracelet
  p4: `${BASE}/photo-1639363885736-b6685fcbf1f5?w=700&q=85`,  // bracelet close-up on table
  p5: `${BASE}/photo-1637808248242-57a6265593ed?w=700&q=85`,  // bracelets on shell
  p6: `${BASE}/photo-1743127671060-df0140e9edf0?w=700&q=85`,  // purple bead bracelet with charm
  p7: `${BASE}/photo-1636520326725-ef3fe2bf0557?w=700&q=85`,  // multiple bracelets on shell
  p8: `${BASE}/photo-1639706188490-876064810182?w=700&q=85`,  // beaded bracelet close-up
};

const collections = [
  { label: "Turquoise\nCollection",    href: "/shop/turquoise",    image: IMG.col1 },
  { label: "Jade\nCollection",         href: "/shop/jade",         image: IMG.col2 },
  { label: "Untamed\nCollection",      href: "/shop/untamed",      image: IMG.col3 },
  { label: "Onyx\nCollection",         href: "/shop/onyx",         image: IMG.col4 },
  { label: "Raw Stone\nCollection",    href: "/shop/raw",          image: IMG.col5 },
  { label: "KeyStone\nCollection",     href: "/shop/keystone",     image: IMG.col6 },
  { label: "Silver\nCollection",       href: "/shop/silver",       image: IMG.col7 },
];

const topProducts = [
  { id: "1", slug: "turquoise-stone-bead", title: "Turquoise Stone Bead Bracelet",   price: 68,  badge: "TOP RATED",  image: IMG.p1 },
  { id: "2", slug: "sodalite-heishi-bead", title: "Sodalite Heishi Bead Bracelet",   price: 58,  badge: "LIMITED",    image: IMG.p2 },
  { id: "3", slug: "hematite-bead-dark",   title: "Hematite Dark Stone Bracelet",    price: 72,  badge: "RESTOCKED",  image: IMG.p3 },
  { id: "4", slug: "jade-cube-bracelet",   title: "Jade Cube Stone Bracelet",        price: 78,  badge: null,         image: IMG.p4 },
];

const moreProducts = [
  { id: "5", slug: "amber-stone-bead",     title: "Amber Stone Bead",     price: 82,  compareAt: null, badge: "NEW",         image: IMG.p5 },
  { id: "6", slug: "silver-bead-bracelet", title: "Silver Bead Stretch",  price: 54,  compareAt: 68,   badge: "SALE",        image: IMG.p6 },
  { id: "7", slug: "raw-diamond-bead",     title: "Raw Diamond Stone",    price: 96,  compareAt: null, badge: "TOP RATED",   image: IMG.p1 },
  { id: "8", slug: "keystone-bead-set",    title: "KeyStone Stack Set",   price: 144, compareAt: null, badge: "LIMITED",     image: IMG.p2 },
];

// Bright, vibrant bead bracelet Unsplash photos
const HERO_SLIDES = [
  { src: `${BASE}/photo-1534976618208-4833d5b57d08?w=2000&q=95`, pos: "center 50%" }, // beaded bracelet on hand (was #5)
  { src: `${BASE}/photo-1743127671067-62af70aa67c2?w=2000&q=95`, pos: "center 50%" }, // vivid purple beaded bracelet
  { src: `${BASE}/photo-1637808248242-57a6265593ed?w=2000&q=95`, pos: "center 50%" }, // colorful group of bracelets (new)
  { src: `${BASE}/photo-1601888238880-267580743a6d?w=2000&q=95`, pos: "center 50%" }, // silver & black beaded bracelet
  { src: `${BASE}/photo-1743127671060-df0140e9edf0?w=2000&q=95`, pos: "center 50%" }, // purple bead bracelet with charm (new)
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: "#050505", color: "#e8e0d8", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>

      {/* ── HERO — crossfade slideshow ────────────────────────────────────── */}
      <section style={{ position: "relative", height: "680px", overflow: "hidden", backgroundColor: "#0a0a0a" }}>

        {/* Slides — all stacked, only active one visible */}
        {HERO_SLIDES.map((s, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: i === slide ? 1 : 0,
            transition: "opacity 1.8s ease-in-out",
            zIndex: i === slide ? 1 : 0,
          }}>
            <Image
              src={s.src}
              alt="Bracelet on wrist"
              fill
              priority={i === 0}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: s.pos,
                opacity: 1,
                filter: "brightness(1.08) saturate(1.15)",
              }}
            />
          </div>
        ))}

        {/* Minimal overlay — only darken the bottom so text is readable, top stays vivid */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.68) 80%, rgba(5,5,5,0.92) 100%)" }} />

        {/* Content */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          {/* Decorative line */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <div style={{ width: "60px", height: "1px", backgroundColor: "rgba(184,134,11,0.7)" }} />
            <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8860b" }}>LUXE &amp; DELICATE</span>
            <div style={{ width: "60px", height: "1px", backgroundColor: "rgba(184,134,11,0.7)" }} />
          </div>

          <h1 style={{ fontFamily: "Georgia, 'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 300, color: "#fff", letterSpacing: "0.08em", lineHeight: 1.0, marginBottom: "24px", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
            STONE BEAD<br />
            <span style={{ fontStyle: "italic", color: "#e8d5a3" }}>Bracelets</span>
          </h1>

          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em", lineHeight: 1.9, marginBottom: "44px", maxWidth: "420px", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
            Handcrafted from genuine gemstones — lapis lazuli, turquoise, onyx, jade &amp; more.
            Each bracelet is one of a kind.
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/shop" style={{ padding: "14px 44px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", backgroundColor: "#b8860b", color: "#fff", textDecoration: "none" }}>
              SHOP ALL
            </Link>
            <Link href="/collections" style={{ padding: "14px 44px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", backgroundColor: "transparent", color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>
              COLLECTIONS
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", gap: "8px", alignItems: "center" }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              style={{ width: i === slide ? "24px" : "6px", height: "6px", borderRadius: "3px",
                backgroundColor: i === slide ? "#b8860b" : "rgba(255,255,255,0.35)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.4s ease" }} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "56px", right: "40px", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "36px", backgroundColor: "rgba(184,134,11,0.5)" }} />
          <span style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>SCROLL</span>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#b8860b", padding: "11px 0" }}>
        <div style={{ display: "flex", gap: "60px", justifyContent: "center", flexWrap: "wrap", overflow: "hidden" }}>
          {["✦ Free Shipping Over $65", "✦ Genuine Gemstones", "✦ 100-Day Returns", "✦ Handcrafted in Small Batches", "✦ Each Piece is Unique"].map((t) => (
            <span key={t} style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#fff", whiteSpace: "nowrap" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── LATEST COLLECTIONS ───────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 80px" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 32px" }}>

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8860b", marginBottom: "12px" }}>
              — BROWSE —
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "0.1em" }}>
              Latest Collections
            </h2>
          </div>

          {/* Horizontal scroll of collection cards */}
          <div style={{ display: "flex", gap: "14px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
            {collections.map((col) => (
              <Link key={col.label} href={col.href} style={{ textDecoration: "none", display: "block", flexShrink: 0, width: "190px" }}>
                <div style={{ position: "relative", height: "240px", overflow: "hidden", backgroundColor: "#111", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)" }} className="group">
                  <Image src={col.image} alt={col.label} fill
                    style={{ objectFit: "cover", opacity: 0.55 }}
                    className="transition-all duration-700 group-hover:opacity-75 group-hover:scale-105"
                    sizes="190px" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 14px" }}>
                    <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "13px", fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.4, whiteSpace: "pre-line", margin: 0 }}>
                      {col.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: "1px", backgroundColor: "#1a1a1a" }} />
      </div>

      {/* ── TOP PRODUCTS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 32px" }}>

          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8860b", marginBottom: "12px" }}>
              — BESTSELLERS —
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "0.1em" }}>
              Top Products
            </h2>
          </div>

          {/* 4-col product row — large cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px" }}>
            {topProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }} className="group">
                <div>
                  {/* Badge — outlined box style matching screenshot */}
                  <div style={{ height: "28px", display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    {p.badge && (
                      <span style={{ display: "inline-block", border: "1px solid rgba(184,134,11,0.7)", color: "#b8860b", fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "3px 9px" }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  {/* Image tile — tall, dark background */}
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#0d0d0d", marginBottom: "14px" }}>
                    <Image src={p.image} alt={p.title} fill
                      style={{ objectFit: "cover", opacity: 0.7 }}
                      className="transition-all duration-700 group-hover:opacity-90 group-hover:scale-103"
                      sizes="(max-width: 1024px) 50vw, 25vw" />
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
                    {/* Quick add overlay */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(184,134,11,0.92)", color: "#fff", textAlign: "center", padding: "13px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", transform: "translateY(100%)", transition: "transform 280ms" }} className="group-hover:translate-y-0">
                      + ADD TO CART
                    </div>
                  </div>
                  <h3 style={{ fontSize: "12px", fontWeight: 400, color: "#c8c0b4", letterSpacing: "0.04em", marginBottom: "6px", lineHeight: 1.4 }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#e8e0d8" }}>${p.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Second row of 4 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {moreProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }} className="group">
                <div>
                  <div style={{ height: "28px", display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    {p.badge && (
                      <span style={{ display: "inline-block", border: "1px solid rgba(184,134,11,0.7)", color: "#b8860b", fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "3px 9px" }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#0d0d0d", marginBottom: "14px" }}>
                    <Image src={p.image} alt={p.title} fill
                      style={{ objectFit: "cover", opacity: 0.7 }}
                      className="transition-all duration-700 group-hover:opacity-90 group-hover:scale-103"
                      sizes="(max-width: 1024px) 50vw, 25vw" />
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(184,134,11,0.92)", color: "#fff", textAlign: "center", padding: "13px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", transform: "translateY(100%)", transition: "transform 280ms" }} className="group-hover:translate-y-0">
                      + ADD TO CART
                    </div>
                  </div>
                  <h3 style={{ fontSize: "12px", fontWeight: 400, color: "#c8c0b4", letterSpacing: "0.04em", marginBottom: "6px", lineHeight: 1.4 }}>{p.title}</h3>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#e8e0d8", margin: 0 }}>${p.price}</p>
                    {p.compareAt && <span style={{ fontSize: "11px", color: "#444", textDecoration: "line-through" }}>${p.compareAt}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All button */}
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <Link href="/shop" style={{ display: "inline-block", padding: "14px 60px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", border: "1px solid rgba(184,134,11,0.5)", color: "#b8860b", textDecoration: "none" }}>
              VIEW ALL BRACELETS
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ──────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #141414", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "1px", height: "52px", backgroundColor: "#b8860b", margin: "0 auto 36px" }} />
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300, color: "#fff", letterSpacing: "0.08em", lineHeight: 1.35, marginBottom: "22px" }}>
            Every Stone Tells<br />a Story
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 2.0, marginBottom: "40px" }}>
            We source every gemstone with intention. Lapis lazuli from Afghanistan, turquoise from the American Southwest, jade from Myanmar. Each bracelet is individually handcrafted — no two are ever exactly alike.
          </p>
          <Link href="/story" style={{ display: "inline-block", color: "#b8860b", fontSize: "9px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(184,134,11,0.5)", paddingBottom: "3px" }}>
            READ OUR STORY →
          </Link>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #141414" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { icon: "✦", title: "Handcrafted",     sub: "Each piece made by hand" },
            { icon: "◈", title: "Genuine Stones",  sub: "100% natural gemstones" },
            { icon: "↩", title: "100-Day Returns", sub: "Hassle-free guarantee" },
            { icon: "✉", title: "Free Shipping",   sub: "On orders over $65" },
          ].map((b, i) => (
            <div key={b.title} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid #141414" : "none" }}>
              <div style={{ fontSize: "15px", color: "#b8860b", marginBottom: "9px" }}>{b.icon}</div>
              <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#e8e0d8", marginBottom: "5px" }}>{b.title}</div>
              <div style={{ fontSize: "11px", color: "#444" }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
