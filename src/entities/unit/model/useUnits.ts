import { UnitStyle } from '../config/types'
import { useEntity } from '@/shared/useEntity'

// const styles: UnitStyle[] = ['owl', 'macaw', 'starfish', 'fox', 'cardinal', 'betta', 'bee', 'crab']

export interface CreateUnitArgs {
  title: string
  skillId: string
  order?: number
  style?: UnitStyle
}

export const useUnits = (skillId: string) => useEntity('units', skillId)
