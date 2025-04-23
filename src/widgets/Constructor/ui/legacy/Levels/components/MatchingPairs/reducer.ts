import { Variant } from "~/modules/Constructor/types";
import { Action } from "./actions";

export type State = {
  variants: Variant[];
  pairs: string[];
};

export const basicState: State = {
  variants: [],
  pairs: [],
};

export const reducer = (state: State, action: Action): State => {
  const { variants, pairs } = state;
  switch (action.type) {
    case "SETUP": {
      const { variantsCount, variants, pairs } = action.payload;
      const newVariants = [];
      if (variants.length) {
        return { ...state, variants: [...variants], pairs };
      }
      for (let i = 1; i <= variantsCount; i++) {
        newVariants.push({
          type: i - 1 < variantsCount / 2 ? "left" : "right", // Dividing on halfs.
          value: "",
          isFocused: false,
          idx: i,
          isConnected: false,
        });
      }
      return { ...state, variants: newVariants };
    }
    case "VARIANTS_SETUP": {
      const { variantsCount } = action.payload;
      const variants = [];
      for (let i = 1; i <= variantsCount; i++) {
        variants.push({
          value: "",
          isFocused: false,
          isConnected: false,
          type: null,
          idx: i,
        });
      }
      return { ...state, variants };
    }
    case "VARIANT_SET_VALUE": {
      const { idx, value } = action.payload;
      const newVariants = variants;
      newVariants[idx].value = value;
      return { ...state, variants: [...newVariants] };
    }
    case "TYPE": {
      const { value, idx } = action.payload;
      const newVariants = variants;
      newVariants[
        newVariants.indexOf(
          newVariants.find(
            (variant: Variant) => variant.idx === Number(idx)
          ) as Variant
        )
      ].value = value;
      return { ...state, variants: [...newVariants] };
    }
    case "CHOOSE": {
      const { idx } = action.payload;
      const variantItem = variants.find(
        (variant: Variant) => variant.idx === Number(idx)
      );
      if (variantItem?.type === "left") {
        const newVariants = variants.map((variant: Variant) => ({
          ...variant,
          isFocused: variant.idx === Number(idx),
        }));
        return { ...state, variants: newVariants };
      }
      const newVariants = variants.map((variant: Variant) => ({
        ...variant,
        isFocused: variant.idx === Number(idx),
      }));
      return { ...state, variants: newVariants };
    }
    case "VARIANT_CHOOSE": {
      const { idx } = action.payload;
      const newVariants = variants.map((variant: Variant) => ({
        ...variant,
        isFocused: false,
      }));
      newVariants[idx].isFocused = true;
      return { ...state, variants: [...newVariants] };
    }
    case "CONNECT": {
      const { activeIdx, idx } = action.payload;
      let newPairs = pairs;
      let exists = newPairs.find(
        (item) => item.includes(`${activeIdx}`) || item.includes(`${idx}`)
      );
      if (exists) {
        newPairs[newPairs.indexOf(exists)] = `${activeIdx}${idx}`;
      } else {
        newPairs.push(`${activeIdx}${idx}`);
      }
      return {
        ...state,
        variants: variants.map((variant: Variant) => ({
          ...variant,
          isFocused: false,
          isConnected: !!newPairs.filter((pair) =>
            pair.includes(`${variant.idx}`)
          ).length,
        })),
        pairs: newPairs,
      };
    }
    case "ADD_PAIR": {
      const newVariants = variants;
      newVariants.push({
        value: "",
        isFocused: false,
        idx: newVariants.length + 1,
        isConnected: false,
        type: null,
      });
      newVariants.push({
        value: "",
        isFocused: false,
        idx: newVariants.length + 1,
        isConnected: false,
        type: null,
      });
      return { ...state, variants: [...newVariants] };
    }
    default: {
      throw new Error(`Omg we don't know this action type`);
    }
  }
};
