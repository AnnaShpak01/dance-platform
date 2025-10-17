'use client'

import { useState } from 'react'
import steps from '@/data/steps'
import hands from '@/data/hands'
import { lessonSchedule } from '@/data/lessonschedule'
import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import styles from './randomizer.module.scss'

export default function Randomizer() {
  const [combo, setCombo] = useState<{
    step: { id: string; title: string; videoUrl: string; lesson: number }
    hand: { id: string; title: string; videoUrl: string; lesson: number }
  } | null>(null)

  // --- Получаем список открытых уроков по дате
  const now = new Date()
  const availableLessons = lessonSchedule
    .filter((l) => new Date(l.openDate) <= now)
    .map((l) => l.id)

  // --- Фильтруем шаги и руки по доступным урокам
  const availableSteps = steps.filter((s) => availableLessons.includes(s.lesson))
  const availableHands = hands.filter((h) => availableLessons.includes(h.lesson))

  const generate = () => {
    if (!availableSteps.length || !availableHands.length) {
      alert('Поки що жоден урок не відкрито 😅')
      return
    }

    const step = availableSteps[Math.floor(Math.random() * availableSteps.length)]
    const hand = availableHands[Math.floor(Math.random() * availableHands.length)]
    setCombo({ step, hand })
  }

  return (
    <div className={styles.randomizer}>
      <button onClick={generate} className={styles.button}>
        🎲 Згенерувати комбінацію
      </button>

      {combo && (
        <div className={styles.combo}>
          <div className={styles.block}>
            <h3>Крок №{combo.step.id}</h3>
            <p>{combo.step.title}</p>
            <VideoPlayer url={combo.step.videoUrl} title={combo.step.title} />
          </div>

          <div className={styles.block}>
            <h3>Руки №{combo.hand.id}</h3>
            <p>{combo.hand.title}</p>
            <VideoPlayer url={combo.hand.videoUrl} title={combo.hand.title} />
          </div>
        </div>
      )}
    </div>
  )
}
