import { useEffect, useReducer } from "react";
import {
  StepContent,
  StepInner,
  VariantItemInput,
  VariantItemNumber,
} from "../lib";
import { reducer } from "../MatchingPairs/reducer";
import {
  variantChoose,
  variantSetValue,
  variantsSetup,
} from "../MatchingPairs/actions";
import { useConstructor } from "../../../..";
import {
  VariantsItem,
  VariantsList,
} from "~/modules/Constructor/components/lib";
import { Textarea } from "~/modules/Common/components/FormTags/lib";
import { Variant } from "~/modules/Constructor/types";

const initialState = {
  variantsCount: 3,
  question: "",
  variants: [],
  id: "",
  answer: "",
  stepType: "",
  options: {
    variants: [],
    question: "",
  },
};

export default function Variants({ state = initialState }) {
  const { id, answer, stepType, variantsCount = 3, options } = state;
  const { question, variants: initialVariants } = options as {
    question: string;
    variants: Variant[];
  };

  const { setStepReady, setAnswer, setStepOptions } = useConstructor();
  const [{ variants }, dispatch] = useReducer(reducer, {
    variants: initialVariants,
    pairs: [],
  });

  useEffect(() => {
    if (variants.length === 0) {
      dispatch(variantsSetup(variantsCount));
    }
  }, [variantsCount]);

  useEffect(() => {
    const areVariantsEmpty = variants.filter(
      (variant: Variant) => variant.value.length === 0
    ).length;

    if (areVariantsEmpty) {
      return setStepReady(false, id);
    }

    if (
      variants.find(
        (variant: Variant) => variant.isFocused || variant.value === answer[0]
      )
    ) {
      setStepReady(true, id);
      setVariants(variants);
    } else {
      return setStepReady(false, id);
    }

    if (question.length) {
      setStepReady(true, id);
      setVariants(variants);
    } else {
      setStepReady(false, id);
    }
  }, [variants, question]);

  function setQuestion(question: string) {
    return setStepOptions({ ...options, question });
  }

  function setVariants(variants: Variant[]) {
    return setStepOptions({ ...options, variants });
  }

  return stepType === "Variants" ? (
    <StepContent>
      <StepInner>
        <div style={{ marginTop: 30 }}>
          <Textarea
            placeholder="Type question"
            style={{ minHeight: 100, marginBottom: 20 }}
            value={question === null ? "" : question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <VariantsList>
            {variants.map((variant: Variant, index) => (
              <VariantsItem
                key={variant.idx}
                style={{ marginBottom: 5, width: "100%" }}
              >
                <label style={{ position: "relative" }}>
                  <VariantItemNumber
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(variantChoose(index));
                      setAnswer(variant.value, id);
                    }}
                    isFocused={variant.isFocused || variant.value === answer[0]}
                  >
                    {variant.idx}
                  </VariantItemNumber>
                  <VariantItemInput
                    type="text"
                    placeholder="Type variant"
                    value={variant.value}
                    onChange={(e) => {
                      dispatch(variantSetValue(index, e.target.value));

                      if (variant.isFocused) {
                        setAnswer(e.target.value, id);
                      }
                    }}
                    required
                  />
                </label>
              </VariantsItem>
            ))}
          </VariantsList>
        </div>
      </StepInner>
    </StepContent>
  ) : null;
}
