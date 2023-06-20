export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ai_user_use: {
        Row: {
          can_use: boolean | null
          id: string
        }
        Insert: {
          can_use?: boolean | null
          id: string
        }
        Update: {
          can_use?: boolean | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_user_use_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          modified_at: string | null
          owner: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          modified_at?: string | null
          owner?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          modified_at?: string | null
          owner?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      private_posts: {
        Row: {
          content: string | null
          id: string
          title: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string | null
          finished_time: string | null
          id: string
          is_finished: boolean | null
        }
        Insert: {
          created_at?: string | null
          finished_time?: string | null
          id: string
          is_finished?: boolean | null
        }
        Update: {
          created_at?: string | null
          finished_time?: string | null
          id?: string
          is_finished?: boolean | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          name: string | null
          posts: Json[]
          profile: string | null
        }
        Insert: {
          id: string
          name?: string | null
          posts?: Json[]
          profile?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          posts?: Json[]
          profile?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_profile_fkey"
            columns: ["profile"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      decrypted_private_posts: {
        Row: {
          content: string | null
          decrypted_content: string | null
          id: string | null
          title: string | null
        }
        Insert: {
          content?: string | null
          decrypted_content?: never
          id?: string | null
          title?: string | null
        }
        Update: {
          content?: string | null
          decrypted_content?: never
          id?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
