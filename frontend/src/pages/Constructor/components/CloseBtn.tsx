import Close from "~/styles/close.svg";
import { BtnClose, BtnCloseImage } from "./lib";

export default function CloseBtn({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  return (
    <BtnClose type="button" onClick={onClickHandler}>
      <BtnCloseImage src={Close} alt="Close" />
    </BtnClose>
  );
}
