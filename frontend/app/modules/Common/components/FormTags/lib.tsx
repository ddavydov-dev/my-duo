import styled from "@emotion/styled";
import { PHONE_MEDIA_MAX } from "~/constants";

type FormButtonProps = {
  active?: boolean;
};

type KeywordProps = {
  active: boolean;
};

const Input = styled("input")`
  background-color: #f7f7f7;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 12px;
  width: 100%;
`;

const Textarea = styled("textarea")`
  background-color: rgb(247, 247, 247);
  border: 2px solid rgb(229, 229, 229);
  border-radius: 10px;
  padding: 10px 12px;
  min-height: 170px;
  width: 100%;
  -webkit-appearance: none;
  resize: none;
  flex-grow: 1;
  box-sizing: border-box;
  position: relative;
  z-index: 1;

  line-height: 24px;
  color: #3c3c3c;
  font-size: 19px;
  font-family: "Nunito";
  font-weight: 400;
  letter-spacing: 1px;
`;

const Fieldset = styled("fieldset")`
  margin-top: 20px;
`;

const InputTextLabel = styled("label")`
  width: 49%;
  margin-right: 1%;
`;

const TextareaLabel = styled("label")`
  width: 100%;
`;

const LabelText = styled("span")`
  margin-bottom: 10px;
  display: block;
  cursor: pointer;
  color: #4b4b4b;
  font-size: 15px;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  letter-spacing: 0.6px;
`;

const Legend = styled("legend")`
  color: #4b4b4b;
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  font-family: "Nunito", sans-serif;
`;

const FormButton = styled("button")<FormButtonProps>`
  background-color: ${(props) =>
    props.active ? "#78C83D" : props.disabled ? "#E5E5E5" : "#fff"};
  color: ${(props) =>
    props.active ? "#fff" : props.disabled ? "#AFAFAF" : "#1cb0f6"};
  border: ${(props) => (props.active ? "none" : "2px solid #e5e5e5")};
  height: 50px;
  box-shadow: ${(props) =>
    props.active ? "0px -4px 0px 0px rgba(108, 164, 48, 1) inset" : "none"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  width: 150px;
  text-transform: uppercase;
  font-family: "Nunito";
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.8px;
  border-radius: 15px;
  padding: 0 20px;
  display: ${(props) => (props.hidden ? "none" : "block")};
  transition: filter 0.2s;
  order: 3;
  &:hover:enabled {
    filter: brightness(1.1);
  }
  &:active:enabled {
    filter: brightness(1.1);
    height: 46px;
    transform: translateY(4px);
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    width: 100px;
  }
`;

export {
  Input,
  Textarea,
  Fieldset,
  InputTextLabel,
  TextareaLabel,
  LabelText,
  Legend,
  FormButton,
};
