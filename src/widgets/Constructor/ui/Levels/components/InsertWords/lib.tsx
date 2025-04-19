import styled from "@emotion/styled";

type WordsItemProps = {
  isActive: boolean;
};

const WordsList = styled("ul")`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: none;
  align-items: center;
  margin-bottom: 30px;
`;

const WordsItem = styled("li")<WordsItemProps>`
  margin-left: 3px;
  margin-bottom: 3px;
  padding: 3px 6px;
  border: 1.5px solid #fff;
  border-color: ${(props) => (props.isActive ? "#1cb0f6" : "#fff")};
  border-radius: 15px;
  cursor: pointer;
  transition: border-color 0.2s;
  background-color: ${(props) => (props.isActive ? "#1cb0f6" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "inherit")};
  &:hover {
    border-color: #1cb0f6;
  }
`;

export { WordsList, WordsItem };
