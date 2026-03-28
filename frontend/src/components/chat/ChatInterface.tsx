'use client'

import { ChannelSidebar } from './ChannelSidebar'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { BountyCard } from '@/components/bounties/BountyCard'
import { RateCard } from '@/components/rates/RateCard'

const sampleBounty = {
  title: 'Smart Contract Audit (DeFi)',
  description: 'Verify logic for a new lending protocol on Polygon.',
  value: '$3,200',
  skills: ['Solidity', 'Security', 'Foundry'],
  deadline: '2h 15m remaining',
  sponsor: 'DeFi Labs',
  isHot: true,
}

const sampleRates = [
  { exchange: 'Binance P2P', rate: 1645.2, change: 0.4, isBest: true },
  { exchange: 'KuCoin', rate: 1638.1, change: -0.1 },
  { exchange: 'OKX Exchange', rate: 1641.5, change: 0 },
]

export function ChatInterface() {
  return (
    <div className="flex-1 flex flex-col relative bg-surface-dim">
      <div className="flex-1 flex overflow-hidden">
        <ChannelSidebar />
        <div className="flex-1 flex flex-col relative">
          <ChatMessages />
          
          <div className="p-4 bg-surface-container-low/50 backdrop-blur-xl border-t border-slate-800/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <BountyCard {...sampleBounty} />
              {sampleRates.map((rate) => (
                <RateCard key={rate.exchange} {...rate} />
              ))}
            </div>
          </div>

          <ChatInput />
        </div>
      </div>
    </div>
  )
}
