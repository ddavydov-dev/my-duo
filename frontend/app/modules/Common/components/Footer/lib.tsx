import styled from "@emotion/styled";
import { PHONE_MEDIA_MAX } from "~/constants";

const FooterLine = styled("hr")`
  border: 0;
  border-top: 2px solid #e5e5e5;
  margin: 0 0 48px;
`;

const FooterText = styled("p")`
  text-align: center;
  color: #afafaf;
  font-family: Nunito;
  margin: 0;
`;

const LinkWithHover = styled("a")`
  &:hover {
    filter: brightness(1.3);
  }
`;

const MainFooter = styled("footer")`
  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    display: none;
  }
`;

export { FooterLine, FooterText, LinkWithHover, MainFooter };
