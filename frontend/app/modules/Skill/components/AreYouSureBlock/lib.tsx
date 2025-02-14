import styled from "@emotion/styled";
import { Link } from "@remix-run/react";
import { PHONE_MEDIA_MAX } from "~/constants";

const Wrapper = styled("div")`
  background: #fff;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 6;
`;

const Inner = styled("div")`
  max-width: 1140px;
  padding: 40px 24px;
  margin: 0 auto;
`;

const Grid = styled("div")`
  display: grid;
  grid-gap: 16px 40px;
  align-items: center;
  grid-template-areas:
    "title dismiss quit"
    "description dismiss quit";
  grid-template-columns: 1fr repeat(2, minmax(min-content, 172px));

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    grid-template-areas: none;
    grid-template-columns: none;
  }
`;

const Title = styled("span")`
  grid-area: title;
  min-width: 172px;

  font-family: "Nunito";
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    grid-area: unset;

    text-align: center;
  }
`;

const Description = styled("span")`
  font-size: 19px;
  grid-area: description;
  line-height: 24px;
  padding: 0;
  color: #777;
  font-family: "Nunito";

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    grid-area: unset;
    text-align: center;
  }
`;

const QuitButton = styled(Link)`
  border: 0 solid transparent;
  background-color: #1cb0f6;
  color: #fff;
  border-color: white;
  border-width: 0;
  border-bottom-width: 4px;
  border-bottom-color: #1899d6;
  height: 50px;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  font-family: "Nunito";
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.8px;
  border-radius: 15px;
  padding: 0 20px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transition: filter 0.2s;
  box-sizing: border-box;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    border: none;
    height: 46px;
    margin-top: 4px;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    width: 100%;
  }
`;

const QuitButtonWrapper = styled("div")`
  margin-right: -12px;
  grid-area: quit;

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    margin-right: 0;
    grid-area: unset;
  }
`;

const StayButton = styled("button")`
  border: 0 solid transparent;
  background-color: #fff;
  color: #afafaf;
  border-color: #e5e5e5;
  border-width: 2px;
  border-bottom-width: 4px;
  border-bottom-color: #e5e5e5;
  height: 50px;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  font-family: "Nunito";
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.8px;
  border-radius: 15px;
  padding: 0 20px;
  display: block;
  transition: filter 0.2s;
  box-sizing: border-box;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    border: none;
    height: 46px;
    margin-top: 4px;
  }

  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    width: 100%;
    border: none;
    color: #1cb0f6;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

const StayButtonWrapper = styled("div")`
  margin-right: -12px;
  grid-area: dismiss;
  @media (max-width: ${PHONE_MEDIA_MAX}px) {
    grid-area: unset;
    margin-right: 0;
  }
`;

export {
  Wrapper,
  Inner,
  Grid,
  Title,
  Description,
  QuitButton,
  StayButton,
  QuitButtonWrapper,
  StayButtonWrapper,
};
