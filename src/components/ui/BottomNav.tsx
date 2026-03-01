"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, BarChart3, PieChart, User } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home, href: "/home" },
  { id: "markets", label: "Markets", icon: BarChart3, href: "/markets" },
  { id: "portfolio", label: "Portfolio", icon: PieChart, href: "/portfolio" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[380px]">
      <div className="bg-navy rounded-full px-4 py-3 flex items-center justify-around shadow-2xl shadow-navy/40">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isActive
                  ? "bg-loop-600 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <span className="text-xs font-semibold">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
