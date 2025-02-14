import Icon from "~/styles/practice_last_added.svg";
import {
  PracticeSkillsContainer,
  PracticeSkillsLink,
  PracticeSkillsWrapper,
} from "./lib";

export default function PracticeSkills() {
  return (
    <PracticeSkillsContainer>
      <PracticeSkillsWrapper>
        <PracticeSkillsLink to="/practice" title="Practice">
          <img
            src={Icon}
            alt="Practice last added lessons"
            height={32}
            width={38.7}
          />
        </PracticeSkillsLink>
      </PracticeSkillsWrapper>
    </PracticeSkillsContainer>
  );
}
