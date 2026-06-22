"use client";

import { useState } from "react";
import { useElizaChat, type ElizaMessage } from "@/lib/eliza";
import { ChatInput } from "./ChatInput";

function ChatBubble({ message }: { message: ElizaMessage }) {
  return (
    <div className={`flex gap-4 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
      {message.sender === "bot" ? (
        <div className="relative w-12 h-12 flex-shrink-0">
          <img
            alt="Bot Avatar"
            className="w-12 h-12 rounded-xl bg-indigo-900/50 p-1"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf9AAX6Fw6y4spfu-knfissCIHGpgKI2fKe37LAyu0wfgnQNy0nsmJJ96lJHCPXOM16ORpv5xtJkOLinAUXcMa-uj2MwUHWqO7rSFvXaGNuB937QOG26JlB3_XmBq0jqAdn_ROjyTHb6JvAas7LwUygaJVd7nBCp5nMpUQTcvBwKR-8cwlHn6i4vszSHx8BdlvFPaLY1RoON47aJHdd8NFtjRN7k1qxzNx-VEY_75BG_lKsV2e6rRWSVUW34yg1weE0PRjr5JtA-7G"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-surface-dim rounded-full overflow-hidden">
            <img
              alt="Nigerian Flag"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsuxoWzLVqU2qga7JNG95SO9U210njAjxhJF0PJFgt82SqY74-a5RyL9YSrPFqueJpgYbpVHXdKXebRQ38BY2dSEiesJxPcxEPnMYcIr6_3DYXrqDDgCZ_sGntP-etzekxuJjOI-ZvbI3iYqB9rpCF8tl2q8ZQegX1IckuDR_syyKfFJGEvUoWayMD_9PRteHJhEycCM4S1EUkzP7fwV3ZsdFpfXg62Yo8LtM-dBYHo60NGQe5ILGt5aN4iyg0ondMELGEQpN1gFNs"
            />
          </div>
        </div>
      ) : (
        <img
          alt="User Avatar"
          className="w-12 h-12 rounded-xl border-2 border-primary/20"
          src="https://lh3.googleusercontent.com/a/ACg8ocInmJwVyNf3LrkC9hTyMkmjto9hoY8ay6rGSKCiByM0cjDZwuo=s96-c"
        />
      )}
      <div className={`space-y-3 max-w-2xl ${message.sender === "user" ? "text-right" : ""}`}>
        <div className="flex items-center gap-2 justify-start">
          <span className="font-black font-headline text-indigo-400">
            {message.sender === "bot" ? "EGBON AI" : "YOU"}
          </span>
          {message.sender === "bot" && (
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-label">
              AI
            </span>
          )}
          <span className="text-xs text-slate-500 font-label">
            {message.time}
          </span>
        </div>
        <div
          className={`p-5 rounded-2xl ${
            message.sender === "bot"
              ? "glass-card rounded-tl-none"
              : "bg-indigo-600 text-white cursor-pointer rounded-tr-none"
          }`}
        >
          <p className="text-on-surface leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  );
}

export function ChatInterface() {
  const { messages, isConnected, isLoading, sendMessage } = useElizaChat();
  
  const handleSend = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-surface-dim overflow-hidden">
      {/* Connection Status */}
      <div className="px-4 py-2 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-yellow-500"}`} />
          <span className="text-xs text-slate-400">
            {isConnected ? "Connected to Egbon AI" : "Connecting..."}
          </span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-auto p-8 space-y-8">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">Start chatting with Egbon AI!</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-900/50 animate-pulse" />
            <div className="p-5 rounded-2xl glass-card rounded-tl-none">
              <p className="text-on-surface">Egbon dey think...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="flex-shrink-0">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
