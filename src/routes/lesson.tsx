import { createFileRoute, useNavigate } from '@tanstack/react-router'

import styles from './Lesson.module.scss'
import { useExercises } from '@/entities/exercise'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { QuestionAnswer } from '@/entities/exercise/ui/QuestionAnswer'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { BackButton } from '@/shared/ui/BackButton'

export const Route = createFileRoute('/lesson')({
  component: RouteComponent
})

function RouteComponent() {
  const id = localStorage.getItem('activeLessonId') as string

  const { data: initialExercises } = useExercises(id)
  const [progress, setProgress] = useState(0)
  const [exercises, setExercises] = useState(initialExercises)

  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null)

  useEffect(() => {
    if (!activeExerciseId && exercises.length > 0) setActiveExerciseId(exercises[0]?.id || null)
  }, [activeExerciseId, exercises])

  const navigate = useNavigate({ from: '/lesson' })

  const activeExercise = useMemo(
    () => exercises.find(exercise => exercise.id === activeExerciseId),
    [exercises, activeExerciseId]
  )

  const [answer, setAnswer] = useState('')

  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)

  const checkAnswer = useCallback(() => {
    if (activeExercise && answer) {
      if (activeExercise.answer === answer) {
        setProgress(
          exercises.length - 1 === 0
            ? 100
            : Math.floor(
                ((initialExercises.length - (exercises.length - 1)) / initialExercises.length) * 100
              )
        )
      }
      setIsAnswerCorrect(activeExercise.answer === answer)
    }
  }, [answer, activeExercise, exercises, initialExercises])

  const handleSkip = useCallback(() => {
    setIsAnswerCorrect(false)
  }, [])

  const continueLesson = useCallback(() => {
    setAnswer('')

    if (isAnswerCorrect) {
      setExercises(exercises.slice(1))
    } else {
      setExercises([...exercises.slice(1), exercises[0]])
    }

    setIsAnswerCorrect(null)
    setActiveExerciseId(exercises[1]?.id || null)
  }, [exercises, isAnswerCorrect])

  if (exercises.length === 0) {
    return <div>The lesson is finished</div>
  }

  return (
    <div
      style={{
        gridTemplateRows: '90px 450px 140px',
        display: 'grid',
        gridTemplateColumns: '100%',
        height: '100%',
        width: '100%'
      }}
    >
      <div className={styles.Wrapper}>
        <div className={styles.Header}>
          <div
            style={{
              gridTemplateColumns: 'min-content 1fr min-content',
              gap: 24,
              alignItems: 'center',
              display: 'grid',
              width: '100%'
            }}
          >
            <BackButton onClick={() => navigate({ to: '/learn' })} />
            <div className={styles.ProgressBar}>
              <div
                className={styles.Progress}
                style={{
                  clipPath: `inset(0 calc(100% - ${progress}%) 0 0 round calc(16px / 2))`
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.Body}>
          <section className={styles.Content}>
            <h2 className={styles.Title}>Answer the question</h2>

            <QuestionAnswer
              question={activeExercise?.prompt}
              answer={answer}
              onAnswerChange={(val: string) => setAnswer(val)}
              isAnswerCorrect={isAnswerCorrect}
            />
          </section>
        </div>
        <div
          className={styles.Footer}
          style={{
            backgroundColor: isAnswerCorrect
              ? 'rgb(215, 255, 184)'
              : isAnswerCorrect !== null
                ? 'rgb(255, 223, 224)'
                : 'inherit'
          }}
        >
          <div className={styles.Inner}>
            {isAnswerCorrect !== null ? null : (
              <Button
                variant="primary-ghost"
                style={{
                  gridColumn: 'auto / 2',
                  justifySelf: 'start',
                  color: 'rgb(175, 175, 175)'
                }}
                isFullWidth
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            {isAnswerCorrect ? (
              <div className={styles.SuccessMessage}>
                <div className={styles.SuccessGrid}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon name="exerciseSuccess" />
                  </div>
                  <div>
                    <h2 style={{ color: 'rgb(88, 167, 0)', fontSize: 24, lineHeight: '30px' }}>
                      Correct!
                    </h2>
                  </div>
                </div>
              </div>
            ) : null}

            {isAnswerCorrect === false ? (
              <div className={styles.SuccessMessage}>
                <div className={styles.SuccessGrid}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon name="exerciseFailure" />
                  </div>{' '}
                  <div>
                    <h2
                      style={{
                        color: 'rgb(234, 43, 43)',
                        lineHeight: '30px',
                        fontSize: 24,
                        margin: 0
                      }}
                    >
                      Correct solution:
                    </h2>
                    <p
                      style={{
                        color: 'rgb(234, 43, 43)',
                        fontWeight: 500,
                        fontSize: 17,
                        margin: 0
                      }}
                    >
                      {activeExercise?.answer}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            <Button
              variant={isAnswerCorrect !== false ? 'secondary' : 'error'}
              style={{
                gridColumn: '5 / auto',
                justifySelf: 'end'
              }}
              isFullWidth
              onClick={isAnswerCorrect !== null ? continueLesson : checkAnswer}
              disabled={answer.length === 0 && isAnswerCorrect === null}
            >
              {isAnswerCorrect !== null ? 'Continue' : 'Check'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
