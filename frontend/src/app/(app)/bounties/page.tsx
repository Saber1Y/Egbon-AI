'use client'

import { BountyCard } from '@/components/bounties/BountyCard'

const sampleBounties = [
  {
    title: 'Nosana Builders Challenge: ElizaOS',
    description: 'Build your personal AI agent using ElizaOS and deploy on Nosana decentralized GPU network.',
    value: '$3,000',
    skills: ['TypeScript', 'React', 'Backend'],
    deadline: '18 days left',
    sponsor: 'Nosana_AI',
    isHot: true,
  },
  {
    title: 'Ranger Build-A-Bear Hackathon Main Track',
    description: 'Build on Ranger and compete for massive prizes in this blockchain hackathon.',
    value: '$1,000,000',
    skills: ['Frontend', 'Backend', 'Blockchain'],
    deadline: '11 days left',
    sponsor: 'Ranger',
    isHot: true,
  },
  {
    title: 'FliteGrid Content Creation',
    description: 'Create threads and video content for FliteGrid platform.',
    value: '$2,000',
    skills: ['Content', 'Marketing'],
    deadline: '1 day left',
    sponsor: 'FliteGrid',
    isHot: false,
  },
  {
    title: 'ElevenLabs Flows Creator Challenge',
    description: 'Create voice flows using ElevenLabs technology.',
    value: '$600',
    skills: ['AI', 'Voice'],
    deadline: '3 days left',
    sponsor: 'ElevenLabs',
    isHot: false,
  },
  {
    title: 'Custom React Dashboard',
    description: 'Build a custom dashboard for tracking DeFi positions.',
    value: '$500',
    skills: ['React', 'TypeScript', 'Frontend'],
    deadline: 'Open',
    sponsor: 'DeFi Protocol',
    isHot: false,
  },
  {
    title: 'Voble Thread Campaign',
    description: 'Write engaging threads about Voble platform.',
    value: '$200',
    skills: ['Content', 'Social Media'],
    deadline: '4 days left',
    sponsor: 'Voble',
    isHot: false,
  },
]

export default function BountiesPage() {
  return (
    <div className="p-8 h-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white font-headline">Bounties</h1>
          <p className="text-slate-400 mt-2">Find your next gig, oga go bless!</p>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search bounties..."
            className="flex-1 bg-surface-container-low border border-slate-700 rounded-lg px-4 py-3 text-on-surface placeholder:text-slate-500 focus:outline-none focus:border-primary"
          />
          <select className="bg-surface-container-low border border-slate-700 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary">
            <option>All Skills</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Blockchain</option>
            <option>Content</option>
          </select>
          <select className="bg-surface-container-low border border-slate-700 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary">
            <option>All Values</option>
            <option>$100+</option>
            <option>$500+</option>
            <option>$1,000+</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleBounties.map((bounty, index) => (
            <BountyCard key={index} {...bounty} />
          ))}
        </div>
      </div>
    </div>
  )
}
