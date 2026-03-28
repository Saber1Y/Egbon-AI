'use client'

import { useState } from 'react'

interface LanguageSelectorProps {
  currentLanguage: string
  onChange: (lang: string) => void
}

const languages = [
  { code: 'pidgin', name: 'Pidgin', flag: '🇳🇬', description: 'Nigerian Pidgin English' },
  { code: 'yoruba', name: 'Yoruba', flag: '🇳🇬', description: 'Èdè Yorùbá' },
  { code: 'igbo', name: 'Igbo', flag: '🇳🇬', description: 'Asụsụ Igbo' },
  { code: 'hausa', name: 'Hausa', flag: '🇳🇬', description: 'Harshen Hausa' },
  { code: 'english', name: 'English', flag: '🇬🇧', description: 'Standard English' },
]

export function LanguageSelector({ currentLanguage, onChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const current = languages.find((l) => l.code === currentLanguage) || languages[0]

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{current.flag}</span>
        <span className="text-sm font-medium text-on-surface">{current.name}</span>
        <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-surface-container rounded-xl shadow-xl border border-outline-variant overflow-hidden min-w-[200px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high transition-colors text-left ${
                  lang.code === currentLanguage ? 'bg-primary/10 border-l-2 border-primary' : ''
                }`}
                onClick={() => {
                  onChange(lang.code)
                  setIsOpen(false)
                }}
              >
                <span className="text-lg">{lang.flag}</span>
                <div>
                  <p className="text-sm font-medium text-on-surface">{lang.name}</p>
                  <p className="text-[10px] text-slate-400">{lang.description}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
