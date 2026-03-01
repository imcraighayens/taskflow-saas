"use client";

import { useState } from "react";
import { useHydration } from "@/hooks/useHydration";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { ASSET_CATEGORIES } from "@/lib/constants";
import AssetRow from "@/components/markets/AssetRow";
import { Search, SlidersHorizontal } from "lucide-react";

export default function MarketsPage() {
  const hydrated = useHydration();
  const assets = usePortfolioStore((s) => s.assets);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = assets.filter((a) => {
    const matchesCategory =
      activeCategory === "all" || a.category === activeCategory;
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!hydrated) {
    return (
      <div className="px-6 pt-14 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-32" />
        <div className="h-12 bg-gray-100 rounded-2xl" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-50 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="px-6 pt-14 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Markets</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-loop-500/20 focus:border-loop-500 transition"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {ASSET_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-loop-600 text-white shadow-md shadow-loop-600/25"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Trending */}
      <div className="mb-2">
        <h2 className="text-base font-bold text-gray-900 mb-1">Trending</h2>
        <p className="text-xs text-gray-400 mb-3">
          Most popular assets today
        </p>
      </div>

      {/* Asset List */}
      <div className="space-y-0.5">
        {filtered.map((asset) => (
          <AssetRow key={asset.id} asset={asset} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No assets found
          </div>
        )}
      </div>
    </div>
  );
}
