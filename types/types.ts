export type StepCategory = 'normal' | 'wave' | 'counterpropulsion' | 'turn' | string

export interface Step {
  id: string
  title: string
  videoUrl: string
  lesson: number
  category: StepCategory
}

export interface Hand {
  id: string
  title: string
  videoUrl: string
  lesson: number
  incompatible: string[]
}

export interface Complication {
  id: string
  title: string
  videoUrl: string
  lesson: number
  validSteps: string[] // ID шагов, к которым подходит усложнение
}

export type Level = 'beginner' | 'intermediate' | 'advanced'

export interface ComboResult {
  steps: Step[]
  hands: Hand[]
  comp?: Complication | null
}
