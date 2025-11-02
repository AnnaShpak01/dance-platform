// randomizer/generateCombo.ts
import { Step, Hand, Complication, ComboResult, Level } from '@/types/types'
import { getRandom, getRandomUniqueSteps, filterHandsBySteps } from '@/utils/randomizerUtils'

const pickDifferentStep = (pool: Step[], excludeId: string): Step | undefined => {
  const filtered = pool.filter((s) => s.id !== excludeId)
  if (!filtered.length) return undefined
  return getRandom(filtered)
}

const ensureUniquePair = (first: Step, second: Step, pool: Step[]): [Step, Step] => {
  if (first.id !== second.id) return [first, second]
  const alt = pickDifferentStep(pool, first.id)
  if (alt) return [first, alt]
  const altFirst = pickDifferentStep(pool, second.id)
  if (altFirst) return [altFirst, second]
  return [first, second]
}

const isCounter = (s: Step | undefined) => !!s && s.category === 'counterpropulsion'
const isWave = (s: Step | undefined) => !!s && s.category === 'wave'

/**
 * Enforce compatibility rule:
 * - if neither is counterpropulsion => keep as is
 * - if at least one is counterpropulsion => result must be either:
 *    - two steps from pool of (counterpropulsion | wave) (preferred), OR
 *    - two steps from pool of non-counterpropulsion (fallback), OR
 *    - two identical steps from the only available valid group (last resort)
 */
const enforceCounterCompatibility = (a: Step, b: Step, pool: Step[]): [Step, Step] => {
  if (!isCounter(a) && !isCounter(b)) return [a, b]

  const validCounterPool = pool.filter(
    (s) => s.category === 'counterpropulsion' || s.category === 'wave'
  )
  if (validCounterPool.length >= 2) {
    const [s1, s2] = getRandomUniqueSteps(validCounterPool, 2)
    return [s1, s2]
  }

  // if not enough counter/wave, try to use non-counter steps (preferable to mixed pair)
  const nonCounterPool = pool.filter((s) => s.category !== 'counterpropulsion')
  if (nonCounterPool.length >= 2) {
    const [s1, s2] = getRandomUniqueSteps(nonCounterPool, 2)
    return [s1, s2]
  }

  // edge cases: if we have exactly 1 validCounter and no other options -> duplicate it
  if (validCounterPool.length === 1) {
    return [validCounterPool[0], validCounterPool[0]]
  }

  // if only one non-counter exists, duplicate it
  if (nonCounterPool.length === 1) {
    return [nonCounterPool[0], nonCounterPool[0]]
  }

  // fallback: return original pair (should be rare)
  return [a, b]
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

  // --- BEGINNER ---
  if (level === 'beginner') {
    const [step] = getRandomUniqueSteps(availableSteps, 1)
    const allowedHands = filterHandsBySteps([step], availableHands)
    return { steps: [step], hands: [getRandom(allowedHands)] }
  }

  // --- INTERMEDIATE ---
  if (level === 'intermediate') {
    let [firstStep, secondStep] = getRandomUniqueSteps(availableSteps, 2)

    if (!secondStep) {
      secondStep = pickDifferentStep(availableSteps, firstStep.id) || firstStep
    }

    // apply counter compatibility enforcement (will adjust pair to avoid mixed normal+counter)
    ;[firstStep, secondStep] = enforceCounterCompatibility(firstStep, secondStep, availableSteps)

    // keep uniqueness where possible
    ;[firstStep, secondStep] = ensureUniquePair(firstStep, secondStep, availableSteps)

    const allowedHands = filterHandsBySteps([firstStep, secondStep], availableHands)
    return { steps: [firstStep, secondStep], hands: [getRandom(allowedHands)] }
  }

  // --- ADVANCED ---
  if (level === 'advanced') {
    let comp: Complication | null = null
    let firstStep: Step
    let secondStep: Step

    if (includeComplication && availableComplications.length) {
      comp = getRandom(availableComplications)
      const compatibleIds = comp.validSteps ?? []
      const compatibleSteps = availableSteps.filter((s) => compatibleIds.includes(s.id))
      firstStep = getRandom(compatibleSteps.length ? compatibleSteps : availableSteps)

      // ensure second is not counterpropulsion (as before) but then enforce compatibility again
      const validSecond = availableSteps.filter(
        (s) => s.id !== firstStep.id && s.category !== 'counterpropulsion'
      )
      secondStep = getRandom(validSecond.length ? validSecond : availableSteps)
    } else {
      const pair = getRandomUniqueSteps(availableSteps, 2)
      firstStep = pair[0]
      secondStep = pair[1] ?? (pickDifferentStep(availableSteps, firstStep.id) || firstStep)
    }

    // ALWAYS enforce counter compatibility after selection
    ;[firstStep, secondStep] = enforceCounterCompatibility(firstStep, secondStep, availableSteps)

    // ensure uniqueness where possible
    ;[firstStep, secondStep] = ensureUniquePair(firstStep, secondStep, availableSteps)

    // === HANDS selection (existing smart logic) ===
    const allowedHands = filterHandsBySteps([firstStep, secondStep], availableHands)
    const handsForFirst = filterHandsBySteps([firstStep], availableHands)
    const handsForSecond = filterHandsBySteps([secondStep], availableHands)

    if (twoHands) {
      // init with fallbacks (guaranteed availableHands non-empty earlier)
      const fallback = getRandom(availableHands)
      let firstHand: Hand = fallback
      let secondHand: Hand = fallback

      const hasFirst = handsForFirst.length > 0
      const hasSecond = handsForSecond.length > 0

      if (hasFirst && hasSecond) {
        firstHand = getRandom(handsForFirst)
        const candidate = getRandom(handsForSecond.filter((h) => h.id !== firstHand.id))
        secondHand = candidate ?? getRandom(handsForSecond)
      } else if (hasFirst && !hasSecond) {
        firstHand = getRandom(handsForFirst)
        const others = availableHands.filter((h) => h.id !== firstHand.id)
        secondHand = getRandom(others.length ? others : availableHands)
      } else if (!hasFirst && hasSecond) {
        secondHand = getRandom(handsForSecond)
        const others = availableHands.filter((h) => h.id !== secondHand.id)
        firstHand = getRandom(others.length ? others : availableHands)
      } else {
        firstHand = getRandom(availableHands)
        const others = availableHands.filter((h) => h.id !== firstHand.id)
        secondHand = getRandom(others.length ? others : availableHands)
      }

      // final uniqueness fix
      if (firstHand.id === secondHand.id && availableHands.length > 1) {
        secondHand = getRandom(availableHands.filter((h) => h.id !== firstHand.id))
      }

      return { steps: [firstStep, secondStep], hands: [firstHand, secondHand], comp }
    } else {
      const allowed = allowedHands.length ? allowedHands : availableHands
      const firstHand = getRandom(allowed)
      return { steps: [firstStep, secondStep], hands: [firstHand], comp }
    }
  }

  // fallback
  return { steps: [], hands: [] }
}
