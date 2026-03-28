'use client'

interface Message {
  id: number
  sender: 'bot' | 'user'
  time: string
  content: string
}

const messages: Message[] = [
  {
    id: 1,
    sender: 'bot',
    time: '10:42 AM',
    content: "Welcome to the refinery, Oga! Abeg, see this one! I don filter the latest high-paying gigs for you today.",
  },
  {
    id: 2,
    sender: 'user',
    time: '11:10 AM',
    content: 'Show me the bounties!',
  },
  {
    id: 3,
    sender: 'bot',
    time: '11:11 AM',
    content: "Here you go! I get 3 ones wey go fit you o! 🚀",
  },
]

export function ChatMessages() {
  return (
    <div className="flex-1  p-8 space-y-8 hide-scrollbar">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
          {msg.sender === 'bot' ? (
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
          <div className={`space-y-3 max-w-2xl ${msg.sender === 'user' ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2 justify-start">
              <span className="font-black font-headline text-indigo-400">
                {msg.sender === 'bot' ? 'OGA WINS' : 'YOU'}
              </span>
              {msg.sender === 'bot' && (
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-label">
                  OFFICIAL
                </span>
              )}
              <span className="text-xs text-slate-500 font-label">{msg.time}</span>
            </div>
            <div
              className={`p-5 rounded-2xl ${
                msg.sender === 'bot'
                  ? 'glass-card rounded-tl-none'
                  : 'bg-primary text-on-primary rounded-tr-none'
              }`}
            >
              <p className="text-on-surface leading-relaxed">{msg.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
