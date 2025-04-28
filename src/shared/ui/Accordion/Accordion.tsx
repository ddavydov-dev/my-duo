import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon'
import styles from './Accordion.module.scss'
import { Options } from '@/widgets/Constructor/ui/Options'

interface AccordionProps {
  isOpen: boolean
  onToggle: VoidFunction
  title: string
  children: ReactNode
  /** pass the same ReactNode you want in the popup menu */
  options?: ReactNode
}

export const Accordion: FC<AccordionProps> = ({ children, options, isOpen, ...rest }) => {
  return (
    <div
      className={classNames(styles.Accordion, {
        [styles.isOpen]: isOpen
      })}
    >
      {options ? (
        <Options
          menu={options}
          children={isHovered => <Trigger isHovered={isHovered} isOpen={isOpen} {...rest} />}
        />
      ) : (
        <Trigger isOpen={isOpen} {...rest} />
      )}

      {isOpen && <div className={styles.Content}>{children}</div>}
    </div>
  )
}

const Trigger = ({ isOpen, title, onToggle, isHovered = false }) => (
  <button
    type="button"
    className={classNames(styles.Button, { [styles.isHovered]: isHovered })}
    onClick={onToggle}
  >
    <div className={styles.Icon}>
      <Icon name="arrow" />
    </div>
    <span className={styles.Title}>{title}</span>
  </button>
)
