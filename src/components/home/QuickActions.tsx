"use client";

import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  PlusCircle,
  Send,
  PieChart,
  FileText,
} from "lucide-react";

const actions = [
  { id: "invest", label: "Invest", icon: TrendingUp, href: "/markets", color: "bg-loop-50 text-loop-600" },
  { id: "markets", label: "Markets", icon: BarChart3, href: "/markets", color: "bg-blue-50 text-blue-600" },
  { id: "deposit", label: "Deposit", icon: PlusCircle, href: "/home", color: "bg-green-50 text-green-600" },
  { id: "send", label: "Send", icon: Send, href: "/home", color: "bg-purple-50 text-purple-600" },
  { id: "portfolio", label: "Portfolio", icon: PieChart, href: "/portfolio", color: "bg-orange-50 text-orange-600" },
  { id: "bills", label: "Bills", icon: FileText, href: "/home", color: "bg-rose-50 text-rose-600" },
];

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Quick access</h2>
      <p className="text-sm text-gray-400 mb-4">Explore and earn rewards</p>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all active:scale-95"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${action.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
