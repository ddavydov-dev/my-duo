import { useRive } from '@rive-app/react-canvas'
import styles from './QuestionAnswer.module.scss'
import { FC, useEffect } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { SmartTextarea } from '@/shared/ui/SmartTextarea'
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from '../../config/consts'

interface QuestionAnswerProps {
  question?: string
  answer?: string
  onQuestionChange?: (question: string) => void
  onAnswerChange?: (answer: string) => void
  isAnswerCorrect?: boolean | null
  isEditing?: boolean
}

export const QuestionAnswer: FC<QuestionAnswerProps> = ({
  question,
  onQuestionChange,
  answer,
  onAnswerChange,
  isAnswerCorrect,
  isEditing = false
  // TODO: should be one onChange
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/oscar.riv',
    animations: 'idle_00',
    autoplay: true
  })

  useEffect(() => {
    if (typeof isAnswerCorrect === 'boolean' && rive) {
      rive.play(isAnswerCorrect ? 'correct_00' : 'incorrect_00')
    }
  }, [isAnswerCorrect, rive])

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        {/* <Button onClick={playSuccess}>Success</Button>
        <Button onClick={playFail}>Fail</Button> */}
        <RiveComponent
          style={{
            height: CHARACTER_HEIGHT,
            width: CHARACTER_WIDTH,
            transform: 'scale(1.1) translate(-6.94444%, 0%)'
          }}
        />

        <div style={{ position: 'relative' }}>
          {isEditing ? (
            <SmartTextarea
              placeholder="Set question"
              value={question}
              onChange={e => onQuestionChange?.(e.target.value)}
              required
              // autoFocus
            />
          ) : (
            <p className={styles.Question}>{question}</p>
          )}

          <Icon name="messageTriangle" className={styles.Triangle} />
        </div>
      </div>

      <textarea
        className={styles.Textarea}
        placeholder="Type answer"
        //   value={answer}
        value={answer}
        onChange={evt => onAnswerChange?.(evt.target.value)}
        required
        disabled={!isEditing && isAnswerCorrect !== null}
      />
    </div>
  )
}
