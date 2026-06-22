import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CHAINS, FEATURES, STEPS } from "@/constants";
import {
  HiOutlineTrendingUp,
  HiOutlineSwitchHorizontal,
  HiOutlineSparkles,
  HiOutlineRefresh,
} from "react-icons/hi";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fab6f5]/8 via-transparent to-transparent" />
        <div className="pointer-events-none absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-[#fab6f5]/35 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-[#fab6f5]/20 to-transparent" />

        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Image
            src="/oga-wins.png"
            alt="Egbon AI"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#09090b]/82 via-[#09090b]/38 to-[#09090b]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-[#09090b]/62" />
          <div className="absolute inset-0 bg-[#09090b]/18" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#09090b]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent" />

        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/36 to-[#09090b]/88" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A24] border border-[#2A2A35] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#fab6f5] animate-pulse"></span>
            <span className="text-sm text-[#A0A0B0]">
              Egbon AI • Powered by Eliza + Nosana
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Meet Egbon AI</span>
            <br />
            <span className="text-white">
              Your Nigerian Web3 Hustler Copilot
            </span>
          </h1>

          <p className="text-xl text-[#A0A0B0] max-w-2xl mx-auto mb-10">
            Abeg, your money don land! Egbon AI finds Superteam bounties, tracks
            USDT/NGN rates, generates winning proposals, and speaks Yoruba,
            Igbo, Hausa, and Pidgin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat">
              <Button size="lg" className="glow-blue">
                Start Hustling →
              </Button>
            </Link>
            <Link href="/bounties">
              <Button variant="outline" size="lg">
                View Bounties
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Bounty Sources", value: "Superteam" },
              { label: "Rate Exchanges", value: "3" },
              { label: "Languages", value: "Yoruba + 4" },
              { label: "Stack", value: "ElizaOS + Qwen" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-[#606070]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#12121A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-[#A0A0B0]">
              Egbon AI hustles for you while you focus on shipping
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            id="#howitworks"
          >
            {FEATURES.map((feature, index) => {
              const IconComponent = {
                HiOutlineTrendingUp: HiOutlineTrendingUp,
                HiOutlineSwitchHorizontal: HiOutlineSwitchHorizontal,
                HiOutlineSparkles: HiOutlineSparkles,
                HiOutlineRefresh: HiOutlineRefresh,
              }[feature.icon];

              return (
                <Card key={index} hover className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F7C2FF]/20 to-[#5C67FF]/20 mb-4">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-[#F7C2FF]" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#A0A0B0]">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get Started with Egbon AI
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-[#1A1A24] absolute -top-4 -left-2">
                  {step.number}
                </div>
                <div className="pt-8 pl-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#A0A0B0]">{step.description}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <span className="text-[#5C67FF] text-2xl">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#12121A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What You Can Do Today
            </h2>
            <p className="text-[#A0A0B0]">
              Egbon AI is built for Nigerian devs hustling in web3
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Find Bounties",
                copy: "Search Superteam for opportunities matching React, Solidity, or Community skills.",
              },
              {
                title: "Track USDT/NGN",
                copy: "Monitor live rates across Binance, KuCoin, Bybit and get alerts.",
              },
              {
                title: "Generate Proposals",
                copy: "AI-generated proposals in your voice. Win more bounties, stack more cash.",
              },
              {
                title: "Speak Your Language",
                copy: "Egbon AI understands Pidgin, Yoruba, Igbo, and Hausa natively.",
              },
            ].map((item) => (
              <Card key={item.title} hover>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#A0A0B0]">{item.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Full Workspace Map
            </h2>
            <p className="text-[#A0A0B0]">
              Everything you need to hustle smart in web3
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "/chat",
                label: "Chat",
                copy: "Talk to Egbon AI in Pidgin or any Nigerian language. Get bounty matches and proposals.",
              },
              {
                title: "/bounties",
                label: "Bounties",
                copy: "Browse all active Superteam bounties filtered by your skills.",
              },
              {
                title: "/rates",
                label: "Rates",
                copy: "Track USDT/NGN across multiple exchanges. Set alerts for target rates.",
              },
            ].map((item) => (
              <Card key={item.title} hover>
                <div className="text-xs uppercase tracking-[0.24em] text-[#72738A] mb-3">
                  {item.label}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#A0A0B0]">{item.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1A1A24] to-[#12121A] rounded-3xl p-12 border border-[#2A2A35]">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Hustling?
            </h2>
            <p className="text-[#A0A0B0] mb-8">
              Egbon AI go find your next bounty. Abeg, make we stack!
            </p>
            <Link href="/chat">
              <Button size="lg" className="glow-pink">
                Talk to Egbon AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#2A2A35]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#606070] text-sm">Egbon AI</span>
          </div>
          <div className="text-[#606070] text-sm">
            Built for Nosana x ElizaOS Hackathon 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
