/**
 * BK Centre Connect - Database & Authentication Types Foundation
 *
 * Full database schema will be introduced in subsequent migration files.
 * This file establishes core role types and database placeholder types for Supabase clients.
 */

export type AppRole = 'SUPER_ADMIN' | 'CENTRE_USER';

export interface Database {
  public: {
    Tables: {
      // 17 core business tables will be strongly typed here once migrations are introduced.
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: AppRole;
    };
  };
}
