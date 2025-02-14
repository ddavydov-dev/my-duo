import VariantsScreen from "~/modules/Constructor/components/Levels/components/Variants/VariantsScreen";
import { Variant } from "~/modules/Constructor/types";
import { useSkill } from "..";
import { Lesson } from "./Lesson";

export default function VariantsPractice() {
  const { content, setStateRight, setStateWrong } = useSkill();
  const { options, stepType, answer } = content;
  const { question, variants } = options as {
    question: string;
    variants: Variant[];
  };

  const lessonQuestion = question;

  const checkAnswer = (userAnswer: string) => {
    if (userAnswer === answer) {
      return setStateRight();
    }
    return setStateWrong();
  };

  const handleOnKeyDown = (e: React.KeyboardEvent, setUserAnswer: Function) => {
    if (e.key === "1") {
      return setUserAnswer(variants[0].value);
    }
    if (e.key === "2") {
      return setUserAnswer(variants[1].value);
    }
    if (e.key === "3") {
      return setUserAnswer(variants[2].value);
    }
  };

  return stepType === "Variants" ? (
    <Lesson
      disabledCondition={(userAnswer: string) => userAnswer.length}
      checkAnswer={checkAnswer}
      keyDownHandle={handleOnKeyDown}
    >
      <VariantsScreen
        userAnswer={""}
        setUserAnswer={() => {}}
        question={lessonQuestion}
        variants={variants}
      />
    </Lesson>
  ) : null;
}
