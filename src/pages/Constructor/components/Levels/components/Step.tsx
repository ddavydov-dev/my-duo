import React, { Fragment, ReactElement } from "react";
import { STEP_TYPES } from "~/constants";
import { Legend } from "~/modules/Common/components/FormTags/lib";
import { useConstructor } from "../../..";
import CloseBtn from "../../CloseBtn";
import { Step as StepType } from "../types";
import {
  StepHeader,
  StepContent,
  ChooseStyle,
  StyleButton,
  StepContainer,
} from "./lib";

type StepProps = { data: StepType; index: number };

const Step: React.FC<StepProps> = ({ data, index, children }) => {
  const { stepType, id } = data;
  const { activeStepId, removeStepType, setStepType } = useConstructor();

  function getStepTitle() {
    switch (stepType) {
      case "Question":
        return "Answer the question";
      case "Insert":
        return "Add missing words";
      case "Variants":
        return "Choose right variant";
      default:
        return "Choose type";
    }
  }

  return (
    <StepContainer isHidden={activeStepId !== id}>
      <Legend>{getStepTitle()}</Legend>
      <StepHeader>
        {stepType !== "" && (
          <CloseBtn onClickHandler={() => removeStepType(id)} />
        )}
      </StepHeader>

      {stepType === "" ? (
        <StepContent>
          <ChooseStyle>
            {STEP_TYPES.map((type, idx) => (
              <StyleButton
                type="button"
                onClick={() => setStepType(type, id)}
                key={idx}
              >
                {type}
              </StyleButton>
            ))}
          </ChooseStyle>
        </StepContent>
      ) : (
        <Fragment>
          {React.Children.map(children, (child) => {
            if (child === null) {
              return;
            }
            return React.cloneElement(child as ReactElement, {
              state: data,
            });
          })}
        </Fragment>
      )}
    </StepContainer>
  );
};

export default Step;
