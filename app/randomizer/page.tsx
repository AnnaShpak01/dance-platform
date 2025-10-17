'use client'

import { useState } from 'react'
import steps from '@/data/steps'
import hands from '@/data/hands'
import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import styles from './randomizer.module.scss'

export default function Randomizer() {
  const [combo, setCombo] = useState<{
    step: { id: string; title: string; videoUrl: string; lesson: number }
    hand: { id: string; title: string; videoUrl: string; lesson: number }
  } | null>(null)

  const generate = () => {
    const step = steps[Math.floor(Math.random() * steps.length)]
    const hand = hands[Math.floor(Math.random() * hands.length)]
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
