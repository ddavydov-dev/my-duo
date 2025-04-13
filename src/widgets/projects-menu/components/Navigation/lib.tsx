import styled from "@emotion/styled";
import { NavLink } from "@remix-run/react";
import { PHONE_MEDIA_MAX, TABLET_MEDIA_MAX } from "~/constants";
import { HorizontalList, ListItem } from "../../lib";

const NavigationList = styled(HorizontalList)`
  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    border-top: 2px solid #dadcde;
    min-height: 68px;
    justify-content: space-evenly;
  }
`;

const NavigationListItem = styled(ListItem)`
  @media (max-width: ${TABLET_MEDIA_MAX}px) {
    margin: 0 24px;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    flex-grow: 1;
    height: 68px;
  }
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Nunito";
  font-weight: 800;
  font-size: 15px;
  color: #afafaf;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  transition: filter 0.2s ease;
  &:hover {
    filter: brightness(0.7) contrast(2.5);
  }
  &.active:hover {
    filter: none;
  }
  @media (max-width: 720px) {
    font-size: 0;
  }
`;

const NavigationIcon = styled("img")`
  margin-right: 10px;
  width: 36px;
  height: 36px;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    margin: 0;
  }
`;

export { NavigationList, NavigationListItem, NavigationLink, NavigationIcon };
