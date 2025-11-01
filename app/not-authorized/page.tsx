import Link from 'next/link'
import styles from './not-auth.module.scss'

export default function NotAuthorized() {
  return (
    <main className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.access}>Схоже, що у вас нема прав доступу</h1>
        <p className={styles.text}>Ваш email не знайдено в списку учасників.</p>
        <Link href="/" className={styles.link}>
          Повернутись на головну
        </Link>
      </div>
    </main>
  )
}
