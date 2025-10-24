'use client'

import { useState } from 'react'
import steps from '@/data/steps'
import hands from '@/data/hands'
import complication from '@/data/complications'
import { lessonSchedule } from '@/data/lessonschedule'
import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import styles from './randomizer.module.scss'

type Level = 'beginner' | 'intermediate' | 'advanced'

export default function Randomizer() {
  const [combo, setCombo] = useState<any>(null)
  const [level, setLevel] = useState<Level>('beginner')
  const [includeComplication, setIncludeComplication] = useState(true)
  const [twoHands, setTwoHands] = useState(false)
  const [isRolling, setIsRolling] = useState(false)

  const now = new Date()
  const availableLessons = lessonSchedule
    .filter((l) => new Date(l.openDate) <= now)
    .map((l) => l.id)

  const availableSteps = steps.filter((s) => availableLessons.includes(s.lesson))
  const availableHands = hands.filter((h) => availableLessons.includes(h.lesson))
  const availableComplications = complication.filter((c) => availableLessons.includes(c.lesson))

  const generate = () => {
    if (!availableSteps.length || !availableHands.length) {
      alert('Поки що жоден урок не відкрито 😅')
      return
    }

    setIsRolling(true)
    setCombo(null)

    setTimeout(() => {
      const randomStep = () => availableSteps[Math.floor(Math.random() * availableSteps.length)]
      const randomHand = () => availableHands[Math.floor(Math.random() * availableHands.length)]
      const randomComp = () =>
        availableComplications[Math.floor(Math.random() * availableComplications.length)]

      let result: any = {}

      if (level === 'beginner') {
        result = { steps: [randomStep()], hands: [randomHand()] }
      }

      if (level === 'intermediate') {
        result = { steps: [randomStep(), randomStep()], hands: [randomHand()] }
      }

      if (level === 'advanced') {
        result = {
          steps: [randomStep(), randomStep()],
          hands: twoHands ? [randomHand(), randomHand()] : [randomHand()],
          comp: includeComplication && availableComplications.length ? randomComp() : null,
        }
      }

      setCombo(result)
      setIsRolling(false)
    }, 1500)
  }

  return (
    <div className={styles.randomizer}>
      <div className="container">
        <h1>Генератор комбінацій</h1>
        <h2>🎯 Оберіть рівень складності</h2>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as Level)}
          className={styles.select}>
          <option value="beginner">Початковий</option>
          <option value="intermediate">Середній</option>
          <option value="advanced">Високий</option>
        </select>

        {level === 'advanced' && (
          <div className={styles.checkboxes}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={includeComplication}
                onChange={(e) => setIncludeComplication(e.target.checked)}
              />
              Включити ускладнення
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={twoHands}
                onChange={(e) => setTwoHands(e.target.checked)}
              />
              Дві комбінації рук
            </label>
          </div>
        )}

        <button onClick={generate} className={styles.button}>
          🎲 Згенерувати комбінацію
        </button>

        {isRolling && (
          <div className={styles.diceContainer}>
            <div className={styles.dice}>🎲</div>
          </div>
        )}

        {combo && !isRolling && (
          <div className={styles.combo}>
            {/* 👣 Кроки */}
            {combo.steps.map((step: any, i: number) => (
              <div key={`step-${i}`} className={styles.block}>
                <h3>Крок №{step.id}</h3>
                <p>{step.title}</p>
                <VideoPlayer url={step.videoUrl} title={step.title} />
              </div>
            ))}

            {/* 🤲 Руки */}
            {combo.hands.map((hand: any, i: number) => (
              <div key={`hand-${i}`} className={styles.block}>
                <h3>Руки №{hand.id}</h3>
                <p>{hand.title}</p>
                <VideoPlayer url={hand.videoUrl} title={hand.title} />
              </div>
            ))}

            {/* 💥 Ускладнення */}
            {combo.comp && (
              <div className={styles.block}>
                <h3>🔥 Ускладнення №{combo.comp.id}</h3>
                <p>{combo.comp.title}</p>
                <VideoPlayer url={combo.comp.videoUrl} title={combo.comp.title} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
