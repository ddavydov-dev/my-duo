import { useRouter } from '@tanstack/react-router'

import { Icon } from '../Icon'
import styles from './BackButton.module.scss'

export const BackButton = () => {
  const { history } = useRouter()

  return (
    <button // TODO: use Button component
      onClick={() => history.back()}
      className={styles.BackButton}
    >
      <Icon name="close" />
    </button>
  )
}

export default BackButton
