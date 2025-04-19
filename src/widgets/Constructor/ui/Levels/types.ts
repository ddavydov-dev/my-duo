import { Variant } from "./components/MatchingPairs/reducer";

export type Lesson = {
  id: string;
};

export type StepOptions = {
  question?: string;
  keywords?: string[];
  text?: string;
  variants?: Variant[];
  isToChoose?: boolean;
  definition?: string;
};

export type Step = {
  id: string;
  answer: string;
  stepType: string;
  ready?: boolean;
  parentLessonId: string;
  options: StepOptions;
};

export type State = {
  lessons: Lesson[];
  currentScreen: "Skill" | "Steps";
  steps: Step[];
  basicInfoReady: boolean;
  stepsReady: boolean;
  activeStepId: string;
  activeLessonId: string;
  skillTitle: string;
  skillLineNumber: number;
};

export type FieldsetType = {
  number: number;
  answer: string;
  setAnswer: Function;
  setReady: Function;
};

export type ConstructorData = {
  title: string;
  steps: Step[];
};

export type ContextType = State & {
  setStepType: Function;
  setup: Function;
  removeStep: Function;
  removeStepType: Function;
  setStepActive: Function;
  setQuestion: Function;
  setAnswer: Function;
  setKeywords: Function;
  addLesson: Function;
  addStep: Function;
  setStepReady: Function;
  changeCurrentScreen: Function;
  setBasicInfoReady: Function;
  setStepsReady: Function;
  setLessonActive: Function;
  setSkillTitle: Function;
  setSkillLineNumber: Function;
};
