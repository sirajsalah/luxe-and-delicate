export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id:          string;
          created_at:  string;
          title:       string;
          slug:        string;
          description: string | null;
          price:       number;
          compare_at:  number | null;
          material:    string | null;
          style:       string | null;
          badge:       string | null;
          images:      string[];
          is_active:   boolean;
          stock:       number;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      orders: {
        Row: {
          id:              string;
          created_at:      string;
          customer_name:   string;
          customer_email:  string;
          status:          "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          total:           number;
          shipping_address: Json;
          items:           Json;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      customers: {
        Row: {
          id:           string;
          created_at:   string;
          name:         string;
          email:        string;
          phone:        string | null;
          total_orders: number;
          total_spent:  number;
        };
        Insert: Omit<Database["public"]["Tables"]["customers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
    };
  };
}

// Convenience row types
export type Product  = Database["public"]["Tables"]["products"]["Row"];
export type Order    = Database["public"]["Tables"]["orders"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
