import { QuestionAnswer } from '@/entities/exercise/ui/QuestionAnswer'
import { useLessonLogic } from '../model/useLessonLogic'
import Header from './Header'
import Footer from './Footer'

export default function LessonPage() {
  const {
    progress,
    activeExercise,
    answer,
    isAnswerCorrect,
    setAnswer,
    handleSkip,
    checkAnswer,
    continueLesson
  } = useLessonLogic()

  // if (id.length === 0) {
  //   return navigate({ to: '/learn' })
  // }

  // if (exercises.length === 0) {
  //   return <div>The lesson is finished</div>
  // }

  return (
    <div className="grid w-full h-full grid-rows-[100px_1fr_140px]">
      <div className="absolute inset-0 grid grid-cols-[100%] grid-rows-[100px_1fr_140px] min-h-[690px] overflow-hidden">
        <Header progress={progress} />

        <div className="grid justify-center items-center text-center text-[19px]">
          <section className="grid gap-6 grid-rows-[min-content_minmax(0,1fr)] min-h-[450px] w-[600px]">
            <h2 className="text-[32px] font-extrabold leading-[1.25] text-title text-left m-0">
              Answer the question
            </h2>
            <QuestionAnswer
              question={activeExercise?.prompt}
              answer={answer}
              onAnswerChange={(val: string) => setAnswer(val)}
              isAnswerCorrect={isAnswerCorrect}
            />
          </section>
        </div>

        <Footer
          activeExercise={activeExercise}
          isAnswerCorrect={isAnswerCorrect}
          answer={answer}
          handleSkip={handleSkip}
          checkAnswer={checkAnswer}
          continueLesson={continueLesson}
        />
      </div>
    </div>
  )
}
