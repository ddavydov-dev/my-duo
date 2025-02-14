import { useSkill } from "../..";
import { cleanWordFromSigns, doesArrayContainItems } from "~/utils";
import QuestionAnswerScreen from "./QuestionAnswerScreen";
import { Lesson } from "../Lesson";

export default function QuestionAnswer() {
  const { content, setStateWrong, setStateRight } = useSkill();
  const { answer: correctAnswer, options } = content;
  const { keywords } = options;

  const checkAnswer = (userAnswer: string) => {
    if (keywords?.length) {
      const userAnswerArray = userAnswer
        .split(" ")
        .map((word) => cleanWordFromSigns(word).newWord);
      const correctKeywordsAmount = doesArrayContainItems(
        keywords,
        userAnswerArray
      ).length;

      if (correctKeywordsAmount === keywords.length) {
        return setStateRight();
      }
    }

    const isAnswerRight =
      correctAnswer.toLowerCase() === userAnswer.toLowerCase();

    if (!isAnswerRight) {
      return setStateWrong();
    }

    // if (length < content.answer.length * 0.8) {
    //   // if user's response is less than 80% right, then return negative
    //   return setStateWrong();
    // }

    return setStateRight();
  };

  return content.stepType === "Question" ? (
    <Lesson
      checkAnswer={checkAnswer}
      disabledCondition={(userAnswer: string) => userAnswer.length > 0}
    >
      <QuestionAnswerScreen userAnswer={""} setUserAnswer={() => {}} />
    </Lesson>
  ) : null;
}
