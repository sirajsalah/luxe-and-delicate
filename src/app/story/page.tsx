import Image from "next/image";
import Link from "next/link";

const BASE = "https://images.unsplash.com";

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

const VALUES = [
  { icon: "✦", title: "Ethically Sourced",     body: "Every gemstone is traced back to its origin. We work only with suppliers who share our commitment to fair wages, safe conditions, and minimal environmental impact." },
  { icon: "◈", title: "Handcrafted Always",     body: "No machines. Each bracelet passes through human hands from start to finish — strung, knotted, inspected and packaged by our small team." },
  { icon: "⬡", title: "Genuinely Unique",       body: "Natural stones carry their own character: colour variations, inclusions, veins. Your bracelet is the only one exactly like it in the world." },
  { icon: "✈", title: "Small Batch Only",        body: "We release collections in runs of 20–50 pieces. When they're gone, they're gone. This keeps quality high and each piece rare." },
];

export default function StoryPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, minHeight: "100vh", fontFamily: C.font }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "520px", overflow: "hidden" }}>
        <Image src={`${BASE}/photo-1637808248242-57a6265593ed?w=2000&q=85`} alt="Our Story" fill priority
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.4 }} sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3), rgba(5,5,5,0.95))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ width: "56px", height: "1px", backgroundColor: C.gold, opacity: 0.6 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold }}>Our Story</span>
            <div style={{ width: "56px", height: "1px", backgroundColor: C.gold, opacity: 0.6 }} />
          </div>
          <h1 style={{ fontFamily: C.serif, fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 300, letterSpacing: "0.06em", lineHeight: 1.1, marginBottom: "20px" }}>
            Born From the Earth.<br />
            <span style={{ fontStyle: "italic", color: "#c8b896" }}>Made By Hand.</span>
          </h1>
          <p style={{ fontSize: "14px", color: C.muted, letterSpacing: "0.06em", lineHeight: 1.9, maxWidth: "520px" }}>
            Luxe &amp; Delicate began as a single bracelet made on a kitchen table in 2021 — and a refusal to compromise on what jewellery should feel like.
          </p>
        </div>
      </div>

      {/* ── ORIGIN STORY ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          {/* Text */}
          <div>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>
              How It Started
            </p>
            <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "28px", lineHeight: 1.2 }}>
              A bracelet made with intention — then another, and another.
            </h2>
            <div style={{ fontSize: "14px", color: C.muted, lineHeight: 2, display: "flex", flexDirection: "column", gap: "20px" }}>
              <p>
                It started simply: a genuine turquoise stone I found at a market in Marrakech, a reel of natural cord, and hours spent learning how to string something that felt worthy of the stone. The result wasn&apos;t perfect — but it was mine, and I wore it every day.
              </p>
              <p>
                Friends noticed. Then strangers. Then one January morning I woke up to 47 messages. I&apos;d never intended to start a business — I just didn&apos;t want to stop making them.
              </p>
              <p>
                Today, every Luxe &amp; Delicate bracelet is still made by hand in a small studio. We source directly from miners and stone cutters in Afghanistan, India, and Morocco. We make 20–50 pieces of anything. And we still say no to anything that doesn&apos;t feel exactly right.
              </p>
            </div>
          </div>
          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
            <Image src={`${BASE}/photo-1639706188490-876064810182?w=800&q=85`} alt="Crafting bracelets" fill sizes="500px"
              style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "24px", right: "24px", padding: "16px 20px", backgroundColor: "rgba(0,0,0,0.85)",
              border: `1px solid ${C.border}`, textAlign: "center" }}>
              <p style={{ fontFamily: C.serif, fontSize: "1.8rem", color: C.gold, fontWeight: 300, lineHeight: 1 }}>2021</p>
              <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, marginTop: "4px" }}>Founded</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, backgroundColor: C.card }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "56px 40px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
          {[
            { num: "4,200+", label: "Bracelets Made" },
            { num: "7",      label: "Stone Families" },
            { num: "38",     label: "Countries Shipped" },
            { num: "100%",   label: "Handcrafted" },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", padding: "0 24px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <p style={{ fontFamily: C.serif, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.gold, fontWeight: 300, marginBottom: "8px" }}>{s.num}</p>
              <p style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
            What We Stand For
          </p>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, letterSpacing: "0.04em" }}>
            Our Principles
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
          {VALUES.map((v) => (
            <div key={v.title} style={{ backgroundColor: C.card, padding: "44px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "20px", color: C.gold, marginBottom: "18px" }}>{v.icon}</div>
              <h3 style={{ fontFamily: C.serif, fontSize: "1.4rem", fontWeight: 400, marginBottom: "14px", letterSpacing: "0.02em" }}>{v.title}</h3>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.9 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CRAFT PROCESS ────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: C.card, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
              How Each Piece Is Made
            </p>
            <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, letterSpacing: "0.04em" }}>
              The Making of a Bracelet
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", position: "relative" }}>
            {/* Connecting line */}
            <div style={{ position: "absolute", top: "28px", left: "12.5%", right: "12.5%", height: "1px", backgroundColor: C.gold, opacity: 0.3 }} />
            {[
              { step: "01", title: "Stone Selection",    body: "Every batch of raw stones is inspected by hand. We reject anything with structural flaws or colour inconsistencies." },
              { step: "02", title: "Sorting & Grading",  body: "Stones are sorted by tone, size, and finish. Matching beads for a single bracelet can take 30 minutes." },
              { step: "03", title: "Stringing",          body: "Each bracelet is hand-strung on high-strength elastic cord, with gold spacer beads added by hand." },
              { step: "04", title: "Final Inspection",   body: "Every piece is checked for even spacing, correct sizing, and secure knotting before packaging." },
            ].map((s) => (
              <div key={s.step} style={{ padding: "0 28px", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: C.serif, fontSize: "1rem", color: C.gold, margin: "0 auto 24px", backgroundColor: C.card }}>
                  {s.step}
                </div>
                <h3 style={{ fontFamily: C.serif, fontSize: "1.1rem", fontWeight: 400, marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.8 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ width: "56px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>
            Ready to Find Yours?
          </span>
          <div style={{ width: "56px", height: "1px", backgroundColor: C.gold, opacity: 0.5 }} />
        </div>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", color: C.text, marginBottom: "32px" }}>
          Every stone has a story. This one is yours.
        </h2>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/shop" style={{ padding: "14px 48px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", backgroundColor: C.gold, color: "#fff", textDecoration: "none" }}>
            Shop Now
          </Link>
          <Link href="/collections" style={{ padding: "14px 48px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", backgroundColor: "transparent", color: C.text, textDecoration: "none",
            border: `1px solid ${C.border}` }}>
            See Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
