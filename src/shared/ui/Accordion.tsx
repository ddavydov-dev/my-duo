import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { Action, ActionGroup } from '@/pages/BuildPage/ui/ActionGroup'

interface AccordionProps {
  isOpen: boolean
  children: ReactNode
  actions: Action[]
  trigger: ReactNode
}

export const Accordion: FC<AccordionProps> = ({ children, actions = [], isOpen, trigger }) => {
  return (
    <div className="relative flex flex-col gap-3">
      <div
        className={clsx(
          'relative group/header w-full rounded-lg transition-colors',
          isOpen ? 'bg-iguana' : 'bg-white hover:bg-polar'
        )}
      >
        {trigger}

        {actions.length > 0 ? <ActionGroup actions={actions} isOpen={isOpen} /> : null}
      </div>

      {isOpen && <div className="pl-6">{children}</div>}
    </div>
  )
}
