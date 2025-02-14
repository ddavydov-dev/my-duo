import { useState } from "react";
import { Variant } from "~/modules/Constructor/types";
import { LessonTitle, PairsItem, PairsList, VariantItem } from "./lib";

type PairsScreenProps = {
  variants: Variant[];
  checkAnswer: Function;
  userAnswer: string[];
};

export default function PairsScreen({
  variants,
  checkAnswer,
  userAnswer,
}: PairsScreenProps) {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  const isVariantDisabled = (idx: number) => {
    if (
      userAnswer.find((answerItem) => answerItem.includes((idx + 1).toString()))
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <LessonTitle>Connect pairs</LessonTitle>

      <PairsList>
        {variants.map(({ value, isFocused }, idx: number) => (
          <PairsItem
            key={idx}
            onClick={(evt) => {
              const target = evt.target as HTMLInputElement;
              if (isVariantDisabled(idx)) {
                return;
              }
              if (activeIdx === -1) {
                return setActiveIdx(Number(target.id));
              }
              checkAnswer(`${activeIdx}${target.id}`);
              setActiveIdx(-1);
            }}
          >
            <VariantItem
              type="button"
              id={(idx + 1).toString()}
              disabled={isVariantDisabled(idx)}
              isDisabled={isVariantDisabled(idx)}
              isFocused={isFocused || activeIdx === idx + 1}
            >
              {value}
            </VariantItem>
          </PairsItem>
        ))}
      </PairsList>
    </>
  );
}
