'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.scss'
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      {!session ? (
        <>
          <div>
            <Link href="/">
              <Image
                className={styles.logo}
                src="/images/logo.png"
                width="107"
                height="50"
                alt="Bachata Constructor"
                priority
              />
            </Link>
          </div>
          <button className={styles.study_btn} onClick={() => signIn('google')}>
            Увійти з Google, щоб розпочати навчання
          </button>
        </>
      ) : (
        <>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Bachata Constructor"
                width="107"
                height="50"
                priority
              />
            </Link>
          </div>
          <nav className={styles.nav}>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Головна
            </Link>
            <Link href="/lessons" className={pathname === '/lessons' ? styles.active : ''}>
              Уроки
            </Link>
            <Link href="/randomizer" className={pathname === '/randomizer' ? styles.active : ''}>
              Генератор комбінацій
            </Link>
            <Link href="/choreo" className={pathname === '/choreo' ? styles.active : ''}>
              Хореографія
            </Link>
          </nav>
          <div className={styles.signout}>
            <p>Привіт, {session.user?.name}!</p>
            <button onClick={() => signOut()} className="">
              Вийти
            </button>
          </div>
        </>
      )}
    </header>
  )
}
