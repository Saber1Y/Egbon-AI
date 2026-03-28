'use client'

import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'

export function ChatInterface() {
  return (
    <div className="flex flex-col h-full bg-surface-dim">
      <ChatMessages />
      <ChatInput />
    </div>
  )
}
