import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "New In",       href: "/shop/new" },
    { label: "Beaded",       href: "/shop/beaded" },
    { label: "Charm",        href: "/shop/charms" },
    { label: "Leather",      href: "/shop/leather" },
    { label: "Custom",       href: "/shop/custom" },
    { label: "Gift Sets",    href: "/shop/gift-sets" },
    { label: "Sale",         href: "/shop/sale" },
  ],
  Help: [
    { label: "Sizing Guide",  href: "/sizing" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns",       href: "/returns" },
    { label: "Care Guide",    href: "/care" },
    { label: "FAQ",           href: "/faq" },
    { label: "Contact Us",    href: "/contact" },
  ],
  About: [
    { label: "Our Story",     href: "/story" },
    { label: "Lookbook",      href: "/lookbook" },
    { label: "Blog",          href: "/blog" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Wholesale",     href: "/wholesale" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-soft-black text-white/80 mt-24">

      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-display-sm text-white font-light mb-2">
                Join the world of Luxe & Delicate
              </h3>
              <p className="text-sm text-white/50 font-body">
                New arrivals, exclusive offers, and styling inspiration.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/20 px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors font-body"
              />
              <button
                type="submit"
                className="bg-rose-gold text-white text-xs tracking-widest uppercase px-6 py-3 font-medium hover:bg-rose-gold-dark transition-colors font-body flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div>
            <h2 className="font-display text-xl tracking-[0.2em] text-white uppercase font-light mb-6">
              Luxe & Delicate
            </h2>
            <p className="text-sm text-white/40 font-body leading-relaxed mb-6">
              Handcrafted bracelets for the woman who finds beauty in the everyday details.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              {/* TikTok icon */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z"/>
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs tracking-widest uppercase font-medium text-white/60 mb-5 font-body">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-body">
            © {new Date().getFullYear()} Luxe & Delicate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors font-body">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors font-body">
              Terms of Service
            </Link>
          </div>
          {/* Payment icons */}
          <div className="flex items-center gap-2 text-white/20 text-xs font-body tracking-wide">
            VISA · Mastercard · PayPal · Stripe
          </div>
        </div>
      </div>
    </footer>
  );
}
