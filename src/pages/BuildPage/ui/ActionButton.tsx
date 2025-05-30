import { FC, ReactNode, useRef, useState } from 'react'
import Icon from '@/shared/ui/Icon'
import { Action } from './ActionGroup'
import useOnClickOutside from '@/shared/hooks/useOnClickOutside'
import { createPortal } from 'react-dom'

export const ActionButton: FC<Action> = ({ icon, tooltip, onClick, menu }) => {
  const [pos, setPos] = useState<[number, number] | null>(null)
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (menu) {
      const { x, y, width } = e.currentTarget.getBoundingClientRect()
      setPos([x + width, y])
    }
    onClick?.()
  }
  return (
    <>
      <button
        onClick={handle}
        className="relative grid place-content-center w-6 h-6 rounded hover:bg-gray-200 transition group cursor-pointer"
      >
        <Icon name={icon} />
        <span className="absolute left-full ml-2 top-1/2 whitespace-nowrap text-xs rounded px-2 py-1 bg-gray-700 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition pointer-events-none">
          {tooltip}
        </span>
      </button>
      {pos && menu && (
        <OptionsModal coordinates={pos} onClose={() => setPos(null)}>
          {menu}
        </OptionsModal>
      )}
    </>
  )
}

interface OptionsModalProps {
  coordinates: [number, number]
  onClose: VoidFunction
  children: ReactNode
}

function OptionsModal({ coordinates, onClose, children }: OptionsModalProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(ref, onClose)

  return createPortal(
    <div
      ref={ref}
      className="p-3 border-2 border-swan bg-white rounded-lg z-[999] fixed"
      style={{ left: coordinates[0], top: coordinates[1] }}
    >
      {children}
    </div>,
    document.body
  )
}
