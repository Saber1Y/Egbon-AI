'use client'

import { Icon } from '@/components/ui/Icon'

const navItems = [
  { name: 'Chat', icon: 'forum', href: '#', active: true },
  { name: 'Bounties', icon: 'payments', href: '#' },
  { name: 'Rates', icon: 'trending_up', href: '#' },
]

export function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-slate-800/50 bg-slate-900/70 backdrop-blur-xl flex flex-col py-8 px-4 z-50">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-extrabold bg-gradient-to-tr from-indigo-400 to-indigo-600 bg-clip-text text-transparent font-headline">
          Oga Wins
        </h1>
        <p className="text-xs text-secondary font-label mt-1">Abeg, your money don land! </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              item.active
                ? 'text-indigo-400 font-bold border-r-4 border-indigo-500 bg-indigo-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon name={item.icon} filled={item.active} />
            <span className="font-headline tracking-tight">{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300"
        >
          <Icon name="settings" />
          <span className="font-headline text-sm">Settings</span>
        </a>
      </div>
    </aside>
  )
}
