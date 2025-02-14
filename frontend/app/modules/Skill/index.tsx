import { useEffect, useContext, createContext, createRef } from "react";
import { useSkillReducer, defaultSkillContextState } from "./reducer";
import { Results } from "./components/Results";
import Footer from "./components/Footer";
import { LessonContainer } from "./components/lib";
import InsertWords from "./components/InsertWords";
import Pairs from "./components/Pairs";
import QuestionAnswerPractice from "./components/QuestionAnswer";
import VariantsPractice from "./components/Variants";
import { PracticeStepType, SkillContextType } from "./types";
import AreYouSureBlock from "./components/AreYouSureBlock";
import { useSubmit } from "@remix-run/react";
import Progress from "./components/Progress";
import Overlay from "../Common/components/Overlay";

export const SkillContext = createContext<SkillContextType>(
  defaultSkillContextState
);
SkillContext.displayName = "SkillContext";

export function useSkill() {
  const context = useContext(SkillContext);
  if (context === undefined) {
    throw new Error("useSkill must be used within a <Lesson />");
  }
  return context;
}

export default function Skill({
  steps,
  totalXP,
}: {
  steps: PracticeStepType[];
  totalXP: number;
}) {
  const resultsFormRef = createRef<HTMLFormElement>();

  const value = useSkillReducer();
  const submit = useSubmit();

  const { setup, skillState, continueSkill, resetStatus } = value;
  const { status } = skillState;

  useEffect(() => {
    setup(steps, totalXP); // Once the data is loaded, we set the it in reducer
  }, []);

  const onContinue = () => {
    if (status === "results") {
      return submit(resultsFormRef.current, { replace: true });
    }
    return continueSkill();
  };

  return (
    <SkillContext.Provider value={{ ...value, continueSkill: onContinue }}>
      <LessonContainer>
        {status === "results" ? (
          <>
            <Results onSubmit={onContinue} ref={resultsFormRef} />
            <Footer />
          </>
        ) : (
          <>
            <Progress />
            <QuestionAnswerPractice />
            <InsertWords />
            <VariantsPractice />
            <Pairs />
            {status === "leaving" ? (
              <>
                <Overlay
                  active={true}
                  onClick={resetStatus}
                  style={{ top: 0, zIndex: 5, pointerEvents: "auto" }}
                />
                <AreYouSureBlock />
              </>
            ) : null}
          </>
        )}
      </LessonContainer>
    </SkillContext.Provider>
  );
}
