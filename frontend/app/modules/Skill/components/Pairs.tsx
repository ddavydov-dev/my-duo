import { useSkill } from "..";
import { Lesson } from "./Lesson";
import PairsScreen from "./PairsScreen";

export default function Pairs() {
  const { content, setStateRight, updateState, skillState } = useSkill();
  const { answer, variants } = content;
  const initialValue = [""];

  const checkAnswer = (uAns: string, setUserAnswer: Function) => {
    let spliceIdx = 0;
    if (
      // Checking if userAnswer or it's vice versa is equal the right one
      answer.find((answerItem: string, idx: number) => {
        spliceIdx = idx;
        return (
          answerItem === uAns ||
          answerItem.split("").reverse().join("") === uAns
        );
      })
    ) {
      const newContent = content;
      newContent.answer.splice(spliceIdx, 1);
      setUserAnswer((prevUserAnswer: string[]) => [...prevUserAnswer, uAns]);
      if (newContent.answer.length === 0) {
        return setStateRight();
      }
      return updateState({ content: newContent });
    } else {
      setUserAnswer((prevUserAnswer: string[]) => [...prevUserAnswer]);
      return updateState({
        skillState: { ...skillState, buttonDisabled: true },
      });
    }
  };

  return content.stepType === "Pairs" ? (
    <Lesson
      initialValue={initialValue}
      disabledCondition={null}
      checkAnswer={checkAnswer}
    >
      <PairsScreen
        userAnswer={[""]}
        checkAnswer={() => {}}
        variants={variants}
      />
    </Lesson>
  ) : null;
}
