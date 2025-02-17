import { ComponentPropsWithoutRef, FC } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'
import { Loader } from '../Loader'
import { Icon } from '../Icon'
import { Flex } from '../Flex'
import { IconName } from '../Icon/Icon'

// TODO: divide variant into variant and kind
interface Props extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary-filled' | 'primary-ghost' | 'secondary'
  isLoading?: boolean
  icon?: IconName
}

export const Button: FC<Props> = ({
  variant = 'primary-filled',
  isLoading = false,
  disabled,
  type = 'button',
  children,
  icon,
  ...props
}) => {
  const styleVariant = styles[`Button--${variant}`]

  return (
    <button
      type={type}
      className={classNames(styles.Button, styleVariant, { [styles.isLoading]: isLoading })}
      disabled={disabled || isLoading}
      {...props}
    >
      <Flex space={3} alignItems="center">
        {icon ? <Icon name={icon} className={styles.Icon} /> : null}

        {children ? <span className={styles.Children}>{children}</span> : null}
      </Flex>

      {isLoading ? <Loader /> : null}
    </button>
  )
}
