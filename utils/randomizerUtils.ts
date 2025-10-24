import { Step, Hand } from '@/types/types'
import { INVALID_HAND_STEP_IDS, HANDS_NOT_ALLOWED_FOR_INVALID_STEPS } from '@/data/constants'

export const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const getRandomUniqueSteps = (steps: Step[], count: number): Step[] => {
  if (count >= steps.length) return [...steps]
  const selected: Step[] = []
  while (selected.length < count) {
    const candidate = getRandom(steps)
    if (!selected.some((s) => s.id === candidate.id)) selected.push(candidate)
  }
  return selected
}

export const filterHandsBySteps = (steps: Step[], hands: Hand[]): Hand[] => {
  const hasInvalid = steps.some((s) => INVALID_HAND_STEP_IDS.includes(s.id))
  return hasInvalid
    ? hands.filter((h) => !HANDS_NOT_ALLOWED_FOR_INVALID_STEPS.includes(h.id))
    : hands
}
