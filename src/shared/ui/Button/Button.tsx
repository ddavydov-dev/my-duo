import { ComponentPropsWithoutRef, FC, ReactNode, useState } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'
import { Loader } from '../Loader'
import { Icon } from '../Icon'
import { Flex } from '../Flex'
import { IconName } from '../Icon/Icon'

// TODO: divide variant into variant and kind
interface Props extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary-filled' | 'primary-ghost' | 'secondary' | 'ghost'
  isLoading?: boolean
  icon?: IconName
  isFullWidth?: boolean
  postfix?: ReactNode
}

export const Button: FC<Props> = ({
  variant = 'primary-filled',
  isLoading = false,
  disabled,
  type = 'button',
  children,
  icon,
  isFullWidth = false,
  postfix,
  ...props
}) => {
  const [showPostfix, setShowPostfix] = useState(false)

  const styleVariant = styles[`Button--${variant}`]

  return (
    <button
      type={type}
      className={classNames(styles.Button, styleVariant, {
        [styles.isLoading]: isLoading,
        [styles.isFullWidth]: isFullWidth
      })}
      disabled={disabled || isLoading}
      onMouseOver={() => {
        if (postfix) setShowPostfix(true)
      }}
      onMouseLeave={() => {
        if (postfix) setShowPostfix(false)
      }}
      {...props}
    >
      <Flex space={3} alignItems="center">
        {icon ? <Icon name={icon} className={styles.Icon} /> : null}

        {children ? <span className={styles.Children}>{children}</span> : null}

        {postfix && showPostfix ? <div>{postfix}</div> : null}
      </Flex>

      {isLoading ? <Loader /> : null}
    </button>
  )
}
