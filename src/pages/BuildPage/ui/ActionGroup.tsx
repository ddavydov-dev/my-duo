import { FC, ReactNode } from 'react'
import { ActionButton } from './ActionButton'
import { IconName } from '@/shared/ui/Icon'
import clsx from 'clsx'

export interface Action {
  icon: IconName
  tooltip: string
  onClick?: () => void
  menu?: ReactNode // optional per‑action dropdown
}

interface ActionGroupProps {
  actions: Action[]
  isOpen?: boolean
}

export const ActionGroup: FC<ActionGroupProps> = ({ actions, isOpen = false }) => (
  <div
    className={clsx(
      'flex space-x-1 absolute right-2 top-1/2 -translate-y-1/2 z-10 group-hover/header:opacity-100 group-focus-within/header:opacity-100 transition',
      isOpen ? 'opacity-100' : 'opacity-0'
    )}
  >
    {actions.map(a => (
      <ActionButton key={a.tooltip} {...a} />
    ))}
  </div>
)
