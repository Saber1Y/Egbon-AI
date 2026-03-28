'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

interface ChatInputProps {
  onSend?: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend?.(input)
    setInput('')
  }

  return (
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
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity focus-within:opacity-100" />
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
  )
}
