import { useRive } from '@rive-app/react-canvas'
import styles from './QuestionAnswer.module.scss'
import { FC, useCallback } from 'react'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { SmartTextarea } from '@/shared/ui/SmartTextarea'
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from '../../config/consts'

interface QuestionAnswerProps {
  question?: string
}

export const QuestionAnswer: FC<QuestionAnswerProps> = ({ question }) => {
  const { rive, RiveComponent } = useRive({
    src: '/oscar.riv',
    animations: 'idle_00',
    autoplay: true
  })

  // const playSuccess = useCallback(() => {
  //   if (rive) {
  //     rive.play('correct_00')
  //   }
  // }, [rive])

  // const playFail = useCallback(() => {
  //   if (rive) {
  //     rive.play('incorrect_00')
  //   }
  // }, [rive])

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
          <SmartTextarea placeholder="Set question" required autoFocus />
          {/* <div className={styles.WrapperTwo}> */}
          {/* <textarea
            ref={taRef}
            className={styles.QuestionTextarea}
            placeholder="Set question"
            //   value={question === null ? '' : question}
            //   onChange={changeQuestion}
            value={value}
            // placeholder="Type here..."
            onChange={e => setValue(e.target.value)}
            autoFocus={true}
            required
          />
          <div ref={ghostRef} className={styles.ghost} /> */}

          {/* <p className={styles.Question}>
            </p> */}
          {/* </div> */}
          {/* <div className={styles.TriangleContainer}>
            <span className={styles.Triangle} />
          </div> */}
          <Icon name="messageTriangle" className={styles.Triangle} />
        </div>
      </div>

      <textarea
        className={styles.Textarea}
        placeholder="Type answer"
        //   value={answer}
        //   onChange={evt => setAnswer(evt.target.value, id)}
        required
      />
    </div>
  )
}
