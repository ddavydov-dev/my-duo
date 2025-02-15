import classnames from 'classnames'
import { useMemo, type ElementType, type FC } from 'react'

import { DEFAULT_TAG } from './Flex.consts'
import styles from './Flex.module.scss'
import type { FlexPropsType } from './Flex.types'
import { getModifierClassName } from '@/shared/utils/getModifierClassName'

export const Flex: FC<FlexPropsType> = ({
  as,
  className,
  isFluid,
  isInline,
  children,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  flexShrink,
  flexGrow,
  flexBasis,
  order,
  alignSelf,
  space,
  ...props
}) => {
  const [spaceAll, spaceColumn, spaceRow] = useMemo(() => {
    const isArray = Array.isArray(space)

    return [
      isArray ? undefined : space,
      (isArray && space[0]) || undefined,
      (isArray && space[1]) || undefined
    ]
  }, [space])

  const Element = (as ?? DEFAULT_TAG) as ElementType

  return (
    <Element
      className={classnames(
        styles.Flex,
        getModifierClassName(styles, 'space', spaceAll),
        getModifierClassName(styles, 'spaceColumn', spaceColumn),
        getModifierClassName(styles, 'spaceRow', spaceRow),
        { [styles.isFluid]: isFluid },
        { [styles.isInline]: isInline },
        className
      )}
      style={{
        flexDirection,
        flexWrap,
        justifyContent,
        alignItems,
        flexShrink,
        flexGrow,
        flexBasis,
        order,
        alignSelf
      }}
      {...props}
    >
      {children}
    </Element>
  )
}
