// @ts-nocheck
"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Customer, Order } from "@/lib/database.types";

const C = {
  bg:     "#050505",
  card:   "#0f0f0f",
  border: "rgba(184,134,11,0.15)",
  gold:   "#b8860b",
  text:   "#e8e0d8",
  muted:  "rgba(232,224,216,0.45)",
  font:   "'DM Sans', system-ui, sans-serif",
  serif:  "Georgia, serif",
  red:    "#e57373",
  green:  "#4caf50",
};

const STATUS_COLOR: Record<string, string> = {
  pending:    "#ff9800",
  processing: "#2196f3",
  shipped:    "#b8860b",
  delivered:  "#4caf50",
  cancelled:  "#e57373",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", backgroundColor: "#0a0a0a",
  border: `1px solid ${C.border}`, color: C.text, fontSize: "13px",
  outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif", boxSizing: "border-box",
};

type CustomerWithOrders = Customer & { orders: Order[]; totalSpent: number };

export default function AdminCustomersPage() {
  const [customers, setCustomers]   = useState<CustomerWithOrders[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<CustomerWithOrders | null>(null);
  const [exporting, setExporting]   = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const custsRes  = await supabase.from("customers").select("*").order("created_at", { ascending: false });
    const ordersRes = await supabase.from("orders").select("*");

    const custs  = (custsRes.data  ?? []) as Customer[];
    const orders = (ordersRes.data ?? []) as Order[];

    const enriched: CustomerWithOrders[] = custs.map((c) => {
      const cOrders  = orders.filter((o) => o.customer_email === c.email);
      const totalSpent = cOrders.reduce((s, o) => s + Number(o.total), 0);
      return { ...c, orders: cOrders, totalSpent };
    });

    setCustomers(enriched);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Export to CSV
  const exportCSV = () => {
    setExporting(true);
    const headers = ["Name", "Email", "Phone", "Total Orders", "Total Spent", "Joined"];
    const rows = filtered.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone ?? ""}"`,
      c.orders.length,
      `"$${c.totalSpent.toFixed(2)}"`,
      `"${new Date(c.created_at).toLocaleDateString()}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: C.font }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
        <div>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>Management</p>
          <h1 style={{ fontFamily: C.serif, fontSize: "2rem", fontWeight: 300, color: C.text }}>Customers</h1>
        </div>
        <button onClick={exportCSV} disabled={exporting}
          style={{ padding: "11px 24px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            backgroundColor: "transparent", color: exporting ? C.muted : C.gold,
            border: `1px solid ${exporting ? C.border : C.gold}`, cursor: exporting ? "not-allowed" : "pointer" }}>
          {exporting ? "Exporting…" : "↓ Export CSV"}
        </button>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", marginBottom: "28px" }}>
        {[
          { label: "Total Customers", value: customers.length },
          { label: "With Orders",     value: customers.filter((c) => c.orders.length > 0).length },
          { label: "Total Revenue",   value: `$${customers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
        ].map((s) => (
          <div key={s.label} style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, padding: "20px 24px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, marginBottom: "8px" }}>{s.label}</p>
            <p style={{ fontFamily: C.serif, fontSize: "1.8rem", fontWeight: 300, color: C.text }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email…"
        style={{ ...inputStyle, marginBottom: "24px", maxWidth: "360px" }} />

      {/* Table */}
      <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Customer", "Email", "Phone", "Orders", "Total Spent", "Joined", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.muted }}>Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.muted }}>No customers found</td></tr>
            )}
            {filtered.map((c) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#1a1a1a", border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: C.gold, fontFamily: C.serif, flexShrink: 0 }}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <p style={{ color: C.text }}>{c.name}</p>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: C.muted, fontSize: "12px" }}>{c.email}</td>
                <td style={{ padding: "14px 16px", color: C.muted, fontSize: "12px" }}>{c.phone ?? "—"}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: c.orders.length > 0 ? C.green : C.muted, fontWeight: 600 }}>{c.orders.length}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontFamily: C.serif, color: c.totalSpent > 0 ? C.gold : C.muted }}>
                    ${c.totalSpent.toFixed(2)}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", color: C.muted, fontSize: "12px" }}>
                  {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => setSelected(c)}
                    style={{ padding: "5px 14px", fontSize: "10px", cursor: "pointer", background: "none", border: `1px solid ${C.border}`, color: C.muted }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CUSTOMER DETAIL MODAL ─────────────────────────────────────────── */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, width: "100%", maxWidth: "580px", maxHeight: "90vh", overflowY: "auto", padding: "36px" }}>

            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#1a1a1a", border: `1px solid ${C.gold}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: C.gold, fontFamily: C.serif }}>
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontSize: "9px", color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>Customer Profile</p>
                  <h2 style={{ fontFamily: C.serif, fontSize: "1.4rem", fontWeight: 300 }}>{selected.name}</h2>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.muted, fontSize: "20px", cursor: "pointer" }}>×</button>
            </div>

            {/* Contact info */}
            <div style={{ backgroundColor: "#0a0a0a", border: `1px solid ${C.border}`, padding: "16px", marginBottom: "20px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>Contact</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                <div>
                  <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Email</p>
                  <p style={{ color: C.text }}>{selected.email}</p>
                </div>
                <div>
                  <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Phone</p>
                  <p style={{ color: C.text }}>{selected.phone ?? "—"}</p>
                </div>
                <div>
                  <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Customer Since</p>
                  <p style={{ color: C.text }}>{new Date(selected.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
                <div>
                  <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Total Spent</p>
                  <p style={{ fontFamily: C.serif, color: C.gold, fontSize: "15px" }}>${selected.totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order history */}
            <div>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>
                Order History ({selected.orders.length})
              </p>
              {selected.orders.length === 0 ? (
                <p style={{ color: C.muted, fontSize: "13px", padding: "20px 0" }}>No orders yet</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selected.orders
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((o) => (
                      <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", border: `1px solid ${C.border}` }}>
                        <div>
                          <p style={{ fontFamily: C.serif, color: C.gold, fontSize: "12px", marginBottom: "2px" }}>#{o.id.slice(0, 8).toUpperCase()}</p>
                          <p style={{ fontSize: "11px", color: C.muted }}>
                            {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <span style={{ fontFamily: C.serif, color: C.text, fontSize: "13px" }}>${Number(o.total).toFixed(2)}</span>
                          <span style={{ padding: "2px 8px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                            border: `1px solid ${STATUS_COLOR[o.status] ?? C.border}`, color: STATUS_COLOR[o.status] ?? C.muted }}>
                            {o.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
