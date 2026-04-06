/**
 * Types generated for the Supabase database schema.
 *
 * In a real project these types can be generated automatically using
 * `supabase gen types typescript --local` but here they are hand‑written to
 * illustrate the shape of the data.  Adjust the definitions to match
 * your schema.
 */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          user_id: string;
          team_id: string | null;
          title: string;
          description: string | null;
          status: 'todo' | 'in-progress' | 'done';
          priority: 'high' | 'mid' | 'low';
          tag: string;
          due: string | null; // ISO date
          fav: boolean;
          assignee: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          team_id?: string | null;
          title: string;
          description?: string | null;
          status?: 'todo' | 'in-progress' | 'done';
          priority?: 'high' | 'mid' | 'low';
          tag?: string;
          due?: string | null;
          fav?: boolean;
          assignee?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          team_id?: string | null;
          title?: string;
          description?: string | null;
          status?: 'todo' | 'in-progress' | 'done';
          priority?: 'high' | 'mid' | 'low';
          tag?: string;
          due?: string | null;
          fav?: boolean;
          assignee?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tasks_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          }
        ];
      };
      teams: {
        Row: {
          id: string;
          name: string;
          owner: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          owner: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          owner?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'teams_owner_fkey';
            columns: ['owner'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      team_members: {
        Row: {
          team_id: string;
          user_id: string;
          role: string;
        };
        Insert: {
          team_id: string;
          user_id: string;
          role?: string;
        };
        Update: {
          team_id?: string;
          user_id?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'team_members_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'team_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}