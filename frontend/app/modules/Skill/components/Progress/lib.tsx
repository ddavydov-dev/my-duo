import styled from "@emotion/styled";
import { Link } from "@remix-run/react";

type ProgressProps = {
  progress: number;
};

const ProgressBarContainer = styled("div")`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 50px 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ProgressBar = styled("div")<ProgressProps>`
  width: 100%;
  height: 16px;
  position: relative;
  background-color: #e5e5e5;
  position: relative;
  border-radius: 7px;
  &:before,
  &:after {
    content: "";
    display: block;
    width: ${(props) => props.progress * 100}%;
    height: 16px;
    background-color: #58cc02;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
    transition: width 0.2s ease;
  }
  &:after {
    height: 30%;
    top: 25%;
    left: 8px;
    right: 8px;
    width: calc(${(props) => props.progress * 100}% - 16px);
    background: white;
    opacity: 0.2;
  }
`;

const LeaveLessonButton = styled("button")`
  margin-right: 21px;
  height: 16px;
  margin-top: -3px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: inherit;
`;

const LeaveLessonLink = styled(Link)`
  margin-right: 21px;
  height: 16px;
  margin-top: -3px;
`;

export {
  ProgressBarContainer,
  ProgressBar,
  LeaveLessonButton,
  LeaveLessonLink,
};
