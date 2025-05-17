import useOnClickOutside from '@/shared/hooks/useOnClickOutside'
import { Button } from '@/shared/ui/Button'
import { ReactNode, ReactElement, FC, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

interface OptionsModalProps {
  coordinates: [number, number]
  onClose: VoidFunction
  children: ReactNode
}

const OptionsModal: FC<OptionsModalProps> = ({ coordinates, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(modalRef, onClose)

  return createPortal(
    <div
      ref={modalRef}
      style={{
        padding: '12px 20px',
        zIndex: 999,
        position: 'absolute',
        left: coordinates[0],
        top: coordinates[1],
        border: '2px solid #E5E5E5',
        backgroundColor: 'white',
        borderRadius: 10
      }}
    >
      {children}
    </div>,
    document.body
  )
}

interface OptionsProps {
  menu: ReactNode
  children: (isHovered: boolean) => ReactElement
}

export const Options: FC<OptionsProps> = ({ menu, children }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [modalPos, setModalPos] = useState<[number, number] | null>(null)

  const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const { x, y, width } = e.currentTarget.getBoundingClientRect()
    setModalPos([x + width, y])
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children(isHovered || Boolean(modalPos))}

      {isHovered && !modalPos && (
        <Button
          icon="settings"
          variant="ghost"
          onClick={openMenu}
          style={{
            position: 'absolute',
            top: 11,
            right: 12,
            height: 20,
            padding: '0 4px',
            borderRadius: 4
          }}
        />
      )}

      {modalPos ? (
        <OptionsModal onClose={() => setModalPos(null)} coordinates={modalPos}>
          {menu}
        </OptionsModal>
      ) : null}
    </div>
  )
}
