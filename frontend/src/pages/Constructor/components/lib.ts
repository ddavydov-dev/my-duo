import styled from "@emotion/styled";
import { PHONE_MEDIA_MAX } from "~/constants";

type ScreenContainerProps = {
  screen: string;
  target: string;
};

type KeywordProps = {
  active: boolean;
};

const ConstructorFormInner = styled("section")`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  padding-left: 20px;
  margin: 20px 0;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const LessonTitleInput = styled("input")`
  width: fit-content;
  margin: 0 auto;
  text-align: center;
  border: none;
  font-size: 17px;
  font-weight: 700;
  color: #3c3c3c;
  text-align: center;
  margin-top: 8px;
`;

const ConstructorMenu = styled("div")`
  background: #fff;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
  display: block;
  margin: 0 24px 24px;
  padding: 24px;
  width: 380px;
`;

const ScreenContainer = styled("section")<ScreenContainerProps>`
  position: absolute;
  top: 0;
  width: calc(100% - 60px);
  height: 100%;
  text-align: center;
  display: ${(props) => (props.screen !== props.target ? "none" : "block")};

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    position: relative;
    width: 100%;
  }
`;

const ConstructorSidebar = styled("section")`
  max-width: 30%;
  display: flex;
  flex-direction: column;
  padding-bottom: 71px;
  position: relative;
  background-color: #fff;
  padding: 0 20px;
  margin: 20px 0;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    max-width: 100%;
    width: 100%;
    flex-direction: row;
    margin-top: auto;
    justify-content: space-between;
    position: sticky;
    bottom: 0;
    padding: 15px 0;
    flex-wrap: wrap;
    box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
    margin-bottom: 0;
    z-index: 5;
  }
`;

const BtnClose = styled("button")`
  position: absolute;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border: none;
  background-color: inherit;
  padding: 0;
  left: 30px;
  top: -33px;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    left: 0;
    top: -30px;
  }
`;

const BtnCloseImage = styled("img")`
  width: 16px;
  height: 16px;
  vertical-align: initial;
  transition: filter 0.2s ease;
  opacity: 0.3;
  &:hover {
    filter: brightness(0.7) contrast(2.5);
  }
`;

const VariantsList = styled("ul")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const VariantsItem = styled("li")`
  min-width: 240px;
`;

const PairsList = styled("ul")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 600px;
  margin: 0 auto;
`;

const SkillPositionContainer = styled("div")`
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
`;

const SettingsContainer = styled("div")`
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SettingsItemTitle = styled("b")`
  display: block;
  padding: 4px 0;
  margin-bottom: 3px;
`;

const KeywordTemplate = styled("span")<KeywordProps>`
  margin-right: 10px;
  cursor: pointer;
  border: ${(props) => props.active && "1px solid blue"};
`;

export {
  LessonTitleInput,
  ConstructorMenu,
  ScreenContainer,
  ConstructorSidebar,
  ConstructorFormInner,
  BtnClose,
  BtnCloseImage,
  PairsList,
  VariantsList,
  VariantsItem,
  SkillPositionContainer,
  SettingsContainer,
  SettingsItemTitle,
  KeywordTemplate,
};
