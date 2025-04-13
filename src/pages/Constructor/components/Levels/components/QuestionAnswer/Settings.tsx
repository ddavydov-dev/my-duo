import { useEffect } from "react";
import { useConstructor } from "~/modules/Constructor";
import {
  SettingsContainer,
  SettingsItemTitle,
} from "~/modules/Constructor/components/lib";
import { getWordsOutOfText } from "~/modules/Constructor/utils/getWordsOutOfText";
import { isItemInArray } from "~/utils";
import { StepOptions } from "../../types";
import { WordsItem, WordsList } from "./lib";

export default function Settings({
  options,
  answer,
}: {
  options: StepOptions;
  answer: string;
}) {
  const { setStepOptions } = useConstructor();

  const { keywords } = options as { keywords: string[] };

  function setKeywords(keywords: string[]) {
    setStepOptions({ ...options, keywords });
  }

  // In this effect we check if the answer was changed but old keywords stayed in the array. If so, we remove them.
  useEffect(() => {
    const words = answer ? getWordsOutOfText(answer) : [];
    const newKeywords = keywords.filter((keyword) =>
      words.find((word) => word === keyword)
    );

    if (keywords.length !== newKeywords.length) {
      setKeywords(newKeywords);
    }
  }, [answer]);

  function onWordHandler(word: string) {
    const newKeywords = keywords;
    if (isItemInArray(keywords, word)) {
      newKeywords.splice(newKeywords.indexOf(word), 1);
      return setKeywords(newKeywords);
    }
    return setKeywords([...newKeywords, word]);
  }

  const isEditing = Boolean(Array.isArray(answer));
  const words: string[] = answer ? getWordsOutOfText(answer) : [];

  return (
    <SettingsContainer>
      <WordsList>
        <li>
          <SettingsItemTitle>
            Choose words to be enough for an answer:
          </SettingsItemTitle>
        </li>

        {!isEditing &&
          words.map((word, index) => (
            <WordsItem
              key={index}
              onClick={() => onWordHandler(word)}
              isActive={isItemInArray(keywords, word)}
            >
              {word}
            </WordsItem>
          ))}
      </WordsList>
    </SettingsContainer>
  );
}
