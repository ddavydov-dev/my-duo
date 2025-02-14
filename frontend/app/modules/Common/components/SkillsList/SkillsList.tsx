import { nanoid } from "nanoid";
import Footer from "~/modules/Common/components/Footer";
import SkillsItem from "./components/SkillsItem";
import {
  LessonsBlock,
  SkillsLineBlock,
  SkillsListContainer,
  SkillsListInner,
} from "./lib";
import PracticeSkills from "./components/PracticeSkills";

export type SkillsListItemType = {
  id: string;
  title: string;
  lessonsAmount: number;
  currentLesson: number;
  lineNumber: number;
};

export default function SkillsList({
  skills,
  languageTitle,
}: {
  skills: SkillsListItemType[];
  languageTitle: string;
}) {
  const lineNumbers = [
    ...new Set(skills.map((dataItem) => dataItem.lineNumber)),
  ];

  return (
    <SkillsListContainer>
      <SkillsListInner>
        {skills.length > 0 && <PracticeSkills />}
        <SkillsLineBlock>
          {lineNumbers.map((lineNumber) => (
            <LessonsBlock key={nanoid()}>
              {skills.map((dataItem) => {
                if (dataItem.lineNumber === lineNumber) {
                  return (
                    <SkillsItem
                      key={dataItem.id}
                      {...dataItem}
                      editLink={`/${languageTitle}/edit/${dataItem.id}`}
                    />
                  );
                }
              })}
            </LessonsBlock>
          ))}
        </SkillsLineBlock>
      </SkillsListInner>
      <Footer />
    </SkillsListContainer>
  );
}
