import { UnitStyle, UNIT_STYLE_COLORS } from '@/entities/unit/config/types'
import { Icon } from '@/shared/ui/Icon'
import { useNavigate } from '@tanstack/react-router'
import classNames from 'classnames'
import { FC } from 'react'
import styles from './LearnList.module.scss'

import { Lesson as LessonType } from '@/entities/lesson'

export const LessonItem: FC<
  LessonType & { position: number; unitStyle: UnitStyle; isFirstUncompleted: boolean }
> = ({ position, id, unitStyle, isCompleted, isFirstUncompleted }) => {
  const navigate = useNavigate({ from: '/lesson' })
  return (
    <div className={styles.LessonContainer}>
      <button
        className={styles.LessonButton}
        style={
          {
            left: position,
            '--unit-color':
              isFirstUncompleted || isCompleted ? UNIT_STYLE_COLORS[unitStyle] : '#e5e5e5'
          } as React.CSSProperties
        }
        onClick={() => {
          localStorage.setItem('activeLessonId', id)
          navigate({ to: `/lesson` })
        }}
      >
        <Icon
          name="lesson"
          className={classNames(styles.Icon, {
            [styles.isCompleted]: isCompleted || isFirstUncompleted
          })}
        />
      </button>
    </div>
  )
}
