import { Step } from "@prisma/client";

export type Action =
  | { type: "START" }
  | { type: "CHECK_ANSWER" }
  | { type: "CONTINUE" }
  | { type: "FINISH" }
  | { type: "RESULTS" }
  | { type: "CHANGE_DISABLED"; payload: { isDisabled: boolean } }
  | {
      type: "SET_CASE";
      payload: { steps: Step[] };
    }
  | { type: "CHANGE_USER_ANSWER"; payload: { newAnswer: string[] } };

const actionCreator = (dispatch: Function) => ({
  startPractice: () => dispatch({ type: "START" }),
  checkAnswer: () => dispatch({ type: "CHECK_ANSWER" }),
  continuePractice: () => dispatch({ type: "CONTINUE" }),
  finishPractice: () => dispatch({ type: "FINISH" }),
  showResultsPractice: () => dispatch({ type: "RESULTS" }),
  changeDisabled: (isDisabled: boolean) =>
    dispatch({ type: "CHANGE_DISABLED", payload: { isDisabled } }),
  setCase: (steps: Step[]) =>
    dispatch({ type: "SET_CASE", payload: { steps } }),
  setNewUserAnswer: (newAnswer: string[]) =>
    dispatch({ type: "CHANGE_USER_ANSWER", payload: { newAnswer } }),
});

export default actionCreator;
