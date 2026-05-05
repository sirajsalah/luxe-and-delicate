// @ts-nocheck
"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/database.types";

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

const EMPTY: Omit<Product, "id"|"created_at"> = {
  title: "", slug: "", description: "", price: 0, compare_at: null,
  material: "", style: "", badge: "", images: [], is_active: true, stock: 0,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", backgroundColor: "#0a0a0a",
  border: `1px solid ${C.border}`, color: C.text, fontSize: "13px",
  outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif", boxSizing: "border-box",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<Product | null>(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, description: p.description ?? "", price: p.price,
      compare_at: p.compare_at, material: p.material ?? "", style: p.style ?? "",
      badge: p.badge ?? "", images: p.images, is_active: p.is_active, stock: p.stock });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock),
      compare_at: form.compare_at ? Number(form.compare_at) : null,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") };

    if (editing) {
      await supabase.from("products").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("products").insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    fetchProducts();
  };

  const toggleActive = async (p: Product) => {
    await supabase.from("products").update({ is_active: !p.is_active }).eq("id", p.id);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.material ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const f = (k: keyof typeof form, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div style={{ padding: "40px", fontFamily: C.font }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
        <div>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>Inventory</p>
          <h1 style={{ fontFamily: C.serif, fontSize: "2rem", fontWeight: 300, color: C.text }}>Products</h1>
        </div>
        <button onClick={openNew}
          style={{ padding: "11px 28px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer" }}>
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or material…"
        style={{ ...inputStyle, marginBottom: "24px", maxWidth: "360px" }} />

      {/* Table */}
      <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Product", "Material", "Price", "Stock", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: C.muted }}>Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: C.muted }}>No products found</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ color: C.text, marginBottom: "2px" }}>{p.title}</p>
                  {p.badge && <span style={{ fontSize: "9px", color: C.gold, border: `1px solid ${C.gold}`, padding: "1px 6px" }}>{p.badge}</span>}
                </td>
                <td style={{ padding: "14px 16px", color: C.muted }}>{p.material ?? "—"}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontFamily: C.serif, color: C.gold }}>${Number(p.price).toFixed(2)}</span>
                  {p.compare_at && <span style={{ fontSize: "11px", color: C.muted, textDecoration: "line-through", marginLeft: "6px" }}>${Number(p.compare_at).toFixed(2)}</span>}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: p.stock === 0 ? C.red : p.stock <= 3 ? "#ff9800" : C.green, fontWeight: 600 }}>{p.stock}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => toggleActive(p)}
                    style={{ padding: "3px 10px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", cursor: "pointer",
                      border: `1px solid ${p.is_active ? C.green : C.muted}`, color: p.is_active ? C.green : C.muted, background: "none" }}>
                    {p.is_active ? "ACTIVE" : "HIDDEN"}
                  </button>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => openEdit(p)}
                      style={{ padding: "5px 14px", fontSize: "10px", cursor: "pointer", background: "none", border: `1px solid ${C.border}`, color: C.muted }}>
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(p.id)}
                      style={{ padding: "5px 14px", fontSize: "10px", cursor: "pointer", background: "none", border: `1px solid rgba(229,115,115,0.3)`, color: C.red }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── ADD / EDIT MODAL ──────────────────────────────────────────────── */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", padding: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h2 style={{ fontFamily: C.serif, fontSize: "1.5rem", fontWeight: 300 }}>{editing ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: C.muted, fontSize: "20px", cursor: "pointer" }}>×</button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Title *</label>
                <input required value={form.title} onChange={(e) => f("title", e.target.value)} placeholder="Turquoise Stone Bead Bracelet" style={inputStyle} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Slug (URL)</label>
                <input value={form.slug} onChange={(e) => f("slug", e.target.value)} placeholder="auto-generated from title if left blank" style={inputStyle} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Description</label>
                <textarea value={form.description ?? ""} onChange={(e) => f("description", e.target.value)} rows={3} placeholder="Describe the bracelet…"
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Price *</label>
                  <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => f("price", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Compare At (Sale)</label>
                  <input type="number" step="0.01" min="0" value={form.compare_at ?? ""} onChange={(e) => f("compare_at", e.target.value || null)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Material</label>
                  <input value={form.material ?? ""} onChange={(e) => f("material", e.target.value)} placeholder="Turquoise" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Style</label>
                  <input value={form.style ?? ""} onChange={(e) => f("style", e.target.value)} placeholder="Beaded" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Badge</label>
                  <input value={form.badge ?? ""} onChange={(e) => f("badge", e.target.value)} placeholder="NEW / LIMITED / SALE" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "6px" }}>Stock Quantity *</label>
                <input required type="number" min="0" value={form.stock} onChange={(e) => f("stock", e.target.value)} style={{ ...inputStyle, maxWidth: "160px" }} />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: C.muted }}>
                <input type="checkbox" checked={form.is_active} onChange={(e) => f("is_active", e.target.checked)} style={{ accentColor: C.gold }} />
                Active (visible on store)
              </label>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="submit" disabled={saving}
                  style={{ flex: 1, padding: "13px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                    backgroundColor: saving ? "rgba(184,134,11,0.5)" : C.gold, color: "#fff", border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                  {saving ? "Saving…" : editing ? "Save Changes" : "Add Product"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  style={{ padding: "13px 24px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                    backgroundColor: "transparent", color: C.muted, border: `1px solid ${C.border}`, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
