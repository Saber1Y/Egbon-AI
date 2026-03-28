'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Wallet, TrendingUp, Settings } from 'lucide-react'

const navItems = [
  { name: 'Chat', icon: MessageSquare, href: '/chat' },
  { name: 'Bounties', icon: Wallet, href: '/bounties' },
  { name: 'Rates', icon: TrendingUp, href: '/rates' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-slate-800/50 bg-slate-900/70 backdrop-blur-xl flex flex-col py-8 px-4 z-50">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-extrabold bg-gradient-to-tr from-indigo-400 to-indigo-600 bg-clip-text text-transparent font-headline">
          Oga Wins
        </h1>
        <p className="text-xs text-secondary font-label mt-1">Abeg, your money don land! </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/chat' && pathname === '/')
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'text-indigo-400 font-bold border-r-4 border-indigo-500 bg-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-headline tracking-tight">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300"
        >
          <Settings size={20} />
          <span className="font-headline text-sm">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
