'use client'

import { Icon } from '@/components/ui/Icon'

export function Topbar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-slate-950/40 backdrop-blur-md flex justify-between items-center px-8">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96">
        <Icon name="search" />
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-outline-variant font-body text-on-surface ml-2"
          placeholder="Search bounties, rates, or devs..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-8">
          <a
            className="text-indigo-400 border-b-2 border-indigo-500 pb-1 font-headline text-sm"
            href="#"
          >
            Network
          </a>
          <a
            className="text-slate-400 hover:text-indigo-300 transition-colors font-headline text-sm"
            href="#"
          >
            Activity
          </a>
        </nav>

        <div className="h-6 w-[1px] bg-slate-800" />

        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-opacity">
            <Icon name="notifications" />
          </button>
          <button className="text-slate-400 hover:text-white transition-opacity">
            <Icon name="grid_view" />
          </button>
          <button className="bg-primary text-on-primary font-bold px-5 py-2 rounded-lg text-sm hover:opacity-80 transition-opacity font-headline">
            Connect Wallet
          </button>
          <img
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-primary/20"
            src="https://lh3.googleusercontent.com/a/ACg8ocInmJwVyNf3LrkC9hTyMkmjto9hoY8ay6rGSKCiByM0cjDZwuo=s96-c"
          />
        </div>
      </div>
    </header>
  )
}
