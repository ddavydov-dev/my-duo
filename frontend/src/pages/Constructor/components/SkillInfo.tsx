import { useEffect } from "react";
import ErrorMessage from "~/modules/Common/components/ErrorMessage";
import { Legend } from "~/modules/Common/components/FormTags/lib";
import { LessonProgress } from "~/modules/Common/components/SkillsList/components/SkillsItem/lib";
import { ActionData } from "~/routes/$language/new";
import { useConstructor } from "..";

import { LessonTitleInput, ScreenContainer } from "./lib";

export default function SkillInfo({
  isEditingSkill,
  actionData,
}: {
  isEditingSkill: boolean;
  actionData: ActionData;
}) {
  const { setBasicInfoReady, currentScreen, skillTitle, setSkillTitle } =
    useConstructor();

  useEffect(() => {
    setBasicInfoReady(Boolean(skillTitle.length));
  }, [skillTitle]);

  return (
    <ScreenContainer screen={currentScreen} target="Skill">
      <Legend>Skill info</Legend>
      <LessonProgress exp={0} style={{ margin: "40px auto 0 auto" }} />
      <LessonTitleInput
        type="text"
        name="title"
        placeholder="Enter skill title"
        value={skillTitle}
        onChange={(e) => setSkillTitle(e.target.value)}
        required
        autoFocus={!isEditingSkill && true}
      />
      {actionData?.errors?.title && (
        <ErrorMessage role="alert" id="title-error">
          {actionData.errors.title}
        </ErrorMessage>
      )}

      {/** A feature for next release */}
      {/* {lastAddedSkills?.length > 0 && (
        <SkillPosition
          lastAddedSkills={lastAddedSkills}
          isEditingSkill={isEditingSkill}
        />
      )} */}
    </ScreenContainer>
  );
}
