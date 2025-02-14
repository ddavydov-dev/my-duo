import CloseIcon from "~/styles/close.svg";
import {
  ProgressBar,
  ProgressBarContainer,
  LeaveLessonButton,
  LeaveLessonLink,
} from "./lib";
import { useSkill } from "~/modules/Skill";
import { BtnCloseImage } from "~/modules/Constructor/components/lib";

const Progress = () => {
  const { progress, leave } = useSkill();
  return (
    <ProgressBarContainer>
      {progress === 0 ? (
        <LeaveLessonLink to="/">
          <BtnCloseImage src={CloseIcon} alt="Close the skill" />
        </LeaveLessonLink>
      ) : (
        <LeaveLessonButton onClick={() => leave()}>
          <BtnCloseImage src={CloseIcon} alt="Close the skill" />
        </LeaveLessonButton>
      )}

      <ProgressBar progress={progress} />
    </ProgressBarContainer>
  );
};

export default Progress;
