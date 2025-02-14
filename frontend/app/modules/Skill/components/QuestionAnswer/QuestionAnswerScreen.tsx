import { useEffect, useRef } from "react";
import {
  LessonTitle,
  LessonQuestion,
  LessonQuestionTriangleContainer,
  LessonQuestionTriangle,
  LessonDuolingoPicture,
  LessonAnswerWrapper,
  LessonQuestionWrapper,
} from "../lib";
import Duo from "~/styles/duo.svg";
import { useSkill } from "../..";
import { Textarea } from "~/modules/Common/components/FormTags/lib";

type QuestionAnswerScreenType = {
  userAnswer: string;
  setUserAnswer: Function;
};

export default function QuestionAnswerScreen({
  userAnswer,
  setUserAnswer,
}: QuestionAnswerScreenType) {
  const { skillState, content } = useSkill();

  const myRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (skillState.status === "idle") {
      const timeout = setTimeout(() => {
        myRef.current?.focus();
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [skillState.status]);

  return (
    <>
      <LessonTitle>Answer the question</LessonTitle>
      <section>
        <LessonAnswerWrapper>
          <LessonDuolingoPicture src={Duo} alt="Duolingo picture" />
          {/* <img src={Duo} alt="Duo" height="100%" style={{ marginBottom: -50 }} /> */}
          <div style={{ position: "relative" }}>
            <LessonQuestionWrapper>
              <LessonQuestion>{content.options.question}</LessonQuestion>
            </LessonQuestionWrapper>
            <LessonQuestionTriangleContainer>
              <LessonQuestionTriangle />
            </LessonQuestionTriangleContainer>
          </div>
        </LessonAnswerWrapper>
        <Textarea
          id="answer"
          name="answer"
          placeholder="Enter your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={skillState.formDisabled}
          ref={myRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </section>
    </>
  );
}
