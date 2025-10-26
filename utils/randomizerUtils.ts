import { Step, Hand } from '@/types/types'

/** Возвращает случайный элемент из массива */
export const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/** Возвращает n уникальных случайных шагов */
export const getRandomUniqueSteps = (steps: Step[], count: number): Step[] => {
  if (count >= steps.length) return [...steps]
  const selected: Step[] = []
  while (selected.length < count) {
    const candidate = getRandom(steps)
    if (!selected.some((s) => s.id === candidate.id)) selected.push(candidate)
  }
  return selected
}

/**
 * Универсальный фильтр для рук:
 * - Проверяет все выбранные шаги
 * - Исключает руки, у которых есть несовместимость хотя бы с одним шагом
 */
export const filterHandsBySteps = (steps: Step[], hands: Hand[]): Hand[] => {
  if (!steps.length || !hands.length) return hands

  return hands.filter((hand) => {
    // Если хотя бы один шаг несовместим с этой рукой — исключаем
    const hasConflict = steps.some((step) => hand.incompatible.includes(step.id))
    return !hasConflict
  })
}
