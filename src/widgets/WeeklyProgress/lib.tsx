import styled from "@emotion/styled";
import { TABLET_MEDIA_MAX } from "~/constants";

const WeeklyProgressContainer = styled("section")`
  position: relative;
  display: flex;
  min-width: 372px;
  @media (max-width: ${TABLET_MEDIA_MAX}px) {
    display: none;
  }
`;

const ExpProgressBlock = styled("section")`
  background: #fff;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
  padding: 24px;
  position: fixed;
`;

const ExpProgressTitle = styled("h2")`
  color: #3c3c3c;
  font-size: 24px;
  line-height: 26px;
  margin: 0 0 25px;
  font-family: Nunito;
  font-weight: 700;
`;

export { WeeklyProgressContainer, ExpProgressBlock, ExpProgressTitle };
