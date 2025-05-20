import { UnitStyle } from '../config/types'
import { useEntity } from '@/shared/useEntity'

export interface CreateUnitArgs {
  title: string
  skillId: string
  order?: number
  style?: UnitStyle
}

export const useUnits = (skillId: string) => useEntity('units', skillId)
