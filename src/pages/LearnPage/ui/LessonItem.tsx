import { UnitStyle, UNIT_STYLE_COLORS } from '@/entities/unit/config/types'
import Icon from '@/shared/ui/Icon'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { CSSProperties, FC, useCallback, useRef, useState } from 'react'

import { Lesson as LessonType } from '@/entities/lesson'
import { Button } from '@/shared/ui/Button'
import useOnClickOutside from '@/shared/hooks/useOnClickOutside'

interface LessonItemProps extends LessonType {
  // TODO: add comments to all props
  position: number
  unitStyle: UnitStyle
  isFirstUncompleted: boolean
}

export const LessonItem: FC<LessonItemProps> = ({
  position,
  id,
  unitStyle,
  isCompleted,
  isFirstUncompleted
}) => {
  const [isOpen, setOpen] = useState(false)

  const unitColor = isFirstUncompleted || isCompleted ? UNIT_STYLE_COLORS[unitStyle] : '#e5e5e5'

  const handleClick = useCallback(() => {
    // localStorage.setItem('activeLessonId', id) // TODO: key should be a constant
    // navigate({ to: `/lesson` })
    setOpen(true)
  }, [setOpen])

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <button
        className={clsx(
          'relative z-0 w-[70px] h-[65px] outline-none bg-none border-none p-0 cursor-pointer transition-transform',
          'hover:[filter:brightness(1.1)] hover:translate-y-[1.5px]',
          'active:translate-y-[8px]',
          '[transform:translateX(-50%)_translateZ(0)]',
          'before:absolute before:left-0 before:top-[28.5px] before:h-2 before:w-full before:z-[-1]',
          'after:absolute after:left-0 after:top-0 after:h-[57px] after:w-full after:z-[-1] after:rounded-[100%]',
          'before:[content:""] after:[content:""]',
          'before:[background:linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(var(--unit-color),var(--unit-color))]',
          'after:[background:var(--unit-color)]',
          'after:[box-shadow:0_8px_0_rgba(0,0,0,0.2),0_8px_0_var(--unit-color)]',
          'hover:before:hidden',
          'hover:after:[box-shadow:0_6.5px_0_rgba(0,0,0,0.2),0_6.5px_0_var(--unit-color)]',
          'active:before:hidden active:after:shadow-none'
        )}
        style={
          {
            left: position,
            '--unit-color': unitColor
          } as CSSProperties
        }
        onClick={handleClick}
      >
        <Icon
          name="lesson"
          className={clsx(
            'absolute top-[11.5px] left-[14px] w-[42px] h-[34px] fill-hare',
            (isCompleted || isFirstUncompleted) && 'fill-white'
          )}
        />
      </button>

      {isOpen && <Modal unitColor={unitColor} id={id} onClose={() => setOpen(false)} />}
    </div>
  )
}

interface ModalProps {
  unitColor: string
  id: string
  onClose: VoidFunction
}

function Modal({ unitColor, id, onClose }: ModalProps) {
  const navigate = useNavigate({ from: '/lesson' })

  const modalRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(modalRef, onClose)

  return (
    <div
      className="absolute left-1/2 top-full z-[1] mt-3 w-[295px] -translate-x-[147.5px] rounded-[15px] text-white"
      style={{ backgroundColor: unitColor }}
      ref={modalRef}
    >
      <div className="flex flex-col p-4 text-center text-[19px] font-bold leading-[1.4]">
        {/** TODO: add real info about challenges left and the current progress */}
        <h1 className="text-left text-[19px] leading-[26.6px]">Rendering engine</h1>
        <p className="text-left text-[17px] font-medium leading-[26.6px]">7 of 9 challenges</p>
        <Button
          onClick={() => {
            localStorage.setItem('activeLessonId', id) // TODO: key should be a constant
            navigate({ to: '/lesson' })
          }}
          className="mt-4 before:bg-amber-400"
        >
          Start + 10 xp
        </Button>
      </div>

      <div className="absolute top-[-8px] left-[calc(50%-15px)] h-[10px] w-[20px] overflow-hidden box-border">
        <div
          className="absolute bg-white"
          style={{
            backgroundColor: unitColor,
            height: '14.14427157px',
            width: '14.14427157px',
            left: '50%',
            transform: 'translateZ(0) rotate(45deg)',
            transformOrigin: 'top left'
          }}
        />
      </div>
    </div>
  )
}
