import styled from "@emotion/styled";
import { Link } from "@remix-run/react";

const PracticeSkillsContainer = styled("div")`
  display: flex;
  align-items: flex-end;
`;

const PracticeSkillsWrapper = styled("div")`
  height: 72px;
  width: 72px;
  border-radius: 50%;
  border: solid #e5e5e5;
  border-width: 2px 2px 4px;
  position: sticky;
  margin-bottom: 54px;
  bottom: 24px;
  background-color: #fff;
  transition: filter 0.1s ease;
  &:hover {
    filter: brightness(0.9);
  }
`;

const PracticeSkillsLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  filter: inherit;
`;

export { PracticeSkillsContainer, PracticeSkillsLink, PracticeSkillsWrapper };
