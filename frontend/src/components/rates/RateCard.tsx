"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface RateCardProps {
  exchange: string;
  rate: number;
  change: number;
  isBest?: boolean;
  logo?: string;
}

export function RateCard({
  exchange,
  rate,
  change,
  isBest = false,
  logo,
}: RateCardProps) {
  const isPositive = change >= 0;

  const getLogo = () => {
    if (logo) return logo;
    switch (exchange.toLowerCase()) {
      case "binance":
        return (
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
            B
          </div>
        );
      case "kucoin":
        return (
          <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            K
          </div>
        );
      case "okx":
        return (
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-black">
            O
          </div>
        );
      case "bybit":
        return (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            B
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            {exchange[0]}
          </div>
        );
    }
  };

  return (
    <div
      className={`bg-indigo-500/20 p-4 rounded-xl shadow-lg transition-all ${
        isBest ? "border-l-4 border-secondary" : "border-l-4 border-slate-700"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {getLogo()}
          <span className="font-bold text-white text-xs">{exchange}</span>
        </div>
        {isBest && (
          <span className="bg-secondary/20 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full">
            BEST RATE
          </span>
        )}
      </div>
      <p className="text-2xl font-black font-headline text-white">
        ₦{rate.toLocaleString()}
      </p>
      <div
        className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${
          isPositive ? "text-secondary" : "text-error"
        }`}
      >
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        <span>
          {isPositive ? "+" : ""}
          {change.toFixed(2)}% {isBest ? "(Live)" : ""}
        </span>
      </div>
    </div>
  );
}
