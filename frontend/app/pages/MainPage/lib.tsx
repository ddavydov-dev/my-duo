import styled from "@emotion/styled";
import { TABLET_MEDIA_MAX } from "~/constants";

const Main = styled("main")`
  margin: 24px auto 0;
  width: 100%;
  max-width: 1328px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  @media (max-width: ${TABLET_MEDIA_MAX}px) {
    padding: 0 16px;
  }
`;

export { Main };
