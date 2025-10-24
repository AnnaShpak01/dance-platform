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

    const randomStep = () => availableSteps[Math.floor(Math.random() * availableSteps.length)]
    const randomHand = () => availableHands[Math.floor(Math.random() * availableHands.length)]
    const randomComp = () =>
      availableComplications[Math.floor(Math.random() * availableComplications.length)]

    // --- Новый результат ---
    let result: any = {}

    // === BEGINNER ===
    if (level === 'beginner') {
      result = { steps: [randomStep()], hands: [randomHand()] }
    }

    // === INTERMEDIATE ===
    if (level === 'intermediate') {
      let firstStep = randomStep()
      let secondStep = randomStep()

      // Убеждаемся, что шаги разные
      while (secondStep.id === firstStep.id) {
        secondStep = randomStep()
      }

      // Проверка counterpropulsion / wave логики
      const isCounter1 = firstStep.category === 'counterpropulsion'
      const isCounter2 = secondStep.category === 'counterpropulsion'

      if (isCounter1 || isCounter2) {
        const validSteps = availableSteps.filter(
          (s) => s.category === 'counterpropulsion' || s.category === 'wave'
        )
        if (!isCounter1) firstStep = validSteps[Math.floor(Math.random() * validSteps.length)]
        if (!isCounter2) secondStep = validSteps[Math.floor(Math.random() * validSteps.length)]
      }

      result = { steps: [firstStep, secondStep], hands: [randomHand()] }
    }

    // === ADVANCED ===
    if (level === 'advanced') {
      let comp = null
      let firstStep, secondStep

      if (includeComplication && availableComplications.length) {
        // === 1. Сначала выбираем усложнение ===
        comp = randomComp()

        // === 2. Мапа совместимости ===
        const compatibilityMap: Record<string, string[]> = {
          '1': ['00', '1', '2', '3', '4', '5', '8', '9', '10', '15'],
          '2': ['00', '1', '2', '3', '9'],
          '3': ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '20'],
          '4': ['00', '1', '3', '4', '5', '6', '7', '20'],
          '5': ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13', '20'],
          '6': ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '13', '20'],
          '7': ['00', '1', '2', '3', '5'],
          '8': ['00', '01', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          '9': ['02', '26', '27', '28', '29'],
        }

        const compId = String(comp.id)
        const allowedSteps = availableSteps.filter((s) => compatibilityMap[compId]?.includes(s.id))

        // === 3. Первый шаг — совместимый ===
        firstStep = allowedSteps[Math.floor(Math.random() * allowedSteps.length)]

        // === 4. Второй шаг — не counterpropulsion и не совпадает с первым ===
        const validSecond = availableSteps.filter(
          (s) => s.id !== firstStep.id && s.category !== 'counterpropulsion'
        )
        secondStep = validSecond[Math.floor(Math.random() * validSecond.length)]
      } else {
        // === Без усложнения — обычная логика ===
        firstStep = randomStep()
        secondStep = randomStep()

        while (secondStep.id === firstStep.id) {
          secondStep = randomStep()
        }

        const isCounter1 = firstStep.category === 'counterpropulsion'
        const isCounter2 = secondStep.category === 'counterpropulsion'

        if (isCounter1 || isCounter2) {
          const validSteps = availableSteps.filter(
            (s) => s.category === 'counterpropulsion' || s.category === 'wave'
          )
          if (!isCounter1) firstStep = validSteps[Math.floor(Math.random() * validSteps.length)]
          if (!isCounter2) secondStep = validSteps[Math.floor(Math.random() * validSteps.length)]
        }
      }

      // === 5. Руки ===
      const hands = [randomHand()]
      if (twoHands) hands.push(randomHand())

      result = { steps: [firstStep, secondStep], hands, comp }
    }

    setCombo(result)
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
