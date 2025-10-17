import type { Metadata } from 'next'
import { Tenor_Sans, Philosopher } from 'next/font/google'
import NextAuthProvider from './providers/SessionProvider'
import Header from './components/header/Header'
import './globals.css'

const philosopher = Philosopher({
  variable: '--font-philosopher',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const tenorSans = Tenor_Sans({
  variable: '--font-tenor-sans',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Bachata Constructor',
  description: 'Онлайн-курс бачати у форматі гри 💃',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body
        // className={`${geistSans.variable} ${geistMono.variable}  ${tenorSans.variable} antialiased`}>
        className={`${tenorSans.variable} ${philosopher.variable} antialiased`}>
        <NextAuthProvider>
          <Header />
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  )
}
