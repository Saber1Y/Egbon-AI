import { ChatInterface } from '@/components/chat/ChatInterface'
import { Topbar } from '@/components/layout/Topbar'

export default function ChatPage() {
  return (
    <div className="flex flex-col ml-64">
      <Topbar />
      <main className="flex-1 flex overflow-hidden pt-16">
        <ChatInterface />
      </main>
    </div>
  )
}
