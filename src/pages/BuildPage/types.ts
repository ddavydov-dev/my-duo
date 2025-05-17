import { Skill } from "@prisma/client";

export type ConstructorSkillData = Pick<
  Skill,
  "id" | "title" | "stepIDs" | "currentLesson" | "lineNumber"
>;

export type Variant = {
  type: string | null;
  value: string;
  idx: number;
  isFocused: boolean;
  isConnected: boolean | null;
};
