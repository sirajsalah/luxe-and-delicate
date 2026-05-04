"use client";
import Image from "next/image";
import Link from "next/link";

const BASE = "https://images.unsplash.com";

const COLLECTIONS = [
  {
    slug:        "turquoise",
    name:        "Turquoise Collection",
    tagline:     "Ocean-kissed. Earth-born.",
    description: "Ancient stones of protection and healing, each piece in vivid sky and seafoam tones.",
    count:       14,
    image:       `${BASE}/photo-1601888238880-267580743a6d?w=900&q=85`,
  },
  {
    slug:        "lapis",
    name:        "Lapis Collection",
    tagline:     "The colour of midnight royalty.",
    description: "Deep indigo lapis lazuli threaded with gold pyrite — worn by pharaohs, made for you.",
    count:       10,
    image:       `${BASE}/photo-1743127671067-62af70aa67c2?w=900&q=85`,
  },
  {
    slug:        "onyx",
    name:        "Onyx Collection",
    tagline:     "Dark, powerful, precise.",
    description: "Matte black onyx — grounding, protective and endlessly wearable. Day to night.",
    count:       12,
    image:       `${BASE}/photo-1534976618208-4833d5b57d08?w=900&q=85`,
  },
  {
    slug:        "jade",
    name:        "Jade Collection",
    tagline:     "Balance in every bead.",
    description: "Genuine nephrite jade, cubed and faceted for a modern edge on an ancient stone.",
    count:       9,
    image:       `${BASE}/photo-1639363885736-b6685fcbf1f5?w=900&q=85`,
  },
  {
    slug:        "amber",
    name:        "Amber Collection",
    tagline:     "Warm light, trapped in stone.",
    description: "Baltic amber beads that glow like honey. Light, warm, and completely unique.",
    count:       8,
    image:       `${BASE}/photo-1637808248242-57a6265593ed?w=900&q=85`,
  },
  {
    slug:        "silver",
    name:        "Silver Collection",
    tagline:     "Minimal. Refined. Eternal.",
    description: "Sterling silver and hematite stretch bracelets — clean lines for modern stacking.",
    count:       11,
    image:       `${BASE}/photo-1743127671060-df0140e9edf0?w=900&q=85`,
  },
  {
    slug:        "raw",
    name:        "Raw Stone Collection",
    tagline:     "Uncut. Unfiltered. Unapologetic.",
    description: "Rough-hewn gemstone chunks and diamond-cut facets for those who love texture.",
    count:       7,
    image:       `${BASE}/photo-1636520326725-ef3fe2bf0557?w=900&q=85`,
  },
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

export default function CollectionsPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
        <Image src={`${BASE}/photo-1639706188490-876064810182?w=2000&q=85`} alt="Collections" fill priority
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.35 }} sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(5,5,5,1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
            <div style={{ width: "56px", height: "1px", backgroundColor: C.gold, opacity: 0.6 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold }}>
              Luxe & Delicate
            </span>
            <div style={{ width: "56px", height: "1px", backgroundColor: C.gold, opacity: 0.6 }} />
          </div>
          <h1 style={{ fontFamily: C.serif, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 300, letterSpacing: "0.06em", marginBottom: "16px" }}>
            Our Collections
          </h1>
          <p style={{ fontSize: "13px", color: C.muted, letterSpacing: "0.06em", maxWidth: "480px" }}>
            Seven gemstone families. Hundreds of pieces. All handcrafted in small batches — find yours.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: "16px 48px", borderBottom: `1px solid ${C.border}`, fontSize: "11px", color: C.muted, letterSpacing: "0.06em", display: "flex", gap: "8px", alignItems: "center" }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
        <span style={{ color: C.gold }}>›</span>
        <span style={{ color: C.text }}>Collections</span>
      </div>

      {/* ── COLLECTIONS GRID ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "72px 40px" }}>

        {/* Featured (first collection — full width) */}
        <Link href={`/shop/${COLLECTIONS[0].slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "3px" }}>
          <div style={{ position: "relative", height: "440px", overflow: "hidden", backgroundColor: C.card, cursor: "pointer" }}
            onMouseEnter={(e) => { const img = e.currentTarget.querySelector("img") as HTMLImageElement | null; if (img) img.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { const img = e.currentTarget.querySelector("img") as HTMLImageElement | null; if (img) img.style.transform = "scale(1)"; }}>
            <Image src={COLLECTIONS[0].image} alt={COLLECTIONS[0].name} fill sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.55, transition: "transform 0.7s ease" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: "56px", left: "60px" }}>
              <span style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "14px" }}>
                Featured Collection
              </span>
              <h2 style={{ fontFamily: C.serif, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, letterSpacing: "0.04em", color: C.text, marginBottom: "10px" }}>
                {COLLECTIONS[0].name}
              </h2>
              <p style={{ fontFamily: C.serif, fontStyle: "italic", color: "#c8b896", fontSize: "1.1rem", marginBottom: "14px" }}>
                {COLLECTIONS[0].tagline}
              </p>
              <span style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.08em" }}>{COLLECTIONS[0].count} pieces</span>
            </div>
            <div style={{ position: "absolute", bottom: "56px", right: "60px", padding: "12px 32px", border: `1px solid ${C.gold}`,
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold }}>
              Explore →
            </div>
          </div>
        </Link>

        {/* Grid of remaining 6 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
          {COLLECTIONS.slice(1).map((col) => (
            <Link key={col.slug} href={`/shop/${col.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ position: "relative", height: "420px", overflow: "hidden", backgroundColor: C.card, cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.transform = "scale(1.06)";
                  const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement | null;
                  if (overlay) overlay.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.transform = "scale(1)";
                  const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement | null;
                  if (overlay) overlay.style.opacity = "0";
                }}>
                <Image src={col.image} alt={col.name} fill sizes="500px"
                  style={{ objectFit: "cover", opacity: 0.55, transition: "transform 0.7s ease" }} />
                {/* Gradient */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 60%)" }} />
                {/* Info */}
                <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", padding: "28px" }}>
                  <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>
                    {col.count} pieces
                  </p>
                  <h3 style={{ fontFamily: C.serif, fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.04em", color: C.text, marginBottom: "6px" }}>
                    {col.name}
                  </h3>
                  <p style={{ fontFamily: C.serif, fontStyle: "italic", fontSize: "0.95rem", color: "#c8b896", marginBottom: "12px" }}>
                    {col.tagline}
                  </p>
                  {/* Hover reveal */}
                  <div className="overlay" style={{ opacity: 0, transition: "opacity 0.3s ease" }}>
                    <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.7, marginBottom: "14px" }}>
                      {col.description}
                    </p>
                    <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                      color: C.gold, borderBottom: `1px solid ${C.gold}`, paddingBottom: "2px" }}>
                      Shop Collection →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CRAFT STRIP ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, backgroundColor: C.card, padding: "56px 40px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "18px" }}>
            Our Promise
          </p>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: C.text, marginBottom: "18px", letterSpacing: "0.04em" }}>
            "Every stone is hand-selected. Every bracelet is one of a kind."
          </h2>
          <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.9, marginBottom: "32px" }}>
            We source directly from ethical gemstone suppliers in Afghanistan, India, and Brazil.
            No mass manufacturing. No synthetic stones. Just genuine earth materials, shaped by hand.
          </p>
          <Link href="/story" style={{ display: "inline-block", padding: "13px 44px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", backgroundColor: "transparent", color: C.gold, textDecoration: "none", border: `1px solid ${C.gold}` }}>
            Read Our Story
          </Link>
        </div>
      </div>
    </div>
  );
}
