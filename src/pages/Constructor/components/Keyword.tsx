import { useState } from "react";
import { KeywordTemplate } from "./lib";

const Keyword: React.FC<{ onSet: Function; initiallyActive: boolean }> = ({
  onSet,
  children,
  initiallyActive,
}) => {
  const [isActive, setIsActive] = useState(initiallyActive);

  return (
    <KeywordTemplate
      active={isActive}
      onClick={() => {
        onSet(children);
        setIsActive(!isActive);
      }}
    >
      {children}
    </KeywordTemplate>
  );
};

export default Keyword;
