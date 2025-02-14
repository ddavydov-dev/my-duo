import React, { ReactElement, useEffect, useState } from 'react'
import { useFocus } from 'src/shared/hooks/useFocus'
import { useSkill } from '..'
import Footer from './Footer'
import { LessonBody } from './lib'

type LessonProps = {
  initialValue?: string | string[]
  checkAnswer: Function
  disabledCondition: Function | null
  keyDownHandle?: Function
}

export const Lesson: React.FC<LessonProps> = ({
  initialValue = '',
  disabledCondition,
  checkAnswer,
  keyDownHandle,
  children,
  ...props
}) => {
  const { skillState, continueSkill, setCheckDisabled } = useSkill()
  const { status, formDisabled, buttonDisabled } = skillState
  const [userAnswer, setUserAnswer] = useState(initialValue)

  const lessonRef = useFocus<HTMLDivElement>(status)

  useEffect(() => {
    if (disabledCondition === null) {
      return
    }
    if (disabledCondition(userAnswer)) {
      return setCheckDisabled(false)
    }
    return setCheckDisabled(true)
  }, [userAnswer])

  const onKeyDownHandle = (event: React.KeyboardEvent, callback?: Function) => {
    if (callback) {
      return callback(event)
    }
    if (keyDownHandle) {
      keyDownHandle(event, setUserAnswer)
    }
    if (event.key !== 'Enter' || buttonDisabled) {
      return
    }
    event.preventDefault()

    if (status === 'idle') {
      return checkAnswer(userAnswer)
    }

    return continueSkill()
  }

  useEffect(() => {
    if (!formDisabled && setUserAnswer) {
      setUserAnswer(initialValue)
    }
  }, [formDisabled])

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDownHandle}
      ref={lessonRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        outline: 'none'
      }}
    >
      <LessonBody>
        {React.Children.map(children, child => {
          return React.cloneElement(child as ReactElement, {
            userAnswer,
            setUserAnswer,
            keyDownCheck: onKeyDownHandle,
            checkAnswer: (uAnswer: string | string[]) => checkAnswer(uAnswer, setUserAnswer),
            ...props
          })
        })}
      </LessonBody>
      <Footer checkAnswer={() => checkAnswer(userAnswer)} />
    </div>
  )
}
