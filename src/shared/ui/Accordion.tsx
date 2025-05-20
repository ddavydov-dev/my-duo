import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import Icon from './Icon'
import { Action, ActionGroup } from '@/pages/BuildPage/ui/ActionGroup'

interface AccordionProps {
  isOpen: boolean
  onToggle: VoidFunction
  title: string
  children: ReactNode
  actions: Action[]
}

export const Accordion: FC<AccordionProps> = ({ children, actions = [], isOpen, ...rest }) => {
  return (
    <div className="relative flex flex-col gap-3">
      <Trigger isOpen={isOpen} actions={actions} {...rest} />
      {isOpen && <div className="pl-6">{children}</div>}
    </div>
  )
}

interface TriggerProps {
  isOpen: boolean
  onToggle: VoidFunction
  title: string
  actions: Action[]
}

function Trigger({ isOpen, title, onToggle, actions }: TriggerProps) {
  const wrapper = clsx(
    'relative group/header w-full rounded-lg transition-colors',
    isOpen ? 'bg-iguana' : 'bg-white hover:bg-polar'
  )

  return (
    <div className={wrapper}>
      <button
        type="button"
        className="flex items-center gap-2 w-full py-3 px-2 cursor-pointer"
        onClick={onToggle}
      >
        <Icon
          name="arrow"
          className={clsx(
            'w-4 transition-transform duration-300',
            isOpen ? 'rotate-90 stroke-active-menu' : 'stroke-hare'
          )}
        />
        <span
          className={clsx(
            'font-semibold text-base truncate',
            isOpen ? 'text-active-menu' : 'text-hare'
          )}
        >
          {title}
        </span>
      </button>

      <ActionGroup actions={actions} />
    </div>
  )
}
