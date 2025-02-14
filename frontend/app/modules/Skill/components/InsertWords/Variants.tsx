import { useEffect, useRef } from "react";
import { VariantItemNumber } from "~/modules/Constructor/components/Levels/components/lib";
import { useSkill } from "../..";
import { VariantItem } from "../lib";
import { VariantsContainer, VariantsItem, VariantsList } from "./lib";

type VariantsProps = {
  values: string[];
  setValues: Function;
  keyDownCheck: Function;
};

function generateVariants(text: string, answer: string) {
  const variants: string[] = [];

  const words = text.split(" ");

  const rightAnswer = words[answer[0]];
  words.splice(answer[0], 1);

  variants.push(rightAnswer);

  if (words.length === 0) {
    return variants;
  }

  if (words.length > 2) {
    words.length = 2;
  }

  return [...variants, ...words];
}

export default function Variants({
  values,
  setValues,
  keyDownCheck,
}: VariantsProps) {
  const myRef = useRef<HTMLDivElement>(null);
  const { content, skillState } = useSkill();
  const { options, answer } = content;
  const { text } = options as { text: string };

  const variants = generateVariants(text, answer);

  useEffect(() => {
    if (skillState.status === "idle") {
      const timeout = setTimeout(() => {
        myRef.current?.focus();
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [skillState.status]);

  const keyDownHandler = (e: KeyboardEvent) => {
    variants.forEach((variant, idx) => {
      if (Number(e.key) === idx + 1) {
        setValues([variant]);
      }
    });
  };

  return (
    <VariantsContainer
      tabIndex={0}
      ref={myRef}
      onKeyDown={(e) =>
        keyDownCheck(e, (e: KeyboardEvent) => keyDownHandler(e))
      }
    >
      <VariantsList>
        {variants.map((variant: string, idx: number) => (
          <VariantsItem key={idx} onClick={() => setValues([variant])}>
            <VariantItemNumber isFocused={variant === values[0]}>
              {idx + 1}
            </VariantItemNumber>
            <VariantItem
              type="button"
              isFocused={variant === values[0]}
              disabled={skillState.status !== "idle"}
            >
              {variant}
            </VariantItem>
          </VariantsItem>
        ))}
      </VariantsList>
    </VariantsContainer>
  );
}
