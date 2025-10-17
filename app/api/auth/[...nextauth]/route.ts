import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const allowedEmails = ['anna.shpak.fe@gmail.com', 'starlingelistana@gmail.com', 'elistana@i.ua']

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (allowedEmails.includes(user.email!)) return true
      return '/not-authorized'
    },
  },
})

export { handler as GET, handler as POST }
