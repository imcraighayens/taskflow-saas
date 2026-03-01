"use client";

import Link from "next/link";
import { useHydration } from "@/hooks/useHydration";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function PortfolioPage() {
  const hydrated = useHydration();
  const account = usePortfolioStore((s) => s.account);
  const holdings = usePortfolioStore((s) => s.holdings);
  const holdingsValue = usePortfolioStore((s) => s.getHoldingsValue());

  if (!hydrated) {
    return (
      <div className="px-6 pt-14 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-32" />
        <div className="h-40 bg-gray-100 rounded-3xl" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-50 rounded-xl" />
        ))}
      </div>
    );
  }

  const totalValue = account.balance + holdingsValue;
  const totalGain = holdings.reduce((sum, h) => sum + h.gain, 0);
  const totalGainPercent =
    holdingsValue > 0 ? (totalGain / (holdingsValue - totalGain)) * 100 : 0;

  return (
    <div className="px-6 pt-14 pb-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h1>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 mb-8">
        <p className="text-sm text-gray-400 mb-1">Total Value</p>
        <p className="text-3xl font-bold text-white tracking-tight mb-3">
          {formatCurrency(totalValue)}
        </p>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              totalGain >= 0
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {totalGain >= 0 ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {formatPercent(totalGainPercent)}
          </div>
          <span className="text-xs text-gray-500">
            {totalGain >= 0 ? "+" : ""}
            {formatCurrency(totalGain)} overall
          </span>
        </div>

        {/* Cash vs Invested */}
        <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">
          <div>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">
              Cash
            </p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(account.balance)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">
              Invested
            </p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(holdingsValue)}
            </p>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Holdings</h2>
        <span className="text-sm text-gray-400">
          {holdings.length} assets
        </span>
      </div>

      <div className="space-y-2">
        {holdings.map((h) => {
          const positive = h.gain >= 0;
          return (
            <Link
              key={h.assetId}
              href={`/asset/${h.assetId}`}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-lg shadow-sm shrink-0">
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {h.symbol}
                </p>
                <p className="text-xs text-gray-400">
                  {h.shares} shares
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(h.value)}
                </p>
                <div
                  className={`flex items-center gap-0.5 justify-end text-xs font-medium ${
                    positive ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {positive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {formatPercent(h.gainPercent)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
