import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { ChatInterface } from '@/components/chat/ChatInterface'

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 flex overflow-hidden pt-16">
          <ChatInterface />
        </main>
      </div>
    </div>
  )
}
