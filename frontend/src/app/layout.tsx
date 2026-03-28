import type { Metadata } from 'next'
import {  Sora } from 'next/font/google'
import './globals.css'

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Oga Wins | Nigerian Web3 Hustler Copilot',
  description: 'Your Nigerian web3 hustlers copilot - find bounties, check rates, generate proposals. Abeg, your money don land!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sora.className} font-sora antialiased`} >{children}</body>
    </html>
  )
}
