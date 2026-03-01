"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useHydration } from "@/hooks/useHydration";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TIME_RANGES } from "@/lib/constants";
import SimpleChart from "@/components/asset/SimpleChart";
import { X, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { TimeRange } from "@/lib/types";

export default function AssetPage() {
  const params = useParams();
  const router = useRouter();
  const hydrated = useHydration();
  const getAssetById = usePortfolioStore((s) => s.getAssetById);

  const [activeTab, setActiveTab] = useState<"info" | "chart">("chart");
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");

  const asset = hydrated ? getAssetById(params.id as string) : null;

  if (!hydrated) {
    return (
      <div className="px-6 pt-14 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-24 mx-auto" />
        <div className="h-12 bg-gray-200 rounded w-40 mx-auto" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="px-6 pt-20 text-center">
        <p className="text-gray-400">Asset not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-loop-600 font-semibold"
        >
          Go back
        </button>
      </div>
    );
  }

  const positive = asset.changePercent >= 0;
  const perf = asset.performance;

  return (
    <div className="px-6 pt-10 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Tab Toggle */}
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "info"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400"
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "chart"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400"
            }`}
          >
            Chart
          </button>
        </div>

        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <X className="w-4.5 h-4.5 text-gray-600" />
        </button>
      </div>

      {/* Asset Info */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl mx-auto mb-3">
          {asset.icon}
        </div>
        <h1 className="text-base font-semibold text-gray-500 mb-2">
          {asset.name}
        </h1>
        <p className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
          {formatCurrency(asset.price)}
        </p>
        <div className="flex items-center justify-center gap-2">
          <span
            className={`flex items-center gap-1 text-sm font-semibold ${
              positive ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {positive ? "+" : ""}
            {asset.change.toFixed(2)} ({formatPercent(asset.changePercent)})
          </span>
          <span className="text-sm text-gray-400">Today</span>
        </div>
      </div>

      {/* Performance Grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { label: "Week", value: perf.week },
          { label: "Month", value: perf.month },
          { label: "6 Month", value: perf.sixMonth },
          { label: "1 Year", value: perf.year },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-[11px] text-gray-400 mb-1">{item.label}</p>
            <p
              className={`text-sm font-bold ${
                item.value >= 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {formatPercent(item.value)}
            </p>
          </div>
        ))}
      </div>

      {activeTab === "chart" ? (
        <>
          {/* Chart */}
          <div className="mb-4 -mx-2">
            <SimpleChart data={asset.chartData} positive={positive} />
          </div>

          {/* Time Range */}
          <div className="flex justify-center gap-1 mb-8">
            {TIME_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  timeRange === range
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* Info Tab */
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Market Cap", value: asset.marketCap || "—" },
              { label: "Volume", value: asset.volume || "—" },
              {
                label: "52W High",
                value: asset.high52w ? formatCurrency(asset.high52w) : "—",
              },
              {
                label: "52W Low",
                value: asset.low52w ? formatCurrency(asset.low52w) : "—",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-2xl p-4"
              >
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trade Button */}
      <button className="w-full py-4 bg-navy text-white font-semibold rounded-2xl hover:bg-navy-light transition-all active:scale-[0.98] shadow-lg shadow-navy/30">
        Trade
      </button>
    </div>
  );
}
