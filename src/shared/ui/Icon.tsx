import { ComponentPropsWithoutRef } from 'react'

// TODO
const ICON_META = {
  github: { width: 24, height: 24 },
  google: { width: 20, height: 21 },
  close: { width: 16, height: 16 },
  learn: { width: 32, height: 32 },
  constructor: { width: 32, height: 32 },
  profile: { width: 32, height: 32 },
  messageTriangle: { width: 18, height: 20 },
  plus: { width: 13, height: 13 },
  arrow: { width: 6, height: 10 },
  settings: { width: 17, height: 3 },
  lesson: { width: 42, height: 34 },
  exerciseSuccess: { width: 41, height: 29 },
  exerciseFailure: { width: 30, height: 30 },
  edit: { width: 24, height: 24 },
  streak: { width: 25, height: 30 }
} as const

export type IconName = keyof typeof ICON_META

interface PropsType extends ComponentPropsWithoutRef<'svg'> {
  name: IconName
}

export default function Icon({ name, className }: PropsType) {
  return (
    <svg className={className} width={ICON_META[name].width} height={ICON_META[name].height}>
      <use href={`#${name}`} />
    </svg>
  )
}
