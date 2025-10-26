'use client'

import { useState } from 'react'
import { Step, Hand, Complication, ComboResult, Level } from '@/types/types'
import { lessonSchedule } from '@/data/lessonschedule'
import stepsData from '@/data/steps'
import handsData from '@/data/hands'
import complicationsData from '@/data/complications'
import { generateCombo } from '@/logic/generateCombo'
import VideoPlayer from '@/app/components/videoplayer/VideoPlayer'
import styles from './randomizer.module.scss'

export default function Randomizer() {
  const [combo, setCombo] = useState<ComboResult | null>(null)
  const [level, setLevel] = useState<Level>('beginner')
  const [includeComplication, setIncludeComplication] = useState(false)
  const [twoHands, setTwoHands] = useState(false)
  const [isRolling, setIsRolling] = useState(false)

  const now = new Date()
  const availableLessons = lessonSchedule
    .filter((l) => new Date(l.openDate) <= now)
    .map((l) => l.id)

  const availableSteps = stepsData.filter((s) => availableLessons.includes(s.lesson))
  const availableHands = handsData.filter((h) => availableLessons.includes(h.lesson))
  const availableComplications = complicationsData.filter((c) =>
    availableLessons.includes(c.lesson)
  )

  const handleGenerate = () => {
    if (!availableSteps.length || !availableHands.length) {
      alert('Поки що жоден урок не відкрито 😅')
      return
    }

    setIsRolling(true)
    setTimeout(() => {
      const result = generateCombo(
        level,
        availableSteps,
        availableHands,
        availableComplications,
        includeComplication,
        twoHands
      )
      setCombo(result)
      setIsRolling(false)
    }, 1200)
  }

  const comboClass =
    level === 'beginner' || (level === 'advanced' && (includeComplication || twoHands))
      ? styles.comboTwo
      : styles.comboThree

  return (
    <div className={styles.randomizer}>
      <div className="container">
        <h1>Генератор комбінацій</h1>
        <h2>🎯 Оберіть рівень складності</h2>

        <select
          id="level-select"
          name="level"
          value={level}
          onChange={(e) => {
            setLevel(e.target.value as Level)
            setCombo(null)
          }}
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
                onChange={(e) => {
                  setIncludeComplication(e.target.checked)
                  setCombo(null)
                }}
              />
              Включити ускладнення
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={twoHands}
                onChange={(e) => {
                  setTwoHands(e.target.checked)
                  setCombo(null)
                }}
              />
              Дві комбінації рук
            </label>
          </div>
        )}

        <button onClick={handleGenerate} className={styles.button}>
          🎲 Згенерувати комбінацію
        </button>

        {isRolling && (
          <div className={styles.diceContainer}>
            <div className={styles.dice}>🎲</div>
          </div>
        )}

        {combo && !isRolling && (
          <div className={`${styles.combo} ${comboClass}`}>
            {combo.steps.map((step) => (
              <div key={step.id} className={styles.block}>
                <h3>👣 Крок №{step.id}</h3>
                <p>{step.title}</p>
                <VideoPlayer
                  url={step.videoUrl}
                  title={step.title}
                  className={styles.videoContainer}
                />
              </div>
            ))}

            {combo.hands.map((hand) => (
              <div key={hand.id} className={styles.block}>
                <h3>🤲 Руки №{hand.id}</h3>
                <p>{hand.title}</p>
                <VideoPlayer
                  url={hand.videoUrl}
                  title={hand.title}
                  className={styles.videoContainer}
                />
              </div>
            ))}

            {combo.comp && (
              <div className={styles.block}>
                <h3>🔥 Ускладнення №{combo.comp.id}</h3>
                <p>{combo.comp.title}</p>
                <VideoPlayer
                  url={combo.comp.videoUrl}
                  title={combo.comp.title}
                  className={styles.videoContainer}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
