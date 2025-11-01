'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  session?: Session | null
}

export default function NextAuthProvider({ children, session }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
