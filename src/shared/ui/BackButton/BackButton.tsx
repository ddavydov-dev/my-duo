import { useRouter } from '@tanstack/react-router'

import { Icon } from '../Icon'
import styles from './BackButton.module.scss'
import { FC } from 'react'

interface BackButtonProps {
  onClick?: VoidFunction
}

export const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  const { history } = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      history.back()
    }
  }

  return (
    <button // TODO: use Button component
      onClick={handleClick}
      className={styles.BackButton}
    >
      <Icon name="close" />
    </button>
  )
}

export default BackButton
