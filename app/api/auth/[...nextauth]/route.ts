import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const allowedEmails = ['starlingelistana@gmail.com']

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Проверка на user.email (хотя Google всегда даёт email)
      if (user?.email && allowedEmails.includes(user.email)) return true
      return '/not-authorized'
    },
    // JWT callback: сохраняем email только если user есть
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
      }
      return token
    },
    // Session callback: присваиваем только если token.email и session.user есть
    async session({ session, token }) {
      if (token?.email && session.user) {
        session.user.email = token.email as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
