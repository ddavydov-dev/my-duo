import { Skill } from "@prisma/client";
import {
  LessonsContainer,
  LessonBlock,
  LessonProgress,
  LessonProgressInner,
} from "~/modules/Common/components/SkillsList/components/SkillsItem/lib";
import { LessonsBlock } from "~/modules/Common/components/SkillsList/lib";
import { LessonTitle } from "~/modules/Skill/components/lib";

import { useConstructor } from "..";
import { SkillPositionContainer } from "./lib";

export default function SkillPosition({
  lastAddedSkills,
  isEditingSkill,
}: {
  lastAddedSkills: Skill[];
  isEditingSkill: boolean;
}) {
  const { skillLineNumber, setSkillLineNumber, skillTitle } = useConstructor();
  return (
    <SkillPositionContainer>
      <h2 style={{ marginTop: 60 }}>Position</h2>
      <LessonsBlock>
        {lastAddedSkills.map((skill) => (
          <LessonsContainer key={skill.id}>
            <LessonBlock>
              <button
                type="button"
                aria-labelledby={skill.title}
                style={{ cursor: "default", opacity: 0.3 }}
              >
                <LessonProgress
                  exp={(skill.currentLesson / skill.lessonsAmount) * 100}
                >
                  <LessonProgressInner isDisabled={true} />
                </LessonProgress>
                <LessonTitle>{skill.title}</LessonTitle>
              </button>
            </LessonBlock>
          </LessonsContainer>
        ))}
        {lastAddedSkills.length < 3 && !isEditingSkill && (
          <LessonsContainer key={"312dsdf"}>
            <LessonBlock>
              <button
                type="button"
                aria-labelledby={"121"}
                onClick={() =>
                  setSkillLineNumber(lastAddedSkills[0].lineNumber)
                }
              >
                <LessonProgress exp={0} style={{ fontSize: "39px" }}>
                  {lastAddedSkills[0].lineNumber === skillLineNumber ? (
                    <LessonProgressInner isDisabled={true} />
                  ) : (
                    "+"
                  )}
                </LessonProgress>

                <LessonTitle>
                  {skillTitle.length ? skillTitle : "Skill title"}
                </LessonTitle>
              </button>
            </LessonBlock>
          </LessonsContainer>
        )}
        {lastAddedSkills.length < 3 && isEditingSkill && (
          <LessonBlock>
            <button
              type="button"
              aria-labelledby={"121"}
              onClick={() =>
                setSkillLineNumber(lastAddedSkills[0].lineNumber + 1)
              }
            >
              <LessonProgress exp={0} style={{ fontSize: "39px" }}>
                {lastAddedSkills[0].lineNumber + 1 === skillLineNumber ? (
                  <LessonProgressInner isDisabled={true} />
                ) : (
                  "+"
                )}
              </LessonProgress>
              {!isEditingSkill && (
                <LessonTitle>
                  {skillTitle.length ? skillTitle : "Skill title"}
                </LessonTitle>
              )}
            </button>
          </LessonBlock>
        )}
      </LessonsBlock>

      <LessonBlock>
        <button
          type="button"
          aria-labelledby={"121"}
          onClick={() => setSkillLineNumber(lastAddedSkills[0].lineNumber + 1)}
        >
          <LessonProgress exp={0} style={{ fontSize: "39px" }}>
            {lastAddedSkills[0].lineNumber + 1 === skillLineNumber ? (
              <LessonProgressInner isDisabled={true} />
            ) : (
              "+"
            )}
          </LessonProgress>
          {!isEditingSkill && (
            <LessonTitle>
              {skillTitle.length ? skillTitle : "Skill title"}
            </LessonTitle>
          )}
        </button>
      </LessonBlock>
    </SkillPositionContainer>
  );
}
