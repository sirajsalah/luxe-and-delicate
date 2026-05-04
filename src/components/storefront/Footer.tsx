"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#111", color: "#fff", marginTop: "80px" }}>

      {/* Newsletter */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "56px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: 400, marginBottom: "12px", letterSpacing: "0.02em" }}>
            Join the Luxe &amp; Delicate World
          </h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "28px", lineHeight: 1.6 }}>
            New arrivals, exclusive offers, and styling inspiration — straight to your inbox.
          </p>
          <form style={{ display: "flex", gap: 0, maxWidth: "420px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRight: "none", padding: "12px 16px", fontSize: "13px", color: "#fff", outline: "none", fontFamily: "system-ui, sans-serif" }}
            />
            <button type="submit" style={{ backgroundColor: "#b8860b", color: "#fff", border: "none", padding: "12px 24px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px" }}>

        <div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "18px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px", fontWeight: 400 }}>
            Luxe &amp; Delicate
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "20px" }}>
            Handcrafted bracelets for the woman who finds beauty in everyday details.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { label: "Instagram", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>, href: "https://instagram.com" },
              { label: "TikTok", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z"/></svg>, href: "https://tiktok.com" },
              { label: "Pinterest", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>, href: "https://pinterest.com" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Shop", links: [{ label: "New In", href: "/shop/new" }, { label: "Beaded Bracelets", href: "/shop/beaded" }, { label: "Charm Bracelets", href: "/shop/charms" }, { label: "Leather Bracelets", href: "/shop/leather" }, { label: "Custom", href: "/shop/custom" }, { label: "Gift Sets", href: "/shop/gift-sets" }, { label: "Sale", href: "/shop/sale" }] },
          { title: "Help", links: [{ label: "Sizing Guide", href: "/sizing" }, { label: "Shipping Info", href: "/shipping" }, { label: "Returns", href: "/returns" }, { label: "Care Guide", href: "/care" }, { label: "FAQ", href: "/faq" }, { label: "Contact Us", href: "/contact" }] },
          { title: "About", links: [{ label: "Our Story", href: "/story" }, { label: "Lookbook", href: "/lookbook" }, { label: "Blog", href: "/blog" }, { label: "Sustainability", href: "/sustainability" }] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", maxWidth: "1280px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} Luxe &amp; Delicate. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((link) => (
            <Link key={link.href} href={link.href} style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>VISA · Mastercard · PayPal · Stripe</p>
      </div>
    </footer>
  );
}
