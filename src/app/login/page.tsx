"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ChevronLeft, AtSign, EyeOff, Eye, Phone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const identifier = tab === "email" ? email : phone;
    login(identifier, password);
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-14 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <span className="text-base font-medium text-gray-700">Welcome back</span>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-loop-600 mb-1">
        Log in to your Loop account
      </p>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back!</h1>

      {/* Tab Toggle */}
      <div className="flex bg-gray-100 rounded-full p-1 mb-8">
        <button
          onClick={() => setTab("email")}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
            tab === "email"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setTab("phone")}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
            tab === "phone"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Phone
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-5">
        {/* Email / Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tab === "email" ? "Email" : "Phone"}
          </label>
          <div className="relative">
            <input
              type={tab === "email" ? "email" : "tel"}
              placeholder={
                tab === "email" ? "Enter your email" : "Enter your phone"
              }
              value={tab === "email" ? email : phone}
              onChange={(e) =>
                tab === "email"
                  ? setEmail(e.target.value)
                  : setPhone(e.target.value)
              }
              className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-loop-500/20 focus:border-loop-500 transition"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {tab === "email" ? (
                <AtSign className="w-5 h-5" />
              ) : (
                <Phone className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-loop-500/20 focus:border-loop-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-center pt-1">
          <button className="text-sm font-medium text-gray-500 hover:text-loop-600 transition">
            Forgot password?
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-8 space-y-5">
        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account yet?{" "}
          <button className="font-semibold text-loop-600 hover:text-loop-700 transition">
            Sign up
          </button>
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-loop-600 hover:bg-loop-700 text-white font-semibold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-loop-600/25"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Log in"
          )}
        </button>
      </div>
    </div>
  );
}
