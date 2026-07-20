import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'あなたに向いている仕事＆資格診断',
  description: '11の質問で分かる、AI時代でも必要とされるあなたの資質を診断します',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#F7E3DB' }}>{children}</body>
    </html>
  )
}
