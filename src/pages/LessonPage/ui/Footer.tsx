import { Button } from '@/shared/ui/Button'
import Icon from '@/shared/ui/Icon'

interface FooterProps {
  isAnswerCorrect: boolean | null
  activeExercise: { answer: string } | null
  answer: string
  handleSkip: () => void
  checkAnswer: () => void
  continueLesson: () => void
}

export default function Footer({
  isAnswerCorrect,
  handleSkip,
  activeExercise,
  answer,
  continueLesson,
  checkAnswer
}: FooterProps) {
  return (
    <div
      className={
        'absolute bottom-0 w-full grid z-[110] min-h-[140px] max-h-[140px] overflow-hidden transition-[max-height] duration-300 border-t-2' +
        (isAnswerCorrect === true
          ? ' bg-success'
          : isAnswerCorrect === false
            ? 'bg-failure'
            : 'bg-[inherit]')
      }
    >
      <div className="max-w-[1000px] grid grid-cols-5 items-center justify-between gap-y-2 gap-x-4 py-0 px-10 w-full mx-auto min-h-[140px]">
        {isAnswerCorrect === null && (
          <Button
            variant="primary-ghost"
            className="justify-self-start text-hare col-span-1"
            isFullWidth
            onClick={handleSkip}
          >
            Skip
          </Button>
        )}

        {isAnswerCorrect !== null && (
          <SuccessMessage isCorrect={isAnswerCorrect} correctAnswer={activeExercise?.answer} />
        )}

        <Button
          variant={isAnswerCorrect !== false ? 'secondary' : 'error'}
          className="justify-self-end col-start-5"
          isFullWidth
          onClick={isAnswerCorrect !== null ? continueLesson : checkAnswer}
          disabled={answer.length === 0 && isAnswerCorrect === null}
        >
          {isAnswerCorrect !== null ? 'Continue' : 'Check'}
        </Button>
      </div>
    </div>
  )
}

function SuccessMessage({
  isCorrect,
  correctAnswer
}: {
  isCorrect: boolean
  correctAnswer?: string
}) {
  return (
    <div className="flex flex-col col-span-4 justify-center min-h-[140px] py-4">
      <div className="grid grid-cols-[80px_1fr] gap-4">
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center">
          <Icon name={isCorrect ? 'exerciseSuccess' : 'exerciseFailure'} />
        </div>
        <div>
          <h2
            className={`text-[24px] leading-[30px] m-0 ${isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'}`}
          >
            {isCorrect ? 'Correct!' : 'Correct solution:'}
          </h2>
          {!isCorrect && (
            <p className="text-[#ea2b2b] font-medium text-[17px] m-0">{correctAnswer}</p>
          )}
        </div>
      </div>
    </div>
  )
}
