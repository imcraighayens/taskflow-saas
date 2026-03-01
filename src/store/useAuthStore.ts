"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockUser } from "@/lib/mock-data";
import type { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (_email: string, _password: string) => {
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "loop-auth" }
  )
);
