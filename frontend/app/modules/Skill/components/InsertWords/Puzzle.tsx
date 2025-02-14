import { cleanWordFromSigns } from "~/utils";
import { useSkill } from "../..";
import { VariantItem } from "../lib";
import { PuzzleContainer, PuzzleItem, PuzzleList } from "./lib";

type PuzzleProps = {
  values: string[];
  setValues: Function;
};

export default function Puzzle({ values, setValues }: PuzzleProps) {
  const { content } = useSkill();
  const { answer: contentAnswer, options } = content;
  const { text } = options;

  const insertText = text as string;
  const selectVariant = (variant: string) => {
    setValues((prevArray: string[]) => {
      const empty = prevArray.find((item, idx) => {
        if (item === " " || item.length === 0 || !!item === false) {
          return { item, idx };
        }
      });
      const inx = prevArray.indexOf(empty as string);
      if (inx.toString() && inx !== -1) {
        const newArr = prevArray;
        newArr[inx] = variant;
        return [...newArr];
      }
      return [...prevArray, variant];
    });
  };

  const indexes = contentAnswer.length === 1 ? contentAnswer : contentAnswer;

  const words: string[] = indexes.map((idx) => {
    const textItem = insertText.split(" ")[Number(idx)];

    return cleanWordFromSigns(textItem).newWord;
  });

  return (
    <PuzzleContainer>
      <PuzzleList>
        {words.map((answer, idx: number) => {
          const alreadyChoosen = !!values.find((value) => value === answer);
          return (
            <PuzzleItem alreadyChoosen={alreadyChoosen} key={idx}>
              <VariantItem
                type="button"
                isFocused={false}
                onClick={() => selectVariant(answer)}
                disabled={alreadyChoosen}
              >
                {answer}
              </VariantItem>
            </PuzzleItem>
          );
        })}
      </PuzzleList>
    </PuzzleContainer>
  );
}
