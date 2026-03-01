"use client";

import { useHydration } from "@/hooks/useHydration";
import { useAuthStore } from "@/store/useAuthStore";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import BalanceCard from "@/components/home/BalanceCard";
import QuickActions from "@/components/home/QuickActions";
import {
  Search,
  Menu,
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  TrendingUp,
  Minus,
  DollarSign,
} from "lucide-react";

const txIcons: Record<string, typeof ArrowUpRight> = {
  buy: ArrowUpRight,
  sell: ArrowDownLeft,
  deposit: DollarSign,
  withdraw: Minus,
  dividend: TrendingUp,
  fee: Banknote,
};

const txColors: Record<string, string> = {
  buy: "bg-blue-50 text-blue-600",
  sell: "bg-orange-50 text-orange-600",
  deposit: "bg-green-50 text-green-600",
  withdraw: "bg-red-50 text-red-600",
  dividend: "bg-purple-50 text-purple-600",
  fee: "bg-gray-100 text-gray-500",
};

export default function HomePage() {
  const hydrated = useHydration();
  const user = useAuthStore((s) => s.user);
  const transactions = usePortfolioStore((s) => s.getRecentTransactions(6));

  if (!hydrated) {
    return (
      <div className="animate-pulse">
        <div className="bg-gradient-to-b from-loop-600 to-loop-500 h-80 rounded-b-[2.5rem]" />
        <div className="px-6 mt-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-32" />
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Blue Hero Section */}
      <div className="bg-gradient-to-b from-loop-600 via-loop-500 to-loop-400 px-6 pt-14 pb-8 rounded-b-[2.5rem]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome back{user ? `, ${user.firstName}` : ""}!
          </h1>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass rounded-full px-4 py-3 mb-6 flex items-center gap-3">
          <span className="text-sm text-white/60">
            Type your thoughts...
          </span>
          <div className="ml-auto w-8 h-8 rounded-full bg-loop-400 flex items-center justify-center">
            <span className="text-xs">💬</span>
          </div>
        </div>

        {/* Balance Card */}
        <BalanceCard />
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Recent activity
            </h2>
            <button className="text-sm font-medium text-loop-600 hover:text-loop-700 transition">
              View all
            </button>
          </div>

          <div className="space-y-1">
            {transactions.map((tx) => {
              const Icon = txIcons[tx.type] || Banknote;
              const colorClass = txColors[tx.type] || txColors.fee;
              const isInflow =
                tx.type === "sell" || tx.type === "deposit" || tx.type === "dividend";

              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 py-3 px-1"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      {tx.assetSymbol ? ` ${tx.assetSymbol}` : ""}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        isInflow ? "text-emerald-500" : "text-gray-900"
                      }`}
                    >
                      {isInflow ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                    {tx.status === "pending" && (
                      <span className="text-[10px] font-medium text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
