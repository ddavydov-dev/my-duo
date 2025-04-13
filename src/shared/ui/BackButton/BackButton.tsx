import { useRouter } from '@tanstack/react-router'

import { Icon } from '../Icon'
import styles from './BackButton.module.scss'

export const BackButton = () => {
  const { history } = useRouter()

  return (
    <div className={styles.BackButton}>
      <button // TODO: use Button component
        onClick={() => history.back()}
        style={{ border: 'none', background: 'transparent' }}
      >
        <Icon name="close" />
      </button>
    </div>
  )
}

export default BackButton
