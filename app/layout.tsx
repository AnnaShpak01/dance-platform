import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route' // путь к твоей конфигурации
import type { Metadata } from 'next'
import { Tenor_Sans, Philosopher } from 'next/font/google'
import NextAuthProvider from './providers/SessionProvider'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './globals.css'
import ScrollToTop from './components/scrollToTop/ScrollToTop'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="uk">
      <body
        // className={`${geistSans.variable} ${geistMono.variable}  ${tenorSans.variable} antialiased`}>
        className={`${tenorSans.variable} ${philosopher.variable} antialiased`}>
        <NextAuthProvider session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </NextAuthProvider>
      </body>
    </html>
  )
}
