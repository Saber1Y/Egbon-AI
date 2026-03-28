'use client'

import { Icon } from '@/components/ui/Icon'

interface BountyCardProps {
  title: string
  description: string
  value: string
  skills: string[]
  deadline: string
  sponsor?: string
  isHot?: boolean
  onClaim?: () => void
}

export function BountyCard({
  title,
  description,
  value,
  skills,
  deadline,
  sponsor = 'Superteam',
  isHot = false,
  onClaim,
}: BountyCardProps) {
  return (
    <div className="surface-container-highest border-2 border-tertiary rounded-xl p-5 gold-glow relative group">
      {isHot && (
        <div className="absolute top-4 right-4 bg-tertiary/10 text-tertiary text-[10px] font-black px-2 py-1 rounded-md border border-tertiary/30">
          HOT BOUNTY
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-headline font-extrabold text-lg text-white">{title}</h4>
          <p className="text-sm text-slate-400">{description}</p>
          {sponsor && <p className="text-xs text-slate-500 mt-1">by {sponsor}</p>}
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-secondary-fixed font-headline">{value}</p>
          <p className="text-[10px] text-slate-500 font-label uppercase">USDT Est.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
        <div className="flex items-center gap-2 text-error text-xs font-bold">
          <Icon name="schedule" />
          <span>{deadline}</span>
        </div>
        <button
          className="bg-tertiary text-on-tertiary font-black px-4 py-2 rounded-lg text-xs hover:scale-105 transition-transform font-headline"
          onClick={onClaim}
        >
          Claim Now
        </button>
      </div>
    </div>
  )
}
