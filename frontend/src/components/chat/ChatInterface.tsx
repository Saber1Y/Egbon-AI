"use client";

import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatInterface() {
  return (
    <div className="flex flex-col h-full bg-surface-dim overflow-hidden">
      <div className="flex-1 min-h-0 overflow-auto">
        <ChatMessages />
      </div>
      <div className="flex-shrink-0">
        <ChatInput />
      </div>
    </div>
  );
}
