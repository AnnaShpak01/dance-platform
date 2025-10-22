'use client'

import Link from 'next/link'
import { lessons } from '@/data/lessons'
import { lessonSchedule } from '@/data/lessonschedule'
import styles from './lessonsList.module.scss'
import Image from 'next/image'

export default function LessonsPage() {
  const now = new Date()

  return (
    <main className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.title}>Уроки курсу</h1>

        <div className={styles.grid}>
          {lessons.map((lesson) => {
            const scheduleItem = lessonSchedule.find((item) => item.id === Number(lesson.id))
            const openDate = scheduleItem ? new Date(scheduleItem.openDate) : new Date(0)
            const isAvailable = openDate <= now

            return (
              <div
                key={lesson.id}
                className={`${styles.lessonCard} ${!isAvailable ? styles.locked : ''}`}>
                {isAvailable ? (
                  <Link href={`/lessons/${lesson.id}`} className={styles.cardLink}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={lesson.cover}
                        alt="lesson"
                        width="414"
                        height="232"
                        priority
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.info}>
                      <h3>Урок {lesson.id}</h3>
                    </div>
                  </Link>
                ) : (
                  <div className={styles.lockedContent}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={lesson.cover}
                        alt="lesson"
                        width="414"
                        height="232"
                        priority
                        className={styles.image}
                      />
                      <div className={styles.overlay}>
                        <span className={styles.lockIcon}>🔒</span>
                      </div>
                    </div>
                    <div className={styles.info}>
                      <h3>Урок {lesson.id}</h3>
                      <span>
                        Відкриється{' '}
                        {openDate.toLocaleDateString('uk-UA', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
