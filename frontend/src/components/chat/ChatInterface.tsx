'use client'

import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { LanguageSelector } from '@/components/settings/LanguageSelector'

export function ChatInterface() {
  return (
    <div className="flex-1 flex flex-col relative bg-surface-dim">
      <div className="flex-1 flex flex-col">
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}
