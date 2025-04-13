import { useEffect } from "react";
import type { Step as StepType } from "./types";
import Variants from "./components/Variants";
import MatchingPairs from "./components/MatchingPairs";
import InsertWords from "./components/InsertWords";
import { ScreenContainer } from "../lib";
import { useConstructor } from "../..";
import Step from "./components/Step";
import QuestionAnswer from "./components/QuestionAnswer";

export default function Levels() {
  const { steps, setStepsReady, currentScreen, activeStepId } =
    useConstructor();
  useEffect(() => {
    setStepsReady(!steps.find((step: StepType) => step.ready === false));
  }, [steps]);

  return (
    <ScreenContainer screen={currentScreen} target="Steps">
      {steps.map((data: StepType, idx: number) => (
        <Step data={data} index={idx} key={data.id}>
          {data.stepType === "Question" && data.id === activeStepId ? (
            <QuestionAnswer />
          ) : null}
          {data.stepType === "Insert" && data.id === activeStepId ? (
            <InsertWords />
          ) : null}
          {data.stepType === "Variants" && data.id === activeStepId ? (
            <Variants />
          ) : null}

          {/* Let's fix Pairs and show it in the next release */}
          {/* {data.stepType === "Pairs" && data.id === activeStepId ? (
            <MatchingPairs />
          ) : null} */}

          {/* {
            const activeStep = ...

            const Component = activeStep.stepType 
            
            return Component
          } */}
        </Step>
      ))}
    </ScreenContainer>
  );
}
