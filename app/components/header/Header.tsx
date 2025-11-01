'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './header.module.scss'

export default function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // close if click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!mobileMenuRef.current) return
      if (!mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    if (mobileOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  const shortName = session?.user?.name ? session.user.name.split(' ')[0] : ''

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Left: logo */}
        <div className={styles.left}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.png"
              alt="Bachata Constructor"
              width={107}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Center navigation (visible on desktop) */}
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

        {/* Right area */}
        <div className={styles.right}>
          {/* Desktop view: if not session -> show sign-in button; if session -> show greeting + sign out */}
          <div className={styles.desktopOnly}>
            {!session ? (
              <button className={styles.signInBtn} onClick={() => signIn('google')}>
                Увійти з Google
              </button>
            ) : (
              <div className={styles.userBlock}>
                <span className={styles.greeting}>Привіт, {shortName}!</span>
                <button className={styles.signOutBtn} onClick={() => signOut()}>
                  Вийти
                </button>
              </div>
            )}
          </div>

          {/* Mobile / Tablet: left logo already shown; here on right show either sign-in or greeting + burger */}
          <div className={styles.mobileOnly} ref={mobileMenuRef}>
            {!session ? (
              <button className={styles.signInBtn} onClick={() => signIn('google')}>
                Увійти
              </button>
            ) : (
              <>
                <div className={styles.greetingShort}>Привіт, {shortName}!</div>
                <button
                  className={`${styles.burger} ${mobileOpen ? styles.open : ''}`}
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
                  onClick={() => setMobileOpen((s) => !s)}>
                  <span />
                  <span />
                  <span />
                </button>

                {/* dropdown (appears under header) */}
                <div
                  className={`${styles.mobileDropdown} ${mobileOpen ? styles.show : ''}`}
                  role="menu">
                  <Link href="/" role="menuitem" className={pathname === '/' ? styles.active : ''}>
                    Головна
                  </Link>
                  <Link
                    href="/lessons"
                    role="menuitem"
                    className={pathname === '/lessons' ? styles.active : ''}>
                    Уроки
                  </Link>
                  <Link
                    href="/randomizer"
                    role="menuitem"
                    className={pathname === '/randomizer' ? styles.active : ''}>
                    Генератор комбінацій
                  </Link>
                  <Link
                    href="/choreo"
                    role="menuitem"
                    className={pathname === '/choreo' ? styles.active : ''}>
                    Хореографія
                  </Link>
                  <button className={styles.logoutMobile} onClick={() => signOut()}>
                    Вийти
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
