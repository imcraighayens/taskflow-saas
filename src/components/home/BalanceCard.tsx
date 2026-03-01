"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ShieldCheck, PlusCircle, ArrowUpRight } from "lucide-react";

export default function BalanceCard() {
  const account = usePortfolioStore((s) => s.account);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-loop-500 via-loop-600 to-loop-800 p-5">
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium text-white/80">
              Verified account
            </span>
          </div>
          <button className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-full px-3 py-1.5 transition">
            <PlusCircle className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold text-white">Deposit</span>
          </button>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="text-xs font-medium text-white/60 mb-1">
            Total Balance
          </p>
          <p className="text-3xl font-bold text-white tracking-tight">
            {formatCurrency(account.balance + account.portfolioValue)}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-green-300" />
            <span className="text-xs font-semibold text-green-300">
              {formatPercent(account.totalGainPercent)}
            </span>
          </div>
          <span className="text-xs text-white/50">
            {formatCurrency(account.totalGain)} all time
          </span>
        </div>
      </div>
    </div>
  );
}
