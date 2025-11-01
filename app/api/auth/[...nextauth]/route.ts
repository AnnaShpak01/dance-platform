import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const allowedEmails = [
  'starlingelistana@gmail.com',
  'chichibaya@gmail.com',
  'ksanamatrixkonsalt@gmail.com',
  'arwen.vogel@gmail.com',
  'rmonvik@gmail.com',
]

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.email && allowedEmails.includes(user.email)) return true
      return '/not-authorized'
    },
    // JWT callback:
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
      }
      return token
    },
    // Session callback:
    async session({ session, token }) {
      if (token?.email && session.user) {
        session.user.email = token.email as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
