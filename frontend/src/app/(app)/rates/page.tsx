'use client'

import { RateCard } from '@/components/rates/RateCard'
import { TrendingUp, RefreshCw } from 'lucide-react'

const exchanges = [
  { exchange: 'Binance', rate: 1645.2, change: 0.4, isBest: true },
  { exchange: 'Bybit', rate: 1642.8, change: 0.2, isBest: false },
  { exchange: 'OKX Exchange', rate: 1641.5, change: 0, isBest: false },
  { exchange: 'KuCoin', rate: 1638.1, change: -0.1, isBest: false },
]

export default function RatesPage() {
  return (
    <div className="p-8 h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white font-headline">Market Rates</h1>
          <p className="text-slate-400 mt-2">Your money don land! Track the best USDT to NGN rates.</p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-slate-400 text-sm">Best Rate</p>
              <p className="text-4xl font-black text-white font-headline">₦1,645.20</p>
              <p className="text-secondary text-sm flex items-center gap-1 mt-1">
                <TrendingUp size={16} />
                +0.4% from yesterday
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg hover:bg-indigo-500/30 transition-colors">
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exchanges.map((rate) => (
              <RateCard key={rate.exchange} {...rate} />
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6">
          <h3 className="text-lg font-bold text-white font-headline mb-4">Rate Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-lg">
              <div>
                <p className="text-white font-medium">Alert when rate exceeds</p>
                <p className="text-slate-400 text-sm">Get notified when USDT goes above</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-tertiary font-bold text-xl">₦1,500</span>
                <button className="text-indigo-400 text-sm hover:underline">Edit</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-lg">
              <div>
                <p className="text-white font-medium">Spread alert</p>
                <p className="text-slate-400 text-sm">Alert when exchange spread &gt;</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-tertiary font-bold text-xl">₦5</span>
                <button className="text-indigo-400 text-sm hover:underline">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
