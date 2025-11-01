import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'

// Список разрешённых email (дублируем из вашего роута auth)
const allowedEmails = ['anna.shpak.fe@gmail.com', 'starlingelistana@gmail.com', 'elistana@i.ua']

export default withAuth(
  // Middleware функция (здесь можно добавить доп. логику, если нужно)
  function middleware(request: NextRequest) {
    // Пока пустая — NextAuth сам проверит authorized
    console.log('Middleware triggered for:', request.nextUrl.pathname)
  },
  {
    // Callbacks для проверки авторизации
    callbacks: {
      // Проверяем, есть ли токен И email в whitelist
      authorized: ({ token }) => {
        if (!token) return false // Нет сессии — блок
        return allowedEmails.includes(token?.email as string)
      },
    },
    // Редирект на страницу логина, если не авторизован
    pages: {
      signIn: '/api/auth/signin', // Стандартный логин NextAuth
    },
  }
)

// Matcher: применяем только к защищённым роутам
// (исключаем публичные, как /, /api/auth/*)
export const config = {
  matcher: [
    '/lessons',
    '/lessons/:path*',
    '/randomizer',
    '/choreo',
    // Или общий паттерн: '/((?!api|_next/static|_next/image|favicon.ico).*)'
    // Но для вашего случая хватит явных роутов
  ],
}
