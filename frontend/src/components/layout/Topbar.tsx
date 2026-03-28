'use client'

import { useState } from 'react'
import { LanguageSelector } from '@/components/settings/LanguageSelector'

export function Topbar() {
  const [language, setLanguage] = useState('pidgin')

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-slate-950/40 backdrop-blur-md flex justify-end items-center px-8 gap-6">
      <LanguageSelector currentLanguage={language} onChange={setLanguage} />
      <img
        alt="User Avatar"
        className="w-8 h-8 rounded-full border border-primary/20 cursor-pointer"
        src="https://lh3.googleusercontent.com/a/ACg8ocInmJwVyNf3LrkC9hTyMkmjto9hoY8ay6rGSKCiByM0cjDZwuo=s96-c"
      />
    </header>
  )
}
