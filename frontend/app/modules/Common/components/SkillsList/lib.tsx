import styled from "@emotion/styled";
import { TABLET_MEDIA_MAX, PHONE_MEDIA_MAX } from "~/constants";

const LessonsBlock = styled("div")`
  grid-column-gap: 12px;
  display: grid;
  grid-auto-columns: calc(33.33333% - 8px);
  grid-auto-flow: column;
  justify-content: center;
  padding: 16px 12px;
`;

const SkillsListContainer = styled("section")`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
  flex-grow: 1;
  @media (max-width: ${TABLET_MEDIA_MAX}px) {
    padding: 0 20px;
    width: 100%;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    padding: 0 10px;
    height: calc(100vh - 165px);
    overflow-y: scroll;
  }
`;

const SkillsListInner = styled("div")`
  display: flex;
  flex-grow: 1;
`;

const SkillsLineBlock = styled("div")`
  width: 100%;
  max-width: 440px;
  margin: 0 auto 38px auto;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    max-width: 100%;
    margin-left: -72px;
  }
`;

export { LessonsBlock, SkillsLineBlock, SkillsListContainer, SkillsListInner };
