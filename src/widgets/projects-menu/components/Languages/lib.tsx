import styled from "@emotion/styled";

const ActiveLanguageButton = styled("button")`
  color: #3c3c3c;
  border: none;
  background-color: inherit;
  font-family: "Nunito";
  font-weight: 800;
  letter-spacing: 0.8px;
  cursor: pointer;
`;

const ActiveLanguageContainer = styled("div")`
  position: absolute;
  top: 40px;
  right: -30px;
  width: 200px;
  padding: 20px 0;
  z-index: 9;
`;

const LanguagesContainer = styled("div")`
  border: 2px solid #dadcde;
  border-radius: 15px;
  background-color: white;
`;

const LanguagesList = styled("ul")`
  display: flex;
  flex-direction: column;
`;

const LanguagesItem = styled("button")`
  border: none;
  border-bottom: 2px solid #dadcde;
  width: 100%;
  cursor: pointer;
  padding: 16px 20px;
  background-color: inherit;
  color: #3c3c3c;
  font-family: "Nunito";
  font-weight: 700;
  letter-spacing: 0.8px;
  text-align: left;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(175, 175, 175, 0.15);
  }
`;

const LanguagesInput = styled("input")`
  border: none;
  border-bottom: 2px solid #dadcde;
  border-radius: 0 0 10px 10px;
  width: 100%;
  cursor: pointer;
  padding: 20px 30px 20px 20px;
  background-color: inherit;
  color: #3c3c3c;
  font-family: "Nunito";
  font-weight: 700;
  letter-spacing: 0.8px;
  text-align: left;
`;

const LanguagesAddBtn = styled("button")`
  position: absolute;
  font-size: 30px;
  top: 7px;
  right: 15px;
  color: #afafaf;
`;

export {
  ActiveLanguageButton,
  ActiveLanguageContainer,
  LanguagesContainer,
  LanguagesAddBtn,
  LanguagesInput,
  LanguagesItem,
  LanguagesList,
};
