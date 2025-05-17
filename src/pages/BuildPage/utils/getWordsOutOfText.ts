import { cleanWordFromSigns } from "~/utils";

export function getWordsOutOfText(text: string) {
  const wordsWithPossibleSigns = text.split(" ");
  const words = wordsWithPossibleSigns.map(
    (word) => cleanWordFromSigns(word).newWord
  );
  return words;
}
