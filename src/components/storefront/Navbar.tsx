"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div style={{ backgroundColor: "#1a1a1a", color: "#fff", textAlign: "center", padding: "10px 16px", fontSize: "12px", letterSpacing: "0.08em" }}>
        🎁 Free Gift Wrapping &amp; Message on Every Order &nbsp;·&nbsp; Free Shipping Over $65
      </div>

      {/* ── Main Nav ── */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a", fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Luxe &amp; Delicate
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px", listStyle: "none" }} className="hidden lg:flex">
            {[
              { label: "NEW IN", href: "/shop/new" },
              { label: "BRACELETS", href: "/shop", hasDropdown: true },
              { label: "COLLECTIONS", href: "/collections" },
              { label: "CUSTOMIZE", href: "/shop/custom" },
              { label: "GIFTS", href: "/shop/gift-sets" },
              { label: "OUR STORY", href: "/story" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ textDecoration: "none", color: "#1a1a1a", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8860b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#1a1a1a", padding: "4px" }}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/account/wishlist" style={{ color: "#1a1a1a", display: "flex" }} className="hidden sm:flex">
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/account" style={{ color: "#1a1a1a", display: "flex" }} className="hidden sm:flex">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" style={{ color: "#1a1a1a", display: "flex", position: "relative" }}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span style={{ position: "absolute", top: "-6px", right: "-6px", backgroundColor: "#b8860b", color: "#fff", borderRadius: "50%", width: "16px", height: "16px", fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>0</span>
            </Link>
            <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1a1a1a" }} className="lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} onClick={() => setMenuOpen(false)} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "280px", backgroundColor: "#fff", padding: "24px", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Menu</span>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            {[
              { label: "New In", href: "/shop/new" },
              { label: "All Bracelets", href: "/shop" },
              { label: "Beaded", href: "/shop/beaded" },
              { label: "Charm", href: "/shop/charms" },
              { label: "Leather", href: "/shop/leather" },
              { label: "Custom", href: "/shop/custom" },
              { label: "Gift Sets", href: "/shop/gift-sets" },
              { label: "Our Story", href: "/story" },
            ].map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "12px 0", fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
