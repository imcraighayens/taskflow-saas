export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  memberSince: string;
  verified: boolean;
}

export interface Account {
  id: string;
  userId: string;
  balance: number;
  portfolioValue: number;
  totalGain: number;
  totalGainPercent: number;
  currency: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon: string;
  category: "stock" | "crypto" | "etf";
  chartData: number[];
  performance: {
    week: number;
    month: number;
    sixMonth: number;
    year: number;
  };
  marketCap?: string;
  volume?: string;
  high52w?: number;
  low52w?: number;
}

export interface Holding {
  assetId: string;
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  gain: number;
  gainPercent: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdraw" | "dividend" | "fee";
  assetSymbol?: string;
  assetName?: string;
  amount: number;
  shares?: number;
  price?: number;
  date: string;
  status: "completed" | "pending";
}

export type TabId = "home" | "markets" | "portfolio" | "profile";
export type TimeRange = "1D" | "1W" | "1M" | "6M" | "1Y" | "MAX";
