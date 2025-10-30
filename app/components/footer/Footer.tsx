'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logoBlock}>
            <Image
              src="/images/logo.png"
              alt="Bachata Constructor"
              width={100}
              height={46}
              priority
            />
          </div>
          <p className={styles.rights}>
            © {new Date().getFullYear()} Bachata Constructor. Усі права захищено.
          </p>
          <div className={styles.socials}>
            <Link
              href="https://instagram.com/anna_shpak_dancer"
              target="_blank"
              aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link href="https://youtube.com/@AnnaShpakDancer" target="_blank" aria-label="YouTube">
              <FaYoutube />
            </Link>
            <Link href="https://facebook.com/anna.shpack" target="_blank" aria-label="Facebook">
              <FaFacebookF />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
