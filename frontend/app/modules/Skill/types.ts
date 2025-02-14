import { Step } from "@prisma/client";
import { StepOptions } from "../Constructor/components/Levels/types";

// export type Step = Omit<Lesson, "createdAt" | "updatedAt"> & {
//   difficulty: "easy" | "hard" | null;
// };

export type PracticeStepType = Pick<Step, "answer" | "stepType"> & {
  difficulty: "easy" | "hard" | null;
  options: StepOptions;
};

export type SkillState = {
  progress: number;
  content: PracticeStepType;
  lessonSteps: PracticeStepType[];
  stepsAmount: number;
  completedStepsAmount: number;
  skillState: {
    status: "idle" | "leaving" | "wrong" | "right" | "results";
    formDisabled: boolean;
    buttonDisabled: boolean;
  };
  totalXP: number;
};

export type SkillContextType = Omit<
  SkillState,
  "lessonSteps" | "stepsAmount" | "completedStepsAmount"
> & {
  setup: Function;
  continueSkill: Function;
  showResults: Function;
  setStateRight: Function;
  setStateWrong: Function;
  setCheckDisabled: Function;
  updateState: Function;
  setDifficulty: Function;
  leave: Function;
  resetStatus: Function;
};
