import styled from "@emotion/styled";

type OverlayProps = {
  active: boolean;
};

const Overlay = styled("div")<OverlayProps>`
  background: rgba(28, 97, 130, 0.1);
  bottom: 0;
  left: 0;
  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 71px;
  transition: opacity 0.3s;
  z-index: 3;
`;

export { Overlay };
