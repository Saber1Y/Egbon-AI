'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    time: '10:42 AM',
    content: "Welcome to the refinery, Oga! Abeg, see this one! I don filter the latest high-paying gigs for you today.",
    hasBounty: true,
  },
  {
    id: 2,
    sender: 'bot',
    time: '11:05 AM',
    content: 'Your money don land! 🚀 Market dey move fast fast. See the best rates to offramp your USDT to NGN right now:',
    hasRates: true,
  },
  {
    id: 3,
    sender: 'user',
    time: '11:10 AM',
    content: 'Mad! That Binance rate carry weight. Oya, make I claim that Audit bounty sharp-sharp.',
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: input,
      },
    ])
    setInput('')
  }

  return (
    <div className="flex-1 flex flex-col relative bg-surface-dim">
      <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.sender === 'bot' ? (
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  alt="Bot Avatar"
                  className="w-12 h-12 rounded-xl bg-indigo-900/50 p-1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf9AAX6Fw6y4spfu-knfissCIHGpgKI2fKe37LAyu0wfgnQNy0nsmJJ96lJHCPXOM16ORpv5xtJkOLinAUXcMa-uj2MwUHWqO7rSFvXaGNuB937QOG26JlB3_XmBq0jqAdn_ROjyTHb6JvAas7LwUygaJVd7nBCp5nMpUQTcvBwKR-8cwlHn6i4vszSHx8BdlvFPaLY1RoON47aJHdd8NFtjRN7k1qxzNx-VEY_75BG_lKsV2e6rRWSVUW34yg1weE0PRjr5JtA-7G"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-surface-dim rounded-full overflow-hidden">
                  <img
                    alt="Nigerian Flag"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsuxoWzLVqU2qga7JNG95SO9U210njAjxhJF0PJFgt82SqY74-a5RyL9YSrPFqueJpgYbpVHXdKXebRQ38BY2dSEiesJxPcxEPnMYcIr6_3DYXrqDDgCZ_sGntP-etzekxuJjOI-ZvbI3iYqB9rpCF8tl2q8ZQegX1IckuDR_syyKfFJGEvUoWayMD_9PRteHJhEycCM4S1EUkzP7fwV3ZsdFpfXg62Yo8LtM-dBYHo60NGQe5ILGt5aN4iyg0ondMELGEQpN1gFNs"
                  />
                </div>
              </div>
            ) : (
              <img
                alt="User Avatar"
                className="w-12 h-12 rounded-xl border-2 border-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbXndbz9hxgUpCYw1LvCNii_GbT8jytKSYFRbJZPNBB6zA0ohjPpnVcxDsW1c-IHtrnNUtwFLOOJEM34pzEXc6EVf4B8FlIhUo6cTevKwSynMXDzR-wIyb__1JqbCfInirgiNY36VHvQjlY9IQG-D-dthuXsN42i40GQpruYZhsphrMc-Qw77lFHgXzmXrRf44-EVXQRZ8P15Yf-nH69STTeGU52990zl4dHvCEXjZa5z4CWpBHYnZfOkstwizaaatqfPcAy-tAAt6"
              />
            )}
            <div className={`space-y-3 max-w-2xl ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 justify-start">
                <span className="font-black font-headline text-indigo-400">
                  {msg.sender === 'bot' ? 'STACK BOT' : 'YOU'}
                </span>
                {msg.sender === 'bot' && (
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-label">
                    OFFICIAL
                  </span>
                )}
                <span className="text-xs text-slate-500 font-label">{msg.time}</span>
              </div>
              <div
                className={`p-5 rounded-2xl ${
                  msg.sender === 'bot'
                    ? 'glass-card rounded-tl-none'
                    : 'bg-primary text-on-primary rounded-tr-none'
                }`}
              >
                <p className="text-on-surface leading-relaxed">{msg.content}</p>

                {msg.hasBounty && (
                  <div className="mt-4 surface-container-highest border-2 border-tertiary rounded-xl p-5 gold-glow relative">
                    <div className="absolute top-4 right-4 bg-tertiary/10 text-tertiary text-[10px] font-black px-2 py-1 rounded-md border border-tertiary/30">
                      HOT BOUNTY
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-headline font-extrabold text-lg text-white">
                          Smart Contract Audit (DeFi)
                        </h4>
                        <p className="text-sm text-slate-400">
                          Verify logic for a new lending protocol on Polygon.
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-secondary-fixed font-headline">$3,200</p>
                        <p className="text-[10px] text-slate-500 font-label uppercase">USDT Est.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Solidity', 'Security', 'Foundry'].map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
                      <div className="flex items-center gap-2 text-error text-xs font-bold">
                        <Icon name="schedule" />
                        <span>2h 15m remaining</span>
                      </div>
                      <button className="bg-tertiary text-on-tertiary font-black px-4 py-2 rounded-lg text-xs hover:scale-105 transition-transform font-headline">
                        Claim Now
                      </button>
                    </div>
                  </div>
                )}

                {msg.hasRates && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-secondary shadow-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                            B
                          </div>
                          <span className="font-bold text-xs">Binance P2P</span>
                        </div>
                        <span className="bg-secondary/20 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full">
                          BEST RATE
                        </span>
                      </div>
                      <p className="text-2xl font-black font-headline text-white">₦1,645.20</p>
                      <div className="flex items-center gap-1 text-secondary text-[10px] font-bold mt-1">
                        <Icon name="trending_up" />
                        <span>+0.4% (Live)</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                          K
                        </div>
                        <span className="font-bold text-xs">KuCoin</span>
                      </div>
                      <p className="text-2xl font-black font-headline text-white">₦1,638.10</p>
                      <div className="flex items-center gap-1 text-error text-[10px] font-bold mt-1">
                        <Icon name="trending_down" />
                        <span>-0.1%</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                          O
                        </div>
                        <span className="font-bold text-xs">OKX Exchange</span>
                      </div>
                      <p className="text-2xl font-black font-headline text-white">₦1,641.50</p>
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold mt-1">
                        <Icon name="horizontal_rule" />
                        <span>Stable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-surface-container-low/50 backdrop-blur-xl border-t border-slate-800/50">
        <div className="flex items-end gap-4 max-w-5xl mx-auto bg-surface-container-lowest p-2 rounded-2xl">
          <button className="p-3 text-slate-400 hover:text-primary transition-colors">
            <Icon name="add_circle" />
          </button>
          <div className="flex-1 relative">
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-2 resize-none hide-scrollbar font-body text-on-surface"
              placeholder="Type your message here... (e.g., /gas, /rates, /bounties)"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 text-slate-400 hover:text-primary transition-colors">
              <Icon name="mood" />
            </button>
            <button
              className="bg-indigo-600 text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(79,70,229,0.3)]"
              onClick={handleSend}
            >
              <Icon name="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
