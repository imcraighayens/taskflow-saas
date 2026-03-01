export const APP_NAME = "Loop";

export const QUICK_ACTIONS = [
  { id: "invest", label: "Invest", icon: "TrendingUp" },
  { id: "markets", label: "Markets", icon: "BarChart3" },
  { id: "deposit", label: "Deposit", icon: "PlusCircle" },
  { id: "send", label: "Send", icon: "Send" },
  { id: "portfolio", label: "Portfolio", icon: "PieChart" },
  { id: "bills", label: "Bills", icon: "FileText" },
] as const;

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "Home", href: "/home" },
  { id: "markets", label: "Markets", icon: "BarChart3", href: "/markets" },
  { id: "portfolio", label: "Portfolio", icon: "PieChart", href: "/portfolio" },
  { id: "profile", label: "Profile", icon: "User", href: "/profile" },
] as const;

export const TIME_RANGES = ["1D", "1W", "1M", "6M", "1Y", "MAX"] as const;

export const ASSET_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "stock", label: "Stocks" },
  { id: "crypto", label: "Crypto" },
  { id: "etf", label: "ETFs" },
] as const;
