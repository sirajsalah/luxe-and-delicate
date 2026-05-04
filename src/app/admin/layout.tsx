"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin",           label: "Dashboard",  icon: "◈" },
  { href: "/admin/products",  label: "Products",   icon: "⬡" },
  { href: "/admin/orders",    label: "Orders",     icon: "✦" },
  { href: "/admin/customers", label: "Customers",  icon: "◉" },
];

const C = {
  bg:       "#050505",
  sidebar:  "#0a0a0a",
  card:     "#0f0f0f",
  border:   "rgba(184,134,11,0.15)",
  gold:     "#b8860b",
  text:     "#e8e0d8",
  muted:    "rgba(232,224,216,0.4)",
  font:     "'DM Sans', system-ui, sans-serif",
  serif:    "Georgia, serif",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  // Don't render sidebar on the login page
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: C.bg, fontFamily: C.font, color: C.text }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside style={{ width: "220px", flexShrink: 0, backgroundColor: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh" }}>

        {/* Brand */}
        <div style={{ padding: "28px 24px 24px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.gold }} />
            <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold }}>Admin Panel</span>
          </div>
          <p style={{ fontFamily: C.serif, fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.06em" }}>Luxe &amp; Delicate</p>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", marginBottom: "2px", textDecoration: "none",
                  backgroundColor: active ? "rgba(184,134,11,0.1)" : "transparent",
                  borderLeft: active ? `2px solid ${C.gold}` : "2px solid transparent",
                  color: active ? C.text : C.muted, fontSize: "12px", letterSpacing: "0.06em" }}>
                <span style={{ fontSize: "14px", color: active ? C.gold : C.muted }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 12px", borderTop: `1px solid ${C.border}` }}>
          <Link href="/" target="_blank"
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", marginBottom: "4px", textDecoration: "none", color: C.muted, fontSize: "12px" }}>
            <span style={{ fontSize: "12px" }}>↗</span> View Store
          </Link>
          <button onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: "12px" }}>
            <span style={{ fontSize: "12px" }}>→</span> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <main style={{ marginLeft: "220px", flex: 1, minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
