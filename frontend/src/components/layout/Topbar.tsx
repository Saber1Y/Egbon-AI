'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { LanguageSelector } from '@/components/settings/LanguageSelector'

export function Topbar() {
  const [language, setLanguage] = useState('pidgin')

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-slate-950/40 backdrop-blur-md flex justify-between items-center px-8">
      <div className="flex items-center gap-4">
        <button className="bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:opacity-80 transition-opacity font-headline">
          Connect Wallet
        </button>
      </div>

      <div className="flex items-center gap-6">
        <LanguageSelector currentLanguage={language} onChange={setLanguage} />
        <img
          alt="User Avatar"
          className="w-8 h-8 rounded-full border border-primary/20 cursor-pointer"
          src="https://lh3.googleusercontent.com/a/ACg8ocInmJwVyNf3LrkC9hTyMkmjto9hoY8ay6rGSKCiByM0cjDZwuo=s96-c"
        />
      </div>
    </header>
  )
}
