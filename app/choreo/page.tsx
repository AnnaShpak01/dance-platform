'use client'

import { useState } from 'react'
import { choreo } from '@/data/choreo'
import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import styles from './choreopage.module.scss'
import { lessonSchedule } from '@/data/lessonschedule'
import { FaArrowDown } from 'react-icons/fa'

export default function ChoreoPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('')

  const lastLessonDate = new Date(lessonSchedule[lessonSchedule.length - 1].openDate)
  const choreographyOpenDate = new Date(lastLessonDate)
  choreographyOpenDate.setDate(choreographyOpenDate.getDate() + 3)

  const now = new Date()
  const isChoreoAvailable = now >= choreographyOpenDate

  const greetingVideo = choreo.find((c) => c.level === 'all')
  const selectedVideo = choreo.find((c) => c.level === selectedLevel)

  return (
    <div className={styles.choreoPage}>
      <div className="container">
        <div className={styles.wrapper}>
          {!isChoreoAvailable ? (
            <div className={styles.locked}>
              <div className={styles.lockIcon}>🔒</div>
              <p>💃 Хореографія стане доступною після проходження всіх уроків!</p>
              <span>
                Відкриття —{' '}
                {choreographyOpenDate.toLocaleDateString('uk-UA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <div className={styles.heart}>❤️</div>
              <p className={styles.soon}>Ще трішки терпіння...</p>
            </div>
          ) : (
            <>
              {greetingVideo && (
                <div className={styles.greetingBlock}>
                  <h2 className={styles.title}>Хореографія</h2>
                  <p>
                    Вітаю! Сьогодні пропоную вам спробувати вивчити мою хореографію, яку я
                    підготувала для вас на основі пройденого матеріалу. Спочатку перегляньте
                    невеличке інтро, а потім оберіть рівень складності, з яким проходите цей курс.
                    Ваше домашнє завдання - записати відео з виконанням хореографії вашого рівня
                    складності (вивчити можете всі, але для зарахування домашки достатньо однієї)
                  </p>
                  <VideoPlayer
                    url={greetingVideo.videoUrl}
                    title={greetingVideo.title}
                    className={styles.video}
                  />
                </div>
              )}

              <div className={styles.selectorBlock}>
                <label htmlFor="levelSelect" className={styles.label}>
                  Оберіть рівень складності:
                </label>

                <select
                  id="levelSelect"
                  className={styles.select}
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}>
                  <option value="">-- Оберіть рівень --</option>
                  <option value="beginner">Початковий (Beginners)</option>
                  <option value="intermediate">Середній (Intermediate)</option>
                  <option value="advance">Високий (Advance)</option>
                  <option value="kamikaze">Камікадзе (Kamikaze)</option>
                </select>
              </div>

              {selectedVideo && (
                <div className={styles.videoBlock}>
                  <h3 className={styles.subtitle}>{selectedVideo.title}</h3>
                  <VideoPlayer
                    url={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    className={styles.video}
                  />
                  <div className={styles.musicBlock}>
                    <p className={styles.description}>
                      🎵 Фрагмент музики для хореографії цього рівня:
                      <a
                        href={selectedVideo.musicFragment}
                        download
                        className={styles.downloadButton}>
                        <FaArrowDown className={styles.arrow_down} /> Скачати фрагмент
                      </a>
                    </p>
                    <p className={styles.description}>
                      🎶 Повний трек:
                      <a href="/audio/adicto.mp3" download className={styles.downloadButton}>
                        <FaArrowDown className={styles.arrow_down} /> Скачати повний трек
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
