import { type Action, type Memory, type State, type HandlerCallback } from "@elizaos/core";
import { z } from "zod";

const FetchRatesSchema = z.object({
  threshold: z.number().optional().describe("Alert if rate goes above this NGN value"),
});

interface ExchangeRate {
  exchange: string;
  symbol: string;
  price: number;
  change24h: number;
  timestamp: number;
}

interface RateComparison {
  exchange: string;
  rate: number;
  diff: number;
  recommendation: string;
}

function getSampleRates(): ExchangeRate[] {
  return [
    { exchange: "Binance", symbol: "USDTNGN", price: 1518, change24h: 1.2, timestamp: Date.now() },
    { exchange: "KuCoin", symbol: "USDT-NGN", price: 1515, change24h: 0.8, timestamp: Date.now() },
    { exchange: "Bybit", symbol: "USDTNGN", price: 1522, change24h: 1.5, timestamp: Date.now() },
  ];
}

function analyzeRates(rates: ExchangeRate[], threshold?: number): {
  rates: RateComparison[];
  bestExchange: string;
  bestRate: number;
  thresholdAlert?: string;
} {
  const sorted = [...rates].sort((a, b) => b.price - a.price);
  const best = sorted[0];

  const comparison: RateComparison[] = rates.map((rate) => ({
    exchange: rate.exchange,
    rate: rate.price,
    diff: rate.price - best.price,
    recommendation: rate === best ? "BEST OPTION" : rate.price >= best.price - 5 ? "Close match" : "Not recommended",
  }));

  const result: {
    rates: RateComparison[];
    bestExchange: string;
    bestRate: number;
    thresholdAlert?: string;
  } = {
    rates: comparison,
    bestExchange: best.exchange,
    bestRate: best.price,
  };

  if (threshold && best.price >= threshold) {
    result.thresholdAlert = `Rate alert! USDT has reached ₦${best.price} on ${best.exchange}!`;
  }

  return result;
}

export const fetchRatesAction: Action = {
  name: "FETCH_USDT_RATES",
  description: "Fetch current USDT to Naira exchange rates from Binance, KuCoin, and Bybit",
  similes: ["CHECK_RATE", "USDT_RATE", "NAIRA_RATE", "GET_RATES"],
  validate: async () => true,
  handler: async (
    _runtime,
    _message: Memory,
    _state: State | undefined,
    options: { threshold?: number },
    _callback?: HandlerCallback
  ) => {
    const params = FetchRatesSchema.parse(options);
    const sampleRates = getSampleRates();
    return analyzeRates(sampleRates, params.threshold);
  },
  examples: [
    [
      { name: "user", content: { text: "What's the USDT to Naira rate?" } },
      { name: "Oga Wins", content: { text: "Shey, your money don land o! Let me check the rates for you" } },
    ],
    [
      { name: "user", content: { text: "Where should I sell my USDT?" } },
      { name: "Oga Wins", content: { text: "I go check all the exchanges now. Make we find the best rate!" } },
    ],
  ],
};

export default {
  name: "rate-monitor",
  description: "Monitors USDT to Naira exchange rates",
  actions: [fetchRatesAction],
};
