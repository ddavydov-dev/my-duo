import { useEffect, useReducer } from "react";
import { useConstructor } from "~/modules/Constructor";
import { PairsList } from "~/modules/Constructor/components/lib";
import { LessonButton, LessonTitle } from "~/modules/Skill/components/lib";
import { VariantItemNumber, VariantItemInput } from "../lib";
import { pairsChoose, pairsConnect, pairsSetup, pairsType } from "./actions";
import { reducer, Variant } from "./reducer";

const initialState = {
  variantsCount: 4,
  initialVariants: [],
  number: 0,
  answer: [],
  stepType: "",
  options: {},
};

export default function MatchingPairs({ state = initialState }) {
  const {
    number,
    answer,
    stepType,
    options,
    variantsCount = 4,
    initialVariants = [],
  } = state;

  const { setStepReady, setAnswer } = useConstructor();

  const [{ variants, pairs }, dispatch] = useReducer(reducer, {
    variants: initialVariants,
    pairs: [],
  });

  const isEditing = answer.length;

  useEffect(() => {
    if (isEditing) {
      return dispatch(pairsSetup(answer.length, options.variants, answer));
    }
    dispatch(pairsSetup(variantsCount, initialVariants, answer as string[]));
  }, []);

  useEffect(() => {
    if (pairs.length === variantsCount / 2) {
      setAnswer(pairs, number);
      setStepReady(true, number);
    }
    if (pairs.length !== variantsCount / 2) {
      setStepReady(false, number);
    }
  }, [pairs.length, pairs]);

  return stepType === "Pairs" ? (
    <>
      <fieldset style={{ maxWidth: 600, margin: "0 auto" }}>
        <input type="hidden" name={`answer${number}`} value={answer} />

        <LessonTitle>Connect pairs</LessonTitle>

        <div style={{ marginTop: 30 }}>
          <PairsList>
            {variants.map((variant: Variant) => (
              <li key={variant.idx} style={{ marginBottom: 5 }}>
                <label style={{ position: "relative" }}>
                  <VariantItemNumber
                    onClick={(e) => {
                      e.preventDefault();
                      const activeIdx = variants.filter(
                        (variantItem: Variant) => variantItem.isFocused
                      )[0]?.idx;
                      if (
                        variants.filter(
                          (variantItem: Variant) => variantItem.isFocused
                        ).length === 1 ||
                        variant.isFocused
                      ) {
                        dispatch(pairsConnect(activeIdx, variant.idx));
                      } else {
                        dispatch(pairsChoose(variant.idx));
                      }
                    }}
                    isConnected={variant.isConnected as boolean}
                    isFocused={variant.isFocused}
                  >
                    {variant.idx}
                  </VariantItemNumber>
                  <VariantItemInput
                    type="text"
                    name={`variant${number}`}
                    placeholder="type first variant"
                    value={variant.value}
                    onChange={(e) =>
                      dispatch(pairsType(e.target.value, variant.idx))
                    }
                    required
                  />
                </label>
              </li>
            ))}
            <LessonButton
              type="button"
              onClick={() => dispatch({ type: "ADD_PAIR" })}
              active={true}
              style={{
                backgroundColor: "#1cb0f6",
                borderBottomColor: "#1899d6",
              }}
            >
              Add pair
            </LessonButton>
          </PairsList>
        </div>
      </fieldset>
    </>
  ) : null;
}
