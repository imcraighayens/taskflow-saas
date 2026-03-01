"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  mockAccount,
  mockHoldings,
  mockTransactions,
  mockAssets,
} from "@/lib/mock-data";
import type { Account, Holding, Transaction, Asset } from "@/lib/types";

interface PortfolioState {
  account: Account;
  holdings: Holding[];
  transactions: Transaction[];
  assets: Asset[];
  getHoldingsValue: () => number;
  getRecentTransactions: (count?: number) => Transaction[];
  getAssetById: (id: string) => Asset | undefined;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      account: mockAccount,
      holdings: mockHoldings,
      transactions: mockTransactions,
      assets: mockAssets,
      getHoldingsValue: () =>
        get().holdings.reduce((sum, h) => sum + h.value, 0),
      getRecentTransactions: (count = 5) =>
        get()
          .transactions.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, count),
      getAssetById: (id: string) => get().assets.find((a) => a.id === id),
    }),
    { name: "loop-portfolio" }
  )
);
