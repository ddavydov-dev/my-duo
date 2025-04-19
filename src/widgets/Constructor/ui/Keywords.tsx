import { useEffect, useState } from "react";
import { isItemInArray } from "~/utils";
import Keyword from "./Keyword";

export default function Keywords({
  answer,
  onSet,
  initialKeywords = [],
}: {
  initialKeywords: string[];
  answer: string;
  onSet: Function;
}) {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);

  useEffect(() => {
    onSet(keywords);
  }, [keywords]);

  const isEditing = Boolean(Array.isArray(answer));

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {!isEditing &&
        answer.split(" ").map((item: string, idx: number) => {
          if (item.includes(",")) {
            item = item.slice(0, -1);
          }
          return (
            <Keyword
              key={idx}
              onSet={(word: string) =>
                setKeywords((prevArr: string[]) => {
                  if (isItemInArray(prevArr, item)) {
                    prevArr.splice(prevArr.indexOf(word), 1);
                    return [...prevArr];
                  } else {
                    return [...prevArr, word];
                  }
                })
              }
              initiallyActive={!!keywords.find((keyword) => keyword === item)}
            >
              {item}
            </Keyword>
          );
        })}
    </div>
  );
}
