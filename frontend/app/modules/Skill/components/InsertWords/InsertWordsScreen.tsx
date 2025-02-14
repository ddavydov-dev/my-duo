import { useEffect, useLayoutEffect, useState } from "react";
import { InsertWordsTextBlock } from "~/modules/Constructor/components/Levels/components/lib";
import { useSkill } from "../..";
import { LessonTitle } from "../lib";
import Puzzle from "./Puzzle";
import Variants from "./Variants";
import Text from "./Text";
import { areArraysEqual } from "~/utils";

type InsertWordsScreenProps = {
  userAnswer: string[];
  setUserAnswer: Function;
  keyDownCheck: Function;
};

export default function InsertWordsScreen({
  userAnswer,
  setUserAnswer,
  keyDownCheck,
}: InsertWordsScreenProps) {
  const { content, skillState } = useSkill();

  const { options, answer, difficulty } = content;
  // const { isToChoose, variants, answer, difficulty } = content;

  const { variants, isToChoose } = options;

  // const initalValues = new Array(answer[0].split(",").length).fill(
  //   variants && difficulty === "easy" ? " " : ""
  // );
  const initalValues = new Array(answer.length).fill(
    variants && difficulty === "easy" ? " " : ""
  );

  const [values, setValues] = useState(initalValues);

  useEffect(() => {
    if (areArraysEqual(userAnswer, values) && !isToChoose) {
      return;
    }
    // if (values.length !== answer[0].split(",").length) {
    if (values.length !== answer.length) {
      return;
    }

    setUserAnswer(values);
  }, [values]);

  useEffect(() => {
    if (isToChoose) {
      return;
    }
    if (userAnswer[0].length) {
      setValues([...userAnswer]);
    }
  }, [userAnswer]);

  useLayoutEffect(() => {
    // if (skillState.formDisabled) {
    //   return;
    // }
    setValues(initalValues);
    // }, [difficulty, skillState.formDisabled]);
  }, [difficulty]);

  return (
    <>
      <LessonTitle>Add missing words</LessonTitle>

      <InsertWordsTextBlock>
        <Text values={values} setValues={setValues} />

        {difficulty === "easy" && answer.length === 1 ? (
          <Variants
            values={values}
            setValues={setValues}
            keyDownCheck={keyDownCheck}
          />
        ) : null}

        {difficulty === "easy" && answer.length > 1 ? (
          <Puzzle values={values} setValues={setValues} />
        ) : null}
      </InsertWordsTextBlock>
    </>
  );
}
