import { useReducer } from "react";
import { SkillState, PracticeStepType } from "./types";

// The function returns next stepNumber if there is any
const continueContent = (
  content: PracticeStepType,
  lessonSteps: PracticeStepType[]
) => {
  const newContent = lessonSteps.shift();
  if (!newContent) {
    return content;
  }

  // const { variants, isToChoose } = newContent.options;

  newContent.difficulty = content.difficulty ? content.difficulty : "easy"; // Take by default difficulty from previous step

  if (newContent.stepType === "Pairs") {
    newContent.difficulty = null;
  }

  // if (variants?.length || isToChoose) {
  //   newContent.difficulty = "easy";
  // }

  // if (content.difficulty) {
  //   newContent.difficulty = content.difficulty;
  // }

  return newContent;
};

enum actionTypes {
  continue = "CONTINUE",
  setup = "SETUP",
  results = "RESULTS",
  setStateRight = "SET_STATE_RIGHT",
  setStateWrong = "SET_STATE_WRONG",
  setCheckDisabled = "SET_CHECK_DISABLED",
  updateState = "UPDATE_STATE",
  setDifficulty = "SET_DIFFICULTY",
  leave = "LEAVE",
  resetStatus = "RESET_STATUS",
}

type Action =
  | { type: actionTypes.setup; steps: PracticeStepType[]; totalXP: number }
  | { type: actionTypes.continue }
  | { type: actionTypes.results }
  | { type: actionTypes.setCheckDisabled; disabled: boolean }
  | { type: actionTypes.setStateRight }
  | { type: actionTypes.setStateWrong }
  | { type: actionTypes.setDifficulty; difficulty: "easy" | "hard" | null }
  | { type: actionTypes.updateState; update: {} }
  | { type: actionTypes.leave }
  | { type: actionTypes.resetStatus };

export const basicState: SkillState = {
  progress: 0,
  content: {
    answer: "",
    stepType: "",
    difficulty: "easy",
    options: {},
  },
  lessonSteps: [], // Array of all steps
  stepsAmount: 0, // Amount of steps from setup. We don't count steps, in which user makes a mistake
  completedStepsAmount: 0, // Amount of completed steps
  skillState: { status: "idle", formDisabled: false, buttonDisabled: true },
  totalXP: 0,
};

function skillReducer(state: SkillState, action: Action): SkillState {
  const {
    content,
    stepsAmount,
    completedStepsAmount,
    lessonSteps,
    skillState,
  } = state;
  const positiveState: SkillState = {
    ...state,
    skillState: {
      status: "right",
      formDisabled: true,
      buttonDisabled: false,
    },
  };
  const negativeState: SkillState = {
    ...state,
    lessonSteps: [...lessonSteps, content],
    skillState: {
      status: "wrong",
      formDisabled: true,
      buttonDisabled: false,
    },
  };
  switch (action.type) {
    case actionTypes.continue:
      const isResults = lessonSteps.length === 0;
      return {
        ...state,
        content: continueContent(content, lessonSteps),
        skillState: {
          ...skillState,
          status: isResults ? "results" : "idle",
          formDisabled: false,
          buttonDisabled: isResults ? false : true,
        },
      };
    case actionTypes.setup: // Initial action to set data right after loading component
      const { steps, totalXP } = action;
      return {
        ...basicState,
        lessonSteps: steps,
        stepsAmount: steps.length,
        content: continueContent(basicState.content, steps) as PracticeStepType,
        totalXP,
      };
    case actionTypes.results:
      return {
        ...state,
        skillState: { ...skillState, status: "results" },
      };
    case actionTypes.setStateRight: {
      const newCompletedStepsAmount = completedStepsAmount + 1;
      return {
        ...positiveState,
        completedStepsAmount: newCompletedStepsAmount,
        progress: newCompletedStepsAmount / stepsAmount,
      };
    }

    case actionTypes.setStateWrong:
      return negativeState;
    case actionTypes.setCheckDisabled:
      const { disabled } = action;
      return {
        ...state,
        skillState: { ...skillState, buttonDisabled: disabled },
      };
    case actionTypes.updateState:
      const { update } = action;
      return { ...state, ...update };
    case actionTypes.setDifficulty:
      const { difficulty } = action;
      return { ...state, content: { ...state.content, difficulty } };
    case actionTypes.leave:
      return { ...state, skillState: { ...skillState, status: "leaving" } };
    case actionTypes.resetStatus:
      return { ...state, skillState: { ...skillState, status: "idle" } };
    default: {
      throw new Error(`Unsupported action: ${action}`);
    }
  }
}

function useSkillReducer({
  initialState = basicState,
  reducer = skillReducer,
} = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { content, progress, skillState, stepsAmount, totalXP } = state;

  const continueSkill = () => dispatch({ type: actionTypes.continue });
  const setup = (steps: PracticeStepType[], totalXP: number) =>
    dispatch({ type: actionTypes.setup, steps, totalXP });
  const showResults = () => dispatch({ type: actionTypes.results });
  const setStateRight = () => dispatch({ type: actionTypes.setStateRight });
  const setStateWrong = () => dispatch({ type: actionTypes.setStateWrong });
  const setCheckDisabled = (disabled: boolean) =>
    dispatch({ type: actionTypes.setCheckDisabled, disabled });
  const updateState = (update: {}) =>
    dispatch({ type: actionTypes.updateState, update });
  const setDifficulty = (difficulty: "easy" | "hard" | null) =>
    dispatch({ type: actionTypes.setDifficulty, difficulty });
  const leave = () => dispatch({ type: actionTypes.leave });
  const resetStatus = () => dispatch({ type: actionTypes.resetStatus });

  return {
    content,
    progress,
    skillState,
    totalXP,
    continueSkill,
    setup,
    showResults,
    setStateRight,
    setStateWrong,
    setCheckDisabled,
    updateState,
    setDifficulty,
    leave,
    resetStatus,
  };
}

const defaultSkillContextState = {
  ...basicState,
  setup: () => {},
  continueSkill: () => {},
  showResults: () => {},
  setStateRight: () => {},
  setStateWrong: () => {},
  setCheckDisabled: () => {},
  updateState: () => {},
  setDifficulty: () => {},
  leave: () => {},
  resetStatus: () => {},
};

export { useSkillReducer, skillReducer, defaultSkillContextState };
