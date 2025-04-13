import styled from "@emotion/styled";
import { PHONE_MEDIA_MAX, TABLET_MEDIA_MAX } from "~/constants";
import Sidebar from "./Sidebar";
import PlusIcon from "~/styles/plus.svg";

type InsertWordsTextBlockProps = {
  isEditingText?: boolean;
};

type VariantItemNumberProps = {
  isConnected?: boolean;
  isFocused: boolean;
};

type InsertWordsInputProps = {
  length: number;
  isToChoose?: boolean;
};

type SidebarBtnProps = {
  isActive: boolean;
};

type StepContainerProps = {
  isHidden: boolean;
};

type SidebarStepsButtonProps = {
  isActive: boolean;
};

type SidebarStepsListItemProps = {
  isActive: boolean;
};

const ConstructorContainer = styled("section")`
  width: 100%;
  height: calc(100vh - 95px);

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    height: calc(100vh - 165px);
    overflow-y: scroll;
  }
`;

const ConstructorInner = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StepContainer = styled("section")<StepContainerProps>`
  min-height: 100%;
  display: ${(props) => (props.isHidden ? "none" : "flex")};
  flex-direction: column;
`;

const StepContent = styled("div")`
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 60px 24px;
  min-height: 300px;
  margin-top: 20px;
`;

const StepHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const ChooseStyle = styled("div")`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content max-content;
  justify-content: center;
  align-items: self-end;
  margin: auto 0;
`;

const StyleButton = styled("button")`
  padding: 35px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  font-family: "Nunito";
  transition: color 0.2s;
  &:hover {
    color: #1cb0f6;
  }
  &:active {
    color: #1cb0f6;
    filter: brightness(1.1);
  }
`;

const Button = styled("button")`
  border: 0 solid transparent;
  background-color: #1cb0f6;
  color: #fff;
  border-color: white;
  border-width: 0;
  border-bottom-width: 4px;
  border-bottom-color: #1899d6;
  height: 50px;
  cursor: pointer;
  text-transform: uppercase;
  font-family: "Nunito";
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.8px;
  border-radius: 15px;
  padding: 0 20px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transition: filter 0.2s;
  margin-right: 10px;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    border-bottom-width: 0;
    margin-top: 4px;
    height: 46px;
  }
  &:disabled {
    background-color: #e5e5e5;
    color: #afafaf;
    border: 2px solid #e5e5e5;
    cursor: default;
    &:hover {
      filter: none;
    }
  }
`;

const InsertWordsTextBlock = styled("div")<InsertWordsTextBlockProps>`
  min-height: 170px;
  flex-grow: 1;
  width: 100%;
  padding: 10px 0;
  background-color: #fff;
  position: relative;
  z-index: ${(props) => (props.isEditingText ? "0" : "2")};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  box-sizing: border-box;
  font-size: 19px;
  font-family: "Nunito";
  margin-top: 30px;
`;

const InsertWordsInput = styled("input")<InsertWordsInputProps>`
  border: none;
  font-size: 19px;
  margin: 0 7px;
  width: ${(props) => props.length * 13 + 5}px;
  border-bottom: 2px solid #afafaf;
  cursor: ${(props) => (props.isToChoose ? "pointer" : "text")};
  caret-color: #1caff6;
  padding: 0;
  &:disabled {
    background: inherit;
    cursor: default;
  }
  &:focus {
    border-bottom-color: #1caff6;
    outline: none;
  }
`;

const InsertWordsAnswerField = styled("span")<InsertWordsInputProps>`
  margin: 0 7px;
  width: ${(props) => props.length * 13}px;
  border-bottom: 2px solid #afafaf;
`;

const VariantsList = styled("ul")`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
`;

const VariantsItem = styled("li")`
  position: relative;
  margin-bottom: 8px;
  background-color: white;
`;

const VariantItemInput = styled("input")`
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  border-width: 2px 2px 4px;
  position: relative;
  touch-action: manipulation;
  transform: translateZ(0);
  user-select: none;
  text-align: left;
  color: #4b4b4b;
  font-size: 19px;
  line-height: 1.4;
  padding: 12px 16px 12px 56px;
  width: 100%;
`;

const VariantItemNumber = styled("span")<VariantItemNumberProps>`
  border: 2px solid #e5e5e5;
  border-color: ${(props) =>
    props.isConnected
      ? "#78C83D"
      : props.isFocused
      ? "rgb(132, 216, 255)"
      : "#e5e5e5"};
  border-radius: 8px;
  color: ${(props) =>
    props.isConnected
      ? "#78C83D"
      : props.isFocused
      ? "rgb(24, 153, 214)"
      : "#afafaf"};
  font-size: 15px;
  font-weight: 700;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 12px;
  left: 16px;
  z-index: 1;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito";

  // @media (max-width: ${TABLET_MEDIA_MAX}px) {
  //   display: none;
  // }
`;

const SidebarList = styled("ul")`
  margin-bottom: auto;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    display: flex;
    overflow-x: scroll;
    order: 2;
    width: calc(100% - 110px);
    margin: 0;
  }
`;

const SidebarListItem = styled("li")`
  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    margin-right: 10px;
  }
`;

const SidebarStepsList = styled(SidebarList)`
  max-height: 40%;
  overflow-y: scroll;
  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    max-height: 100%;
    width: 100%;
    order: 1;
    margin-bottom: 15px;
  }
`;

const SidebarStepsListItem = styled("li")<SidebarStepsListItemProps>`
  display: flex;
  min-height: 30px;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    min-width: ${(props) => (props.isActive ? "115px" : "70px")};
  }
`;

const SidebarBtn = styled("button")<SidebarBtnProps>`
  color: #3c3c3c;
  display: block;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${(props) => (props.isActive ? "#dadada" : "inherit")};
  border-radius: 16px;
  width: 100%;
  text-align: left;
  padding: 13px 20px;
  transition: background 0.07s;
  margin-bottom: 2px;
  &:hover {
    background: #dadada;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    height: 100%;
    padding: 5px 8px;
    margin-right: 5px;
  }
`;

const SidebarStepsButton = styled("button")<SidebarStepsButtonProps>`
  color: ${(props) => (props.isActive ? "#1cb0f6" : "#3c3c3c")};
`;

const StepInner = styled("div")`
  padding: 0 20%;

  @media (max-width: 820px) {
    padding: 0 40px;
  }

  @media (max-width: 720px) {
    padding: 0;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    padding: 0;
  }
`;

const SidebarBtnAdd = styled("button")`
  border: 0 solid transparent;
  background-color: #1cb0f6;

  color: #fff;
  border-color: white;
  border-width: 0;
  border-bottom-width: 4px;
  border-bottom-color: #1899d6;
  height: 40px;
  cursor: pointer;
  text-transform: uppercase;
  font-family: "Nunito";
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.4px;
  border-radius: 12px;
  padding: 0 15px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transition: filter 0.2s;
  box-sizing: border-box;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    border: none;
    height: 36px;
    margin-top: 4px;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    padding: 0;

    min-width: 30px;
    height: 30px;
    align-self: center;
    background-image: url(${PlusIcon});
    background-size: 17px;
    background-position: center;
    background-repeat: no-repeat;

    font-size: 0;

    &:active {
      height: 26px;
    }
  }
`;

const SidebarBtnAddWithoutTitle = styled(SidebarBtnAdd)`
  height: 30px;
  background-image: url(${PlusIcon});
  background-size: 17px;
  background-position: center;
  background-repeat: no-repeat;

  &:active {
    height: 26px;
  }
`;

export {
  ConstructorContainer,
  ConstructorInner,
  StepContainer,
  StepHeader,
  StepContent,
  ChooseStyle,
  Button,
  StyleButton,
  InsertWordsTextBlock,
  InsertWordsInput,
  InsertWordsAnswerField,
  VariantsList,
  VariantsItem,
  VariantItemInput,
  VariantItemNumber,
  SidebarList,
  SidebarListItem,
  SidebarStepsList,
  SidebarStepsListItem,
  SidebarBtn,
  StepInner,
  SidebarBtnAdd,
  SidebarBtnAddWithoutTitle,
  SidebarStepsButton,
};
