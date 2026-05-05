// @ts-nocheck
import { createAdminClient } from "@/lib/supabase";
import Link from "next/link";

const C = {
  card:   "#0f0f0f",
  border: "rgba(184,134,11,0.15)",
  gold:   "#b8860b",
  text:   "#e8e0d8",
  muted:  "rgba(232,224,216,0.45)",
  font:   "'DM Sans', system-ui, sans-serif",
  serif:  "Georgia, serif",
};

const STATUS_COLOR: Record<string, string> = {
  pending:    "#ff9800",
  processing: "#2196f3",
  shipped:    "#b8860b",
  delivered:  "#4caf50",
  cancelled:  "#e57373",
};

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [{ data: products }, { data: orders }, { data: customers }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("customers").select("*").order("created_at", { ascending: false }),
  ]);

  const totalRevenue   = orders?.reduce((s, o) => s + Number(o.total), 0) ?? 0;
  const totalOrders    = orders?.length ?? 0;
  const totalProducts  = products?.length ?? 0;
  const lowStock       = products?.filter((p) => p.stock <= 3) ?? [];
  const recentOrders   = orders?.slice(0, 5) ?? [];

  const stats = [
    { label: "Total Revenue",   value: `$${totalRevenue.toLocaleString()}`, icon: "✦", trend: "+12% this month" },
    { label: "Total Orders",    value: totalOrders,                          icon: "◈", trend: "+3 this week" },
    { label: "Products",        value: totalProducts,                        icon: "⬡", trend: `${lowStock.length} low stock` },
    { label: "Customers",       value: customers?.length ?? 0,               icon: "◉", trend: "All time" },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: C.font }}>

      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>
          Overview
        </p>
        <h1 style={{ fontFamily: C.serif, fontSize: "2rem", fontWeight: 300, color: C.text, letterSpacing: "0.04em" }}>
          Dashboard
        </h1>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", marginBottom: "40px" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted }}>{s.label}</span>
              <span style={{ color: C.gold, fontSize: "16px" }}>{s.icon}</span>
            </div>
            <p style={{ fontFamily: C.serif, fontSize: "2.2rem", fontWeight: 300, color: C.text, marginBottom: "8px", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: "11px", color: C.muted }}>{s.trend}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2px" }}>

        {/* Recent orders */}
        <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold }}>Recent Orders</p>
            <Link href="/admin/orders" style={{ fontSize: "11px", color: C.muted, textDecoration: "none" }}>View all →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Order", "Customer", "Date", "Total", "Status"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "12px", color: C.gold, fontFamily: C.serif }}>#{o.id.slice(0, 6).toUpperCase()}</td>
                  <td style={{ padding: "12px", color: C.text }}>{o.customer_name}</td>
                  <td style={{ padding: "12px", color: C.muted }}>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: "12px", color: C.text, fontFamily: C.serif }}>${Number(o.total).toFixed(2)}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ padding: "3px 10px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em",
                      border: `1px solid ${STATUS_COLOR[o.status] ?? C.border}`, color: STATUS_COLOR[o.status] ?? C.muted }}>
                      {o.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={5} style={{ padding: "24px", textAlign: "center", color: C.muted }}>No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Low stock alert */}
        <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "28px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>
            Low Stock Alert
          </p>
          {lowStock.length === 0 ? (
            <p style={{ fontSize: "13px", color: C.muted }}>All products are well-stocked ✓</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {lowStock.map((p) => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: `1px solid rgba(229,115,115,0.3)` }}>
                  <div>
                    <p style={{ fontSize: "12px", color: C.text, marginBottom: "2px" }}>{p.title}</p>
                    <p style={{ fontSize: "10px", color: C.muted }}>{p.material}</p>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: p.stock === 0 ? "#e57373" : "#ff9800",
                    border: `1px solid ${p.stock === 0 ? "#e57373" : "#ff9800"}`, padding: "2px 8px" }}>
                    {p.stock === 0 ? "OUT" : `${p.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link href="/admin/products"
            style={{ display: "block", textAlign: "center", marginTop: "20px", padding: "10px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              border: `1px solid ${C.border}`, color: C.muted, textDecoration: "none" }}>
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}

