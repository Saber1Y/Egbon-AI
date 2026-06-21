import { useState, useCallback } from 'react';

export interface ElizaMessage {
  id: string;
  sender: 'bot' | 'user';
  time: string;
  content: string;
}

interface ChatResponse {
  reply: string;
}

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

export function useElizaChat() {
  const [messages, setMessages] = useState<ElizaMessage[]>([
    {
      id: '1',
      sender: 'bot',
      time: getTime(),
      content: "Egbon don land! 👋🏿\n\nYour Nigerian web3 hustler don enter. Abeg, make we move! 🚀\n\nWetin you want do?\n• Find bounties\n• Check rates\n• Generate proposal\n\nTell me wia we go start!"
    }
  ]);
  const [isConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{role: string, content: string}[]>([]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: ElizaMessage = {
      id: generateId(),
      sender: 'user',
      time: getTime(),
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    
    const newHistory = [...history, { role: 'user', content: text }];
    setHistory(newHistory);
    setIsLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: newHistory.slice(-6) }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const data: ChatResponse = await response.json();
      const reply = data.reply || 'Egbon no go let you down! Try again abeg.';
      
      setMessages((prev) => [...prev, {
        id: generateId(),
        sender: 'bot',
        time: getTime(),
        content: reply,
      }]);
      
      setHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        id: generateId(),
        sender: 'bot',
        time: getTime(),
        content: error.name === 'AbortError' 
          ? 'Abeg, server dey slow o. Try again small.'
          : 'Abeg, something go wrong. Try again na!'
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [history]);

  return { messages, isConnected, isLoading, sendMessage, sendMessageRealTime: sendMessage };
}