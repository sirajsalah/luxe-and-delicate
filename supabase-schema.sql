-- ─────────────────────────────────────────────────────────────────────────────
-- Luxe & Delicate — Supabase Schema (clean reset)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop existing tables (safe — removes old schema conflicts)
drop table if exists orders cascade;
drop table if exists customers cascade;
drop table if exists products cascade;

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── PRODUCTS ─────────────────────────────────────────────────────────────────
create table products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  title       text not null,
  slug        text not null unique,
  description text,
  price       numeric(10,2) not null,
  compare_at  numeric(10,2),
  material    text,
  style       text,
  badge       text,
  images      text[] default '{}',
  is_active   boolean default true,
  stock       integer default 0
);

-- ── CUSTOMERS ────────────────────────────────────────────────────────────────
create table customers (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz default now(),
  name         text not null,
  email        text not null unique,
  phone        text,
  total_orders integer default 0,
  total_spent  numeric(10,2) default 0
);

-- ── ORDERS ───────────────────────────────────────────────────────────────────
create table orders (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz default now(),
  customer_name    text not null,
  customer_email   text not null,
  status           text default 'pending'
                   check (status in ('pending','processing','shipped','delivered','cancelled')),
  total            numeric(10,2) not null,
  shipping_address jsonb,
  items            jsonb
);

-- ── SAMPLE DATA ──────────────────────────────────────────────────────────────
insert into products (title, slug, description, price, compare_at, material, style, badge, images, is_active, stock) values
  ('Turquoise Stone Bead Bracelet', 'turquoise-stone-bead', 'Hand-knotted with genuine turquoise beads. Each stone is unique in colour and pattern.', 68.00, null,  'Turquoise', 'Beaded', 'TOP RATED', '{}', true, 12),
  ('Lapis Lazuli Bead Bracelet',    'lapis-lazuli-bead',    'Deep royal blue lapis lazuli with natural gold pyrite inclusions.',                       88.00, null,  'Lapis',     'Beaded', 'NEW',       '{}', true, 8),
  ('Sodalite Heishi Bead Bracelet', 'sodalite-heishi-bead', 'Flat disc heishi beads in rich blue-grey sodalite.',                                      58.00, null,  'Sodalite',  'Beaded', 'LIMITED',   '{}', true, 5),
  ('Onyx Matte Bead Bracelet',      'onyx-matte-bead',      'Smooth matte black onyx beads — grounding and powerful.',                                 66.00, null,  'Onyx',      'Beaded', null,        '{}', true, 15),
  ('Silver Bead Stretch',           'silver-bead-bracelet', 'Sterling silver and hematite stretch bracelet.',                                          54.00, 68.00, 'Silver',    'Stretch','SALE',      '{}', true, 20),
  ('KeyStone Stack Set',            'keystone-bead-set',    'A curated stack of three complementary stone bracelets.',                                 144.00, null, 'Mixed',     'Stack',  'LIMITED',   '{}', true, 4);

insert into orders (customer_name, customer_email, status, total, shipping_address, items) values
  ('Sofia Martinez',  'sofia@example.com',     'delivered',  156.00, '{"city":"New York","country":"US"}', '[{"title":"Turquoise Stone Bead","qty":1,"price":68},{"title":"Lapis Lazuli Bead","qty":1,"price":88}]'),
  ('Amelia Khan',     'amelia@example.com',    'shipped',     88.00, '{"city":"London","country":"UK"}',   '[{"title":"Lapis Lazuli Bead","qty":1,"price":88}]'),
  ('Priya Tan',       'priya@example.com',     'processing', 144.00, '{"city":"Dubai","country":"AE"}',    '[{"title":"KeyStone Stack Set","qty":1,"price":144}]'),
  ('Charlotte Lee',   'charlotte@example.com', 'pending',     54.00, '{"city":"Sydney","country":"AU"}',   '[{"title":"Silver Bead Stretch","qty":1,"price":54}]');

insert into customers (name, email, total_orders, total_spent) values
  ('Sofia Martinez',  'sofia@example.com',     2, 312.00),
  ('Amelia Khan',     'amelia@example.com',     1,  88.00),
  ('Priya Tan',       'priya@example.com',      1, 144.00),
  ('Charlotte Lee',   'charlotte@example.com',  1,  54.00);
