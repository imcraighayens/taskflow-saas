"use client";

import { useRouter } from "next/navigation";
import { useHydration } from "@/hooks/useHydration";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChevronRight,
  ShieldCheck,
  Bell,
  CreditCard,
  HelpCircle,
  FileText,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Info", color: "bg-loop-50 text-loop-600" },
      { icon: ShieldCheck, label: "Security", color: "bg-green-50 text-green-600" },
      { icon: CreditCard, label: "Payment Methods", color: "bg-purple-50 text-purple-600" },
      { icon: Bell, label: "Notifications", color: "bg-orange-50 text-orange-600" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", color: "bg-blue-50 text-blue-600" },
      { icon: FileText, label: "Legal & Privacy", color: "bg-gray-100 text-gray-600" },
      { icon: Settings, label: "App Settings", color: "bg-gray-100 text-gray-600" },
    ],
  },
];

export default function ProfilePage() {
  const hydrated = useHydration();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!hydrated) {
    return (
      <div className="px-6 pt-14 animate-pulse space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-100 rounded w-40" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-14 pb-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      {/* User Card */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-loop-500 to-loop-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {user?.firstName?.[0]}
          {user?.lastName?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-gray-900">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-gray-400 truncate">{user?.email}</p>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          <span className="text-[11px] font-semibold text-green-600">
            Verified
          </span>
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
            {section.title}
          </h2>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-100 transition text-left ${
                    i > 0 ? "border-t border-gray-100" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-50 hover:bg-red-100 transition mt-4"
      >
        <LogOut className="w-4.5 h-4.5 text-red-500" />
        <span className="text-sm font-semibold text-red-500">Log Out</span>
      </button>

      {/* Version */}
      <p className="text-center text-[11px] text-gray-300 mt-6">
        Loop v1.0.0
      </p>
    </div>
  );
}
