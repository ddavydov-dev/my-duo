import { Lesson } from '@/entities/lesson'

export type UnitStyle = 'owl' | 'macaw' | 'starfish' | 'fox' | 'cardinal' | 'betta' | 'bee' | 'crab'

export const UNIT_STYLE_COLORS: Record<UnitStyle, string> = {
  owl: '#58CC02',
  macaw: '#1CB0F6',
  starfish: '#FFAADE',
  fox: '#FF9600',
  cardinal: '#FF4B4B',
  betta: '#9069CD',
  bee: '#FFC800',
  crab: '#FF7878'
}

export interface Unit {
  id: string
  skillId: string
  title: string
  order: number
  lessons: Lesson[]
  style: UnitStyle
}
