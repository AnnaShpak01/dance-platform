import Link from 'next/link'

export default function NotAuthorized() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-3">Схоже, що у вас нема прав доступу</h1>
      <p className="text-gray-600 mb-4">Ваш email не знайдено в списку учасників.</p>
      <Link href="/" className="text-blue-500 underline">
        Повернутись на головну
      </Link>
    </main>
  )
}
