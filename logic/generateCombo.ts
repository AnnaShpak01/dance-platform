import { Step, Hand, Complication, ComboResult, Level } from '@/types/types'
import { getRandom, getRandomUniqueSteps, filterHandsBySteps } from '@/utils/randomizerUtils'

/**
 * Pick a random step from pool that has id !== excludeId.
 * If pool without exclude is empty, returns undefined.
 */
const pickDifferentStep = (pool: Step[], excludeId: string): Step | undefined => {
  const filtered = pool.filter((s) => s.id !== excludeId)
  if (!filtered.length) return undefined
  return getRandom(filtered)
}

/**
 * Ensure first and second are different. If equal, try to replace second with different one.
 * If replacement impossible (pool size 1), keep as is.
 */
const ensureUniquePair = (first: Step, second: Step, pool: Step[]): [Step, Step] => {
  if (first.id !== second.id) return [first, second]

  // Try to pick a different second
  const alt = pickDifferentStep(pool, first.id)
  if (alt) return [first, alt]

  // As fallback, try picking different first
  const altFirst = pickDifferentStep(pool, second.id)
  if (altFirst) return [altFirst, second]

  // no alternative available (pool size is 1) -> return as is
  return [first, second]
}

export const generateCombo = (
  level: Level,
  availableSteps: Step[],
  availableHands: Hand[],
  availableComplications: Complication[],
  includeComplication: boolean,
  twoHands: boolean
): ComboResult => {
  if (!availableSteps.length || !availableHands.length) {
    throw new Error('No available steps or hands')
  }

  // === BEGINNER ===
  if (level === 'beginner') {
    const [step] = getRandomUniqueSteps(availableSteps, 1)
    const allowedHands = filterHandsBySteps([step], availableHands)
    return { steps: [step], hands: [getRandom(allowedHands)] }
  }

  // === INTERMEDIATE ===
  if (level === 'intermediate') {
    let [firstStep, secondStep] = getRandomUniqueSteps(availableSteps, 2)

    // if pool gave only one, try to pick different second explicitly
    if (!secondStep) {
      secondStep = pickDifferentStep(availableSteps, firstStep.id) || firstStep
    }

    // Counterpropulsion / Wave logic
    const isCounter = (s: Step | undefined) => !!s && s.category === 'counterpropulsion'
    if (isCounter(firstStep) || isCounter(secondStep)) {
      const valid = availableSteps.filter(
        (s) => s.category === 'counterpropulsion' || s.category === 'wave'
      )
      if (!isCounter(firstStep))
        firstStep = pickDifferentStep(valid, secondStep.id) || getRandom(valid)
      if (!isCounter(secondStep))
        secondStep = pickDifferentStep(valid, firstStep.id) || getRandom(valid)
    }

    // Ensure uniqueness after all replacements
    ;[firstStep, secondStep] = ensureUniquePair(firstStep, secondStep, availableSteps)

    const allowedHands = filterHandsBySteps([firstStep, secondStep], availableHands)
    return { steps: [firstStep, secondStep], hands: [getRandom(allowedHands)] }
  }

  // === ADVANCED ===
  if (level === 'advanced') {
    let comp: Complication | null = null
    let firstStep: Step
    let secondStep: Step

    if (includeComplication && availableComplications.length) {
      comp = getRandom(availableComplications)
      const compatibleIds = comp.validSteps ?? []
      const compatibleSteps = availableSteps.filter((s) => compatibleIds.includes(s.id))

      firstStep = getRandom(compatibleSteps.length ? compatibleSteps : availableSteps)

      const validSecond = availableSteps.filter(
        (s) => s.id !== firstStep.id && s.category !== 'counterpropulsion'
      )
      secondStep = getRandom(validSecond.length ? validSecond : availableSteps)
    } else {
      const pair = getRandomUniqueSteps(availableSteps, 2)
      firstStep = pair[0]
      secondStep = pair[1] ?? (pickDifferentStep(availableSteps, firstStep.id) || firstStep)

      const isCounter = (s: Step | undefined) => !!s && s.category === 'counterpropulsion'
      if (isCounter(firstStep) || isCounter(secondStep)) {
        const valid = availableSteps.filter(
          (s) => s.category === 'counterpropulsion' || s.category === 'wave'
        )
        if (!isCounter(firstStep))
          firstStep = pickDifferentStep(valid, secondStep.id) || getRandom(valid)
        if (!isCounter(secondStep))
          secondStep = pickDifferentStep(valid, firstStep.id) || getRandom(valid)
      }

      ;[firstStep, secondStep] = ensureUniquePair(firstStep, secondStep, availableSteps)
    }

    const allowedHands = filterHandsBySteps([firstStep, secondStep], availableHands)
    const firstHand = getRandom(allowedHands)
    const secondHand =
      twoHands && allowedHands.length > 1
        ? getRandom(allowedHands.filter((h) => h.id !== firstHand.id))
        : null

    const hands = secondHand ? [firstHand, secondHand] : [firstHand]

    return { steps: [firstStep, secondStep], hands, comp }
  }

  return { steps: [], hands: [] }
}
