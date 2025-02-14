import { FC } from 'react'

export const MenuContainer: FC = ({ children }) => {
  return (
    <div
      style={{ width: '100%', borderTop: '1px solid #dadcde', borderBottom: '2px solid #dadcde' }}
    >
      {children}
    </div>
  )
}
