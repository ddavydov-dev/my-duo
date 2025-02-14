import React, { ReactNode } from 'react'
import {
  ResultsBlock,
  ResultsContainer,
  ResultsDescription,
  ResultsHiddenForm,
  ResultsTitle
} from './lib'
import ResultsImg from '~/styles/results.png'
import { useSkill } from '..'
import { useFocus } from 'src/shared/hooks/useFocus'

type Props = {
  children?: ReactNode
  onSubmit: () => void
}

export type Ref = HTMLFormElement

export const Results = React.forwardRef<Ref, Props>((props, ref) => {
  const { totalXP } = useSkill()

  const containerRef = useFocus<HTMLDivElement>()

  return (
    <ResultsContainer
      ref={containerRef}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          props.onSubmit()
        }
      }}
      tabIndex={0}
    >
      <ResultsHiddenForm method="post" ref={ref}>
        <input type="text" name="exp" value="16" readOnly />
      </ResultsHiddenForm>

      <ResultsBlock>
        {/* <ResultsTitle>Right answers and mistakes</ResultsTitle> */}
        <img src={ResultsImg} width="140" alt="Results picture" />
        <ResultsTitle>You've earned {totalXP + 10} XP today</ResultsTitle>
        <span>
          <ResultsDescription>Practice Complete!</ResultsDescription>
          <ResultsDescription style={{ color: '#ffc800', fontWeight: '700', marginLeft: '10px' }}>
            +10 XP
          </ResultsDescription>
        </span>
      </ResultsBlock>
    </ResultsContainer>
  )
})
