"use client";

import Link from "next/link";
import type { Asset } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

function MiniChart({ data, positive }: { data: number[]; positive: boolean }) {
  const width = 80;
  const height = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - 4 - ((v - min) / range) * (height - 8);
      return `${x},${y}`;
    })
    .join(" ");

  const color = positive ? "#10B981" : "#EF4444";

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function AssetRow({ asset }: { asset: Asset }) {
  const positive = asset.changePercent >= 0;

  return (
    <Link
      href={`/asset/${asset.id}`}
      className="flex items-center gap-3 py-3.5 px-1 hover:bg-gray-50 rounded-xl transition"
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0">
        {asset.icon}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{asset.symbol}</p>
        <p className="text-xs text-gray-400 truncate">{asset.name}</p>
      </div>

      {/* Mini chart */}
      <MiniChart
        data={asset.chartData.slice(-15)}
        positive={positive}
      />

      {/* Price */}
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-gray-900">
          {formatCurrency(asset.price)}
        </p>
        <p
          className={`text-xs font-medium ${
            positive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {formatPercent(asset.changePercent)}
        </p>
      </div>
    </Link>
  );
}
