"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";

const navLinks = [
  { label: "New In",       href: "/shop/new" },
  { label: "Bracelets",    href: "/shop" },
  { label: "Collections",  href: "/collections" },
  { label: "Custom",       href: "/shop/custom" },
  { label: "Gift Sets",    href: "/shop/gift-sets" },
  { label: "Our Story",    href: "/story" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        ✦ Free shipping on orders over $65 &nbsp;·&nbsp; 100-day returns &nbsp;·&nbsp; Handcrafted with love ✦
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-400 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-brand-sm"
            : "bg-ivory"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-charcoal hover:text-rose-gold transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop Nav Links — Left */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo — Center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-display text-xl font-light tracking-[0.2em] text-soft-black hover:text-rose-gold transition-colors duration-300 uppercase"
            >
              Luxe & Delicate
            </Link>

            {/* Desktop Nav Links — Right */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-charcoal hover:text-rose-gold transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <Link
                href="/account/wishlist"
                className="hidden sm:block text-charcoal hover:text-rose-gold transition-colors duration-200"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
              </Link>

              <Link
                href="/account"
                className="hidden sm:block text-charcoal hover:text-rose-gold transition-colors duration-200"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>

              <Link
                href="/cart"
                className="relative text-charcoal hover:text-rose-gold transition-colors duration-200"
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {/* Cart count badge */}
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-gold text-white text-[9px] font-medium">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-warm-200 bg-white py-4 animate-fade-in">
            <div className="mx-auto max-w-2xl px-4">
              <div className="flex items-center gap-3">
                <Search size={16} className="text-warm-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search bracelets, collections, styles..."
                  className="w-full bg-transparent text-sm text-charcoal placeholder-warm-400 focus:outline-none font-body"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-warm-400 hover:text-charcoal transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-brand-lg animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-warm-200">
              <span className="font-display text-lg tracking-widest text-soft-black uppercase">
                Menu
              </span>
              <button onClick={() => setMenuOpen(false)}>
                <X size={20} className="text-charcoal" />
              </button>
            </div>
            <nav className="flex-1 px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm tracking-widest uppercase font-medium text-charcoal hover:text-rose-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-warm-200 space-y-4">
              <Link href="/account" className="flex items-center gap-3 text-sm text-charcoal hover:text-rose-gold transition-colors">
                <User size={16} /> My Account
              </Link>
              <Link href="/account/wishlist" className="flex items-center gap-3 text-sm text-charcoal hover:text-rose-gold transition-colors">
                <Heart size={16} /> Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
