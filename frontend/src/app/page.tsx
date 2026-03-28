import Link from 'next/link'
import { MessageSquare, Wallet, TrendingUp, Zap, Globe, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-extrabold bg-gradient-to-tr from-indigo-400 via-purple-400 to-indigo-600 bg-clip-text text-transparent font-headline mb-6">
            Oga Wins
          </h1>
          <p className="text-2xl text-slate-300 mb-4">Your Nigerian Web3 Hustler Copilot</p>
          <p className="text-lg text-secondary font-headline mb-8">Abeg, your money don land!</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-indigo-500 transition-colors font-headline"
          >
            <MessageSquare size={24} />
            Start Hustling
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-surface-container-low rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
              <Wallet className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-headline mb-2">Find Bounties</h3>
            <p className="text-slate-400">Scans Superteam for opportunities that match your skills. React, Solidity, Backend - we get you covered.</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="text-secondary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-headline mb-2">Track Rates</h3>
            <p className="text-slate-400">Monitors USDT/NGN across Binance, KuCoin, Bybit. Get alerts when rates hit your target.</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-tertiary/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="text-tertiary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-headline mb-2">Generate Proposals</h3>
            <p className="text-slate-400">AI-powered proposal generation tailored to your skills and past work. Submit faster, win more.</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-8 border border-slate-700 mb-20">
          <h2 className="text-2xl font-bold text-white font-headline mb-6 text-center">Built For Nigerian Devs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Globe className="text-indigo-400 mt-1" size={20} />
              <div>
                <h4 className="text-white font-medium mb-1">Speaks Your Language</h4>
                <p className="text-slate-400 text-sm">Pidgin English, Yoruba, Igbo, Hausa - Oga Wins understands you.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="text-secondary mt-1" size={20} />
              <div>
                <h4 className="text-white font-medium mb-1">Decentralized</h4>
                <p className="text-slate-400 text-sm">Runs on Nosana GPU network. Your AI, your data, your control.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">Powered by ElizaOS + Qwen3.5 on Nosana</p>
        </div>
      </div>
    </div>
  )
}
