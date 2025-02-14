import styled from "@emotion/styled";

const LoginTitle = styled("h1")`
  font-size: 26px;
  margin: 10px 0 15px;
  font-family: Nunito;
  font-weight: 700;
  text-align: center;
`;

const LoginContainer = styled("section")`
  padding: 30px;
  height: 100vh;
  left: 0;
  overflow-y: auto;
  top: 0;
  width: 100vw;
  box-sizing: border-box;
`;

const LoginContinerInner = styled(`div`)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const LoginInput = styled("input")`
  background: transparent;
  flex-grow: 1;
  line-height: 27px;
  width: 100%;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
  font-size: 100%;
  background: #f7f7f7;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
  padding: 8px 16px;
  display: inline-flex;
  margin-top: 8px;
`;

const LoginButton = styled("button")`
  width: 100%;
  letter-spacing: 0.8px;
  font: 700 15px "Nunito";
  padding: 0 16px;
  height: 50px;
  color: white;
  border: none;
  border-bottom: 4px solid rgba(133, 133, 133, 0.5);
  border-radius: 16px;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #1cb0f6;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    margin-top: 4px;
    border: none;
    height: 46px;
  }
`;

const LoginToggle = styled("label")`
  position: absolute;
  top: 0;
  right: 0;
  letter-spacing: 0.8px;
  font: 700 15px "Nunito";
  line-height: 1.2;
  padding: 0 16px;
  height: 50px;
  color: #1cb0f6;
  border: 2px solid #e5e5e5;
  border-bottom: 4px solid #e5e5e5;
  border-radius: 16px;
  cursor: pointer;
  text-transform: uppercase;
  background-color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    border-bottom-width: 2px;
  }
`;

export {
  LoginButton,
  LoginContainer,
  LoginContinerInner,
  LoginInput,
  LoginTitle,
  LoginToggle,
};
