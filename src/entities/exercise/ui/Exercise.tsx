import { FC, ReactNode } from 'react'

import styles from './Exercise.module.scss'

interface ExerciseProps {
  title: string
  children: ReactNode
}

export const Exercise: FC<ExerciseProps> = ({ title, children }) => {
  return (
    <section className={styles.Container}>
      <div className={styles.Inner}>
        <div className={styles.Inner2}>
          <div className={styles.Inner3}>
            <div className={styles.Inner4}>
              <div className={styles.TitleContainer}>
                <h1 className={styles.Title}>
                  <span>{title}</span>
                </h1>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
