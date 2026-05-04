"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Order } from "@/lib/database.types";

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

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

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

export default function AdminOrdersPage() {
  const [orders, setOrders]           = useState<Order[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected]       = useState<Order | null>(null);
  const [updatingId, setUpdatingId]   = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await supabase.from("orders").update({ status }).eq("id", id);
    setUpdatingId(null);
    // Update local state instantly
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : prev);
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered.reduce((s, o) => s + Number(o.total), 0);

  // Parse items JSON safely
  const parseItems = (items: unknown): Array<{ title: string; quantity: number; price: number }> => {
    if (!items) return [];
    if (Array.isArray(items)) return items as Array<{ title: string; quantity: number; price: number }>;
    try { return JSON.parse(String(items)); } catch { return []; }
  };

  return (
    <div style={{ padding: "40px", fontFamily: C.font }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
        <div>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>Management</p>
          <h1 style={{ fontFamily: C.serif, fontSize: "2rem", fontWeight: 300, color: C.text }}>Orders</h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "9px", color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>Filtered Revenue</p>
          <p style={{ fontFamily: C.serif, fontSize: "1.6rem", color: C.gold, fontWeight: 300 }}>${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or order ID…"
          style={{ ...inputStyle, maxWidth: "320px" }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", ...STATUS_OPTIONS].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{
                padding: "10px 16px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", cursor: "pointer", border: `1px solid ${statusFilter === s ? (STATUS_COLOR[s] ?? C.gold) : C.border}`,
                color: statusFilter === s ? (STATUS_COLOR[s] ?? C.gold) : C.muted,
                background: statusFilter === s ? `${(STATUS_COLOR[s] ?? C.gold)}15` : "transparent",
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Order", "Customer", "Date", "Items", "Total", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.muted }}>Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.muted }}>No orders found</td></tr>
            )}
            {filtered.map((o) => (
              <tr key={o.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontFamily: C.serif, color: C.gold, fontSize: "13px" }}>#{o.id.slice(0, 8).toUpperCase()}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ color: C.text, marginBottom: "2px" }}>{o.customer_name}</p>
                  <p style={{ fontSize: "11px", color: C.muted }}>{o.customer_email}</p>
                </td>
                <td style={{ padding: "14px 16px", color: C.muted, fontSize: "12px" }}>
                  {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td style={{ padding: "14px 16px", color: C.muted }}>
                  {parseItems(o.items).length} item{parseItems(o.items).length !== 1 ? "s" : ""}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontFamily: C.serif, color: C.text }}>${Number(o.total).toFixed(2)}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <select
                    value={o.status}
                    disabled={updatingId === o.id}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    style={{
                      padding: "4px 8px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase", cursor: "pointer", background: "#0a0a0a",
                      border: `1px solid ${STATUS_COLOR[o.status] ?? C.border}`,
                      color: STATUS_COLOR[o.status] ?? C.muted, outline: "none",
                      opacity: updatingId === o.id ? 0.5 : 1,
                    }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} style={{ textTransform: "uppercase" }}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => setSelected(o)}
                    style={{ padding: "5px 14px", fontSize: "10px", cursor: "pointer", background: "none", border: `1px solid ${C.border}`, color: C.muted }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── ORDER DETAIL MODAL ─────────────────────────────────────────────── */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto", padding: "36px" }}>

            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <div>
                <p style={{ fontSize: "9px", color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>Order Details</p>
                <h2 style={{ fontFamily: C.serif, fontSize: "1.4rem", fontWeight: 300 }}>#{selected.id.slice(0, 8).toUpperCase()}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.muted, fontSize: "20px", cursor: "pointer" }}>×</button>
            </div>

            {/* Status badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted }}>Status:</span>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                style={{
                  padding: "6px 12px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", cursor: "pointer", background: "#0a0a0a",
                  border: `1px solid ${STATUS_COLOR[selected.status] ?? C.border}`,
                  color: STATUS_COLOR[selected.status] ?? C.muted, outline: "none",
                }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Customer info */}
            <div style={{ backgroundColor: "#0a0a0a", border: `1px solid ${C.border}`, padding: "16px", marginBottom: "20px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>Customer</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px" }}>
                <div>
                  <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Name</p>
                  <p style={{ color: C.text }}>{selected.customer_name}</p>
                </div>
                <div>
                  <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Email</p>
                  <p style={{ color: C.text }}>{selected.customer_email}</p>
                </div>
                {selected.shipping_address && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <p style={{ color: C.muted, marginBottom: "2px", fontSize: "10px" }}>Shipping Address</p>
                    <p style={{ color: C.text }}>{String(selected.shipping_address)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>Items Ordered</p>
              {parseItems(selected.items).length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {parseItems(selected.items).map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", border: `1px solid ${C.border}`, fontSize: "13px" }}>
                      <div>
                        <p style={{ color: C.text }}>{item.title}</p>
                        <p style={{ fontSize: "11px", color: C.muted }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: C.serif, color: C.text }}>${Number(item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: C.muted, fontSize: "13px" }}>No item details available</p>
              )}
            </div>

            {/* Totals */}
            <div style={{ backgroundColor: "#0a0a0a", border: `1px solid ${C.border}`, padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted }}>Order Total</span>
                <span style={{ fontFamily: C.serif, fontSize: "1.4rem", color: C.gold }}>${Number(selected.total).toFixed(2)}</span>
              </div>
            </div>

            <p style={{ fontSize: "11px", color: C.muted, marginTop: "16px" }}>
              Placed on {new Date(selected.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
