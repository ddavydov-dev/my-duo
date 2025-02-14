import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@remix-run/react";
import { PHONE_MEDIA_MAX, TABLET_MEDIA_MAX } from "~/constants";

type LessonProgressProps = {
  exp: number;
};

type LessonProgressInnerProps = {
  isDisabled?: boolean;
};

type LessonBlockMenuProps = {
  isOpened: boolean;
};

const MenuAppear = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%, 0);
  }
`;

const LessonProgress = styled("div")<LessonProgressProps>`
  animation: growProgressBar 3s 1 forwards;
  width: 106px;
  height: 106px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(
      closest-side,
      white 85%,
      transparent 0 99.9%,
      white 0
    ),
    conic-gradient(#ffd900 calc(${(props) => props.exp} * 1%), #e5e5e5 0);
  font-family: Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  font-family: "Nunito";
  color: #1cb0f6;
  position: relative;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    width: 65px;
    height: 65px;
  }
`;

const LessonProgressInner = styled("div")<LessonProgressInnerProps>`
  border-radius: 50%;
  height: 68%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 68%;
  background: #ce82ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: ${(props) => (props.isDisabled ? 1 : 0.85)};
  }
`;

const LessonTitle = styled("b")`
  font-size: 17px;
  font-weight: 700;
  color: #3c3c3c;
  text-align: center;
  margin-top: 8px;
  display: block;
`;

const LessonBlockMenu = styled("div")<LessonBlockMenuProps>`
  display: ${(props) => (props.isOpened ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: calc(100% + 20px);
  transform: translate(-50%);
  z-index: 1;
  animation-name: ${MenuAppear};
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
`;

const LessonBlockMenuTriangle = styled("div")`
  left: calc(50% - 15px);
  transform: translateX(-50%);
  margin: 0 15px;
  top: -8px;
  height: 10px;
  overflow: hidden;
  width: 20px;
  box-sizing: border-box;
  position: absolute;
`;

const LessonBlockMenuTriangleContent = styled("span")`
  background-color: #ce82ff;
  border: 0;
  position: absolute;
  content: "";
  border-radius: 2px;
  height: 14.14427px;
  left: 50%;
  transform: rotate(45deg);
  transform-origin: top left;
  width: 14.14427px;
`;

const LessonBlockInner = styled("div")`
  background-color: #ce82ff;
  color: #fff;
  padding: 16px;
  text-align: center;
  width: 295px;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    width: 170px;
  }
`;

const LessonBlockLink = styled(Link)`
  color: #ce82ff;
  background-color: #fff;
  flex-grow: 1;
  text-transform: uppercase;
  margin-top: 12px;
  border-width: 0 0 4px;
  padding: 13px 16px;
  font-size: 15px;
  line-height: 20px;
  border-color: inherit;
  border-radius: 18px;
  text-decoration: none;
  font-family: "Nunito";
  font-weight: 700;
  letter-spacing: 0.8px;
  &:hover {
    filter: brightness(1.1);
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    font-size: 14px;
  }
`;

const LessonBlockButton = styled("button")`
  color: #ce82ff;
  background-color: #fff;
  flex-grow: 1;
  text-transform: uppercase;
  margin-top: 12px;
  margin-left: 10px;
  border-width: 0 0 4px;
  padding: 13px 16px;
  font-size: 15px;
  line-height: 20px;
  border-color: inherit;
  border-radius: 18px;
  text-decoration: none;
  font-family: "Nunito";
  font-weight: 700;
  letter-spacing: 0.8px;
  &:hover img {
    filter: brightness(1.1);
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    font-size: 14px;
  }
`;

const LessonBlockTitle = styled("div")`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 26px;
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
  & span {
    height: 2px;
    background-color: #e5e5e5;
    flex-grow: 1;
  }
  & h2 {
    font-size: 24px;
    font-weight: 700;
    font-family: "Nunito";
    color: #4b4b4b;
    flex-grow: 0.3;
  }
`;

const LessonBlockItem = styled("a")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.33%;
  text-decoration: none;
`;

const LessonBlock = styled("div")`
  width: 33%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LessonsContainer = styled("section")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

export {
  LessonProgress,
  LessonProgressInner,
  LessonTitle,
  LessonBlockMenu,
  LessonBlockMenuTriangle,
  LessonBlockMenuTriangleContent,
  LessonBlockInner,
  LessonBlockLink,
  LessonBlockButton,
  LessonBlockTitle,
  LessonBlockItem,
  LessonBlock,
  LessonsContainer,
};
