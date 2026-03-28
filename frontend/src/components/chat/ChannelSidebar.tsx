'use client'

const channels = [
  { name: 'Lagos-Mainnet', message: 'Your money don land!', active: true },
  { name: 'Dev-Hustle', message: 'Who sabi React Native?' },
  { name: 'Alpha-Leaks', message: 'New Airdrop confirm...' },
]

export function ChannelSidebar() {
  return (
    <div className="w-72 border-r border-slate-800/50 flex flex-col bg-surface-container-low/30">
      <div className="p-6">
        <h2 className="text-xl font-headline font-bold text-on-surface">Channels</h2>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar px-3 space-y-1">
        {channels.map((channel) => (
          <div
            key={channel.name}
            className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
              channel.active
                ? 'bg-indigo-500/10 border-l-2 border-indigo-500'
                : 'hover:bg-slate-800/30'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              #
            </div>
            <div>
              <p className={`font-bold text-sm ${channel.active ? 'text-indigo-400' : 'text-slate-300'}`}>
                {channel.name}
              </p>
              <p className="text-xs text-slate-500 truncate w-40">{channel.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
