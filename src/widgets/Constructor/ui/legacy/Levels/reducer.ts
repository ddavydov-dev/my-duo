import { nanoid } from "nanoid";
import type {
  Step,
  State,
  StepOptions,
  Lesson,
  ConstructorData,
} from "./types";

import { useReducer } from "react";

const getBasicState = (): State => {
  const lessonId = nanoid();
  const step = createStep(lessonId);
  return {
    lessons: [{ id: lessonId }],
    currentScreen: "Skill",
    steps: [step],
    basicInfoReady: false,
    stepsReady: false,
    activeStepId: step.id,
    activeLessonId: lessonId,
    skillTitle: "",
    skillLineNumber: 0,
  };
};

const createStep = (parentLessonId: string): Step => {
  return {
    id: nanoid(),
    answer: "",
    stepType: "",
    ready: false,
    parentLessonId,
    options: {},
  };
};

enum actionTypes {
  setup = "SETUP",
  setStepType = "SET_STEP_TYPE",
  removeStep = "REMOVE_STEP",
  removeStepType = "REMOVE_STEP_TYPE",
  setStepActive = "SET_STEP_ACTIVE",
  setQuestion = "SET_QUESTION",
  setKeywords = "SET_KEYWORDS",
  setAnswer = "SET_ANSWER",
  addLesson = "ADD_LESSON",
  addStep = "ADD_STEP",
  setStepReady = "SET_STEP_READY",
  changeCurrentScreen = "CHANGE_CURRENT_SCREEN",
  setBasicInfoReady = "SET_BASIC_INFO_READY",
  setStepsReady = "SET_STEPS_READY",
  setLessonActive = "SET_LESSON_ACTIVE",
  setSkillTitle = "SET_SKILL_TITLE",
  setSkillLineNumber = "SET_SKILL_LINE_NUMBER",
  setStepOptions = "SET_STEP_OPTIONS",
}

type Action =
  | { type: actionTypes.setup; data: ConstructorData }
  | {
      type: actionTypes.setStepType;
      payload: { stepType: string; id: string };
    }
  | { type: actionTypes.removeStep }
  | { type: actionTypes.removeStepType; id: string }
  | { type: actionTypes.setStepActive; id: string }
  | {
      type: actionTypes.setQuestion;
      payload: { question: string; number: number };
    }
  | {
      type: actionTypes.setKeywords;
      payload: { keywords: string[]; number: number };
    }
  | { type: actionTypes.addLesson }
  | { type: actionTypes.addStep }
  | {
      type: actionTypes.setStepReady;
      payload: { isReady: boolean; stepId: string };
    }
  | { type: actionTypes.setAnswer; payload: { answer: string; stepId: string } }
  | { type: actionTypes.changeCurrentScreen; currentScreen: "Skill" | "Steps" }
  | { type: actionTypes.setBasicInfoReady; isReady: boolean }
  | { type: actionTypes.setStepsReady; isReady: boolean }
  | { type: actionTypes.setLessonActive; id: string }
  | { type: actionTypes.setSkillTitle; title: string }
  | { type: actionTypes.setSkillLineNumber; lineNumber: number }
  | { type: actionTypes.setStepOptions; options: StepOptions };

export const basicState = getBasicState();

function constructorReducer(state: State, action: Action): State {
  const { steps, lessons, activeStepId, activeLessonId } = state;
  const { type } = action;

  switch (type) {
    case actionTypes.setup: {
      const { steps, title } = action.data;
      const firstStep = steps[0];
      const uniqueLessons: Lesson[] = [];
      steps.forEach((step) => {
        const isIdInTheList = Boolean(
          uniqueLessons.find((lesson) => lesson.id === step.parentLessonId)
        );
        if (!isIdInTheList) {
          uniqueLessons.push({ id: step.parentLessonId });
        }
      });

      return {
        ...state,
        steps,
        activeLessonId: firstStep.parentLessonId,
        activeStepId: firstStep.id,
        lessons: uniqueLessons,
        skillTitle: title,
      };
    }
    case actionTypes.setStepType: {
      const { stepType, id } = action.payload;
      let options = {};
      switch (stepType) {
        case "Question": {
          options = { question: "", keywords: [] };
          break;
        }
        case "Variants": {
          options = { question: "", variants: [] };
          break;
        }
      }
      const newSteps = steps.map((step: Step) =>
        step.id === id ? { ...step, stepType: stepType, options } : { ...step }
      );
      return { ...state, steps: [...newSteps] };
    }
    case actionTypes.removeStepType: {
      const { id } = action;
      const newSteps = steps.map((step: Step) => {
        if (step.id === id) {
          return {
            ...step,
            stepType: "",
            options: {},
            answer: "",
            ready: false,
          };
        } else {
          return { ...step };
        }
      });
      return { ...state, steps: [...newSteps] };
    }
    case actionTypes.setStepReady: {
      const { isReady, stepId } = action.payload;
      const newSteps = steps.map((step) => {
        if (step.id === stepId) {
          return { ...step, ready: isReady };
        }
        return { ...step };
      });
      return {
        ...state,
        steps: [...newSteps],
      };
    }
    case actionTypes.setStepActive: {
      return { ...state, activeStepId: action.id };
    }
    case actionTypes.setQuestion: {
      const { question, number } = action.payload;
      let newSteps = steps;
      newSteps[number].options.question = question;
      return { ...state, steps: [...newSteps] };
    }
    case actionTypes.setAnswer: {
      const { answer, stepId } = action.payload;
      const newSteps = steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            answer,
          };
        }
        return { ...step };
      });
      return { ...state, steps: [...newSteps] };
    }
    case actionTypes.setKeywords: {
      let { keywords, number } = action.payload;
      let newSteps = steps;
      newSteps[number].options.keywords = keywords;
      return { ...state, steps: [...newSteps] };
    }
    case actionTypes.addStep: {
      const newStep = createStep(activeLessonId);
      return {
        ...state,
        steps: [...steps, newStep],
        activeStepId: newStep.id,
      };
    }
    case actionTypes.removeStep: {
      const newSteps = steps;
      const removeIdx = newSteps.indexOf(
        newSteps.find((step) => step.id === activeStepId) as Step
      );
      newSteps.splice(removeIdx, 1);
      const lastStep = newSteps.at(-1) as Step;
      return {
        ...state,
        steps: [...newSteps],
        activeStepId: lastStep.id,
      };
    }
    case actionTypes.addLesson: {
      const lessonId = nanoid();
      const newLesson = {
        id: lessonId,
      };
      const newStep = createStep(lessonId);
      const newSteps = steps.map((step) => ({ ...step }));
      return {
        ...state,
        lessons: [...lessons, newLesson],
        steps: [...newSteps, newStep],
        activeLessonId: lessonId,
        activeStepId: newStep.id,
      };
    }
    case actionTypes.changeCurrentScreen: {
      const { currentScreen } = action;
      return { ...state, currentScreen };
    }
    case actionTypes.setLessonActive: {
      const { id } = action;
      const firstLessonStep = steps.find(
        (step) => step.parentLessonId === id
      ) as Step;
      return {
        ...state,
        activeLessonId: id,
        activeStepId: firstLessonStep.id,
      };
    }
    case actionTypes.setBasicInfoReady: {
      const { isReady } = action;
      return { ...state, basicInfoReady: isReady };
    }
    case actionTypes.setStepsReady: {
      const { isReady } = action;
      return { ...state, stepsReady: isReady };
    }
    case actionTypes.setSkillTitle: {
      return { ...state, skillTitle: action.title };
    }
    case actionTypes.setSkillLineNumber: {
      return { ...state, skillLineNumber: action.lineNumber };
    }
    case actionTypes.setStepOptions: {
      const newSteps = steps.map((step) => {
        if (step.id === activeStepId) {
          return { ...step, options: action.options };
        }
        return { ...step };
      });
      return { ...state, steps: [...newSteps] };
    }
    default:
      throw new Error(`We don't know this action type: ${type}`);
  }
}

function useConstructorReducer({
  initialState = basicState,
  reducer = constructorReducer,
} = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setup = (data: ConstructorData) =>
    dispatch({ type: actionTypes.setup, data });
  const setStepType = (stepType: string, id: string) =>
    dispatch({ type: actionTypes.setStepType, payload: { stepType, id } });
  const removeStep = () => dispatch({ type: actionTypes.removeStep });
  const removeStepType = (id: string) =>
    dispatch({ type: actionTypes.removeStepType, id });
  const setStepActive = (id: string) =>
    dispatch({ type: actionTypes.setStepActive, id });
  const setQuestion = (question: string, number: number) =>
    dispatch({ type: actionTypes.setQuestion, payload: { question, number } });
  const setKeywords = (keywords: string[], number: number) =>
    dispatch({ type: actionTypes.setKeywords, payload: { keywords, number } });
  const addLesson = () => dispatch({ type: actionTypes.addLesson });
  const addStep = () => dispatch({ type: actionTypes.addStep });
  const setStepReady = (isReady: boolean, stepId: string) =>
    dispatch({ type: actionTypes.setStepReady, payload: { isReady, stepId } });
  const setAnswer = (answer: string, stepId: string) =>
    dispatch({ type: actionTypes.setAnswer, payload: { answer, stepId } });
  const changeCurrentScreen = (currentScreen: "Skill" | "Steps") =>
    dispatch({ type: actionTypes.changeCurrentScreen, currentScreen });
  const setBasicInfoReady = (isReady: boolean) =>
    dispatch({ type: actionTypes.setBasicInfoReady, isReady });
  const setStepsReady = (isReady: boolean) =>
    dispatch({ type: actionTypes.setStepsReady, isReady });
  const setLessonActive = (id: string) =>
    dispatch({ type: actionTypes.setLessonActive, id });
  const setSkillTitle = (title: string) =>
    dispatch({ type: actionTypes.setSkillTitle, title });
  const setSkillLineNumber = (lineNumber: number) =>
    dispatch({ type: actionTypes.setSkillLineNumber, lineNumber });
  const setStepOptions = (options: StepOptions) =>
    dispatch({ type: actionTypes.setStepOptions, options });

  return {
    ...state,
    setStepType,
    setup,
    removeStep,
    removeStepType,
    setStepActive,
    setQuestion,
    setAnswer,
    setKeywords,
    addLesson,
    addStep,
    setStepReady,
    changeCurrentScreen,
    setBasicInfoReady,
    setStepsReady,
    setLessonActive,
    setSkillTitle,
    setSkillLineNumber,
    setStepOptions,
  };
}

const initialContext = {
  ...basicState,
  setStepType: (stepType: string, id: string) => {},
  setup: (data: ConstructorData) => {},
  removeStep: () => {},
  removeStepType: (id: string) => {},
  setStepActive: (id: string) => {},
  setQuestion: (question: string, number: number) => {},
  setAnswer: (answer: string, stepId: string) => {},
  setKeywords: (keywords: string[], number: number) => {},
  addLesson: () => {},
  addStep: () => {},
  setStepReady: (isReady: boolean, stepId: string) => {},
  changeCurrentScreen: (currentScreen: "Skill" | "Steps") => {},
  setBasicInfoReady: (isReady: boolean) => {},
  setStepsReady: (isReady: boolean) => {},
  setLessonActive: (id: string) => {},
  setSkillTitle: (title: string) => {},
  setSkillLineNumber: (lineNumber: number) => {},
  setStepOptions: (options: StepOptions) => {},
};

export { useConstructorReducer, constructorReducer, initialContext };
