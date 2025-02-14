import { Fragment, useEffect, useState } from 'react'
import { useFocus } from 'src/shared/hooks/useFocus'
import { useConstructor } from '~/modules/Constructor'
import { cleanWordFromSigns, isItemInArray } from '~/utils'
import { InsertWordsInput, InsertWordsTextBlock, StepContent, StepInner } from '../lib'
import Settings from './Settings'
import ChooseMissingWords from './ChooseMissingWords'
import { Step } from '../../types'
import { Textarea } from '~/modules/Common/components/FormTags/lib'

export default function InsertWords() {
  const { steps, activeStepId } = useConstructor()
  const activeStep = steps.find(step => step.id === activeStepId) as Step
  const { answer, id, stepType, options } = activeStep

  const defaultIndexes: number[] = answer ? JSON.parse(answer) : []
  const { setStepReady, setAnswer, setStepOptions } = useConstructor()
  const [isEditingText, setEditingText] = useState(true)
  const [isChooseVariants, setChooseVariants] = useState(false)
  // Indexes of choosen words
  const [indexes, setIndexes] = useState(defaultIndexes.map(item => Number(item)))

  const ref = useFocus<HTMLTextAreaElement>()

  useEffect(() => {
    setAnswer(JSON.stringify(indexes), id)
    setStepReady(!!indexes.length, id)
  }, [indexes.length])

  useEffect(() => {
    if (options.text) {
      setEditingText(false)
    }

    setIndexes(prevIndexes => {
      return prevIndexes.map(prevIndex => Number(prevIndex))
    })
  }, [])

  const words = options.text ? options.text.split(' ') : answer.split(' ')
  const filteredWords = words.filter((word, idx) => {
    const isChoosen = indexes.find(index => Number(index) === idx)
    if (isChoosen) {
      return word
    }
  })

  return stepType === 'Insert' ? (
    <Fragment>
      <StepContent>
        <StepInner>
          <div style={{ marginTop: 30 }}>
            <Textarea
              placeholder="Type text and choose words which should be hidden"
              value={options.text}
              onChange={evt => setStepOptions({ text: evt.target.value })}
              ref={ref}
              required
            />

            <InsertWordsTextBlock isEditingText={isEditingText} style={{ marginTop: -176 }}>
              {words.map((item, idx) => {
                const { newWord, sign } = cleanWordFromSigns(item)

                if (!isItemInArray(indexes, idx)) {
                  return (
                    <span style={{ marginRight: 7 }} key={idx}>
                      {item}
                    </span>
                  )
                }

                if (sign) {
                  return (
                    <Fragment key={idx}>
                      <InsertWordsInput type="text" length={newWord.length} />
                      <span style={{ marginRight: 7 }}>{sign}</span>
                    </Fragment>
                  )
                }

                return <InsertWordsInput type="text" key={idx} length={newWord.length} />
              })}

              {isChooseVariants && !isEditingText && <ChooseMissingWords words={filteredWords} />}
            </InsertWordsTextBlock>
          </div>
        </StepInner>
      </StepContent>

      <Settings
        text={options.text as string}
        answer={answer}
        indexes={indexes}
        setIndexes={setIndexes}
        isEditingText={isEditingText}
        setChooseVariants={setChooseVariants}
        setEditingText={setEditingText}
        isChooseVariants={isChooseVariants}
      />
    </Fragment>
  ) : null
}
