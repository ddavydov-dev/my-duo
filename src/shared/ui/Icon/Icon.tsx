import { FC } from 'react'
import classNames from 'classnames'

import styles from './Icon.module.scss'

export type IconName =
  | 'github'
  | 'google'
  | 'close'
  | 'learn'
  | 'constructor'
  | 'profile'
  | 'messageTriangle'

// TODO: find a better solution
const iconViewBoxes: Record<IconName, { width: number; height: number }> = {
  github: {
    width: 24,
    height: 24
  },
  google: {
    width: 20,
    height: 21
  },
  close: {
    width: 16,
    height: 16
  },
  learn: {
    width: 32,
    height: 32
  },
  constructor: {
    width: 32,
    height: 32
  },
  profile: {
    width: 32,
    height: 32
  },
  messageTriangle: {
    width: 18,
    height: 20
  }
}

interface IconPropsType {
  name: IconName
  // color?: 'primary' | 'secondary'
  className?: string
}

export const Icon: FC<IconPropsType> = ({ name, className }) => (
  <svg
    className={classNames(styles.Icon, className)}
    width={iconViewBoxes[name].width}
    height={iconViewBoxes[name].height}
  >
    <use href={`#${name}`} />
  </svg>
)
