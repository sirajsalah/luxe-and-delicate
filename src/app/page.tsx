import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

/* ─── Placeholder product data (replace with real DB data later) ─── */
const featuredProducts = [
  {
    id: "1",
    title: "Golden Beaded Stack",
    price: 48,
    compareAtPrice: 64,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    badge: "Best Seller",
    slug: "golden-beaded-stack",
  },
  {
    id: "2",
    title: "Rose Quartz Charm",
    price: 56,
    image: "https://images.unsplash.com/photo-1573408301185-9519f94f8df9?w=600&q=80",
    badge: "New",
    slug: "rose-quartz-charm",
  },
  {
    id: "3",
    title: "Leather & Gold Wrap",
    price: 72,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    badge: null,
    slug: "leather-gold-wrap",
  },
  {
    id: "4",
    title: "Pearl Delicate Chain",
    price: 62,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    badge: "New",
    slug: "pearl-delicate-chain",
  },
];

const collections = [
  {
    title: "Beaded",
    subtitle: "Colour & Soul",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    href: "/shop/beaded",
  },
  {
    title: "Charm",
    subtitle: "Tell Your Story",
    image: "https://images.unsplash.com/photo-1573408301185-9519f94f8df9?w=800&q=80",
    href: "/shop/charms",
  },
  {
    title: "Custom",
    subtitle: "Made for You",
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=800&q=80",
    href: "/shop/custom",
  },
];

const trustBadges = [
  { icon: "✦", label: "Handcrafted", sub: "Every piece made with care" },
  { icon: "♻", label: "Sustainable", sub: "Ethical materials only" },
  { icon: "↩", label: "100-Day Returns", sub: "Hassle-free guarantee" },
  { icon: "✉", label: "Free Shipping", sub: "On orders over $65" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative h-[92vh] min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1800&q=85"
          alt="Luxe & Delicate bracelets"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-soft-black/50 via-soft-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="max-w-xl animate-fade-in">
              <p className="section-subheading text-white/70 mb-4">
                New Collection 2025
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] mb-6 text-balance">
                Stack. Style.{" "}
                <em className="italic text-blush-light">Shine.</em>
              </h1>
              <p className="font-body text-base text-white/70 mb-10 leading-relaxed max-w-sm">
                Handcrafted bracelets that become part of your story. Layer them,
                stack them, wear them every day.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="btn-primary">
                  Shop Now
                </Link>
                <Link href="/collections" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors">
                  Explore Collections <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-cream border-y border-warm-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-warm-200">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center py-5 px-4 text-center">
                <span className="text-rose-gold text-lg mb-1">{badge.icon}</span>
                <span className="font-body text-xs font-semibold tracking-widest uppercase text-charcoal">
                  {badge.label}
                </span>
                <span className="font-body text-xs text-warm-400 mt-0.5 hidden sm:block">
                  {badge.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subheading mb-2">Curated for You</p>
            <h2 className="section-heading">Best Sellers</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-charcoal hover:text-rose-gold transition-colors border-b border-charcoal/30 pb-0.5"
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="product-card group">
              {/* Image */}
              <div className="relative overflow-hidden bg-cream aspect-product">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="product-card-image object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Badge */}
                {product.badge && (
                  <span className={product.badge === "New" ? "badge-new" : "badge-sale"}>
                    {product.badge}
                  </span>
                )}
                {/* Quick add on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 text-center text-xs tracking-widest uppercase font-medium text-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-body">
                  Quick Add
                </div>
              </div>
              {/* Info */}
              <div className="pt-3">
                <h3 className="font-body text-sm font-medium text-charcoal group-hover:text-rose-gold transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-body text-sm text-charcoal">
                    ${product.price}
                  </span>
                  {product.compareAtPrice && (
                    <span className="font-body text-xs text-warm-400 line-through">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="flex justify-center mt-10 sm:hidden">
          <Link href="/shop" className="btn-secondary">
            View All Bracelets
          </Link>
        </div>
      </section>

      {/* ── COLLECTIONS GRID ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <p className="section-subheading mb-2">Find Your Style</p>
          <h2 className="section-heading">Shop by Collection</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative overflow-hidden aspect-[4/5] block bg-cream"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="font-body text-xs tracking-widest uppercase text-white/60 mb-1">
                  {col.subtitle}
                </p>
                <h3 className="font-display text-3xl text-white font-light mb-4">
                  {col.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-white border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                  Shop Now <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL STRIP — THE STACK ── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=800&q=80"
                  alt="Bracelet stacking guide"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white p-5 shadow-brand max-w-[200px]">
                <Sparkles size={16} className="text-rose-gold mb-2" />
                <p className="font-display text-lg font-light text-soft-black leading-tight">
                  The art of stacking
                </p>
                <p className="font-body text-xs text-warm-400 mt-1">
                  Mix textures, metals & meaning
                </p>
              </div>
            </div>

            <div className="lg:pl-8">
              <p className="section-subheading mb-4">Our Philosophy</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-soft-black leading-tight mb-6 text-balance">
                Every bracelet tells{" "}
                <em className="italic text-rose-gold">a story</em>
              </h2>
              <p className="font-body text-sm text-warm-400 leading-relaxed mb-4">
                We believe jewelry should be worn, not saved for special occasions.
                Each piece in our collection is designed to become part of your
                daily ritual — layered, stacked, and loved.
              </p>
              <p className="font-body text-sm text-warm-400 leading-relaxed mb-10">
                Handcrafted using ethically sourced materials, every Luxe & Delicate
                bracelet is made to last a lifetime and tell your story with every wear.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/story" className="btn-primary">
                  Our Story
                </Link>
                <Link href="/shop/custom" className="btn-secondary">
                  Create Custom
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM FEED TEASER ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <p className="section-subheading mb-2">@luxeanddelicate</p>
          <h2 className="section-heading">As Seen on Instagram</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
            "https://images.unsplash.com/photo-1573408301185-9519f94f8df9?w=400&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
            "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=400&q=80",
            "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80",
          ].map((img, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block bg-cream"
            >
              <Image
                src={img}
                alt={`Instagram post ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-soft-black/0 group-hover:bg-soft-black/20 transition-colors duration-300" />
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-charcoal hover:text-rose-gold transition-colors border-b border-charcoal/30 pb-0.5"
          >
            Follow Us on Instagram <ArrowRight size={12} />
          </a>
        </div>
      </section>

      {/* ── CUSTOM BRACELET CTA ── */}
      <section className="relative py-24 overflow-hidden bg-charcoal">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=60"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <Sparkles size={20} className="text-blush mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-5 text-balance">
            Create something{" "}
            <em className="italic text-blush">uniquely yours</em>
          </h2>
          <p className="font-body text-sm text-white/50 mb-10 leading-relaxed">
            Design a custom bracelet with your choice of beads, charms, metals,
            and engraving. The perfect gift — or a gift to yourself.
          </p>
          <Link href="/shop/custom" className="btn-primary bg-white text-soft-black hover:bg-cream">
            Start Customizing
          </Link>
        </div>
      </section>
    </>
  );
}
