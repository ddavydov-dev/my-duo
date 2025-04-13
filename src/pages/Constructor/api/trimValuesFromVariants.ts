import { Variant } from "../components/Levels/components/MatchingPairs/reducer";
import { StepOptions } from "../components/Levels/types";

export function trimValuesFromVariants(options: StepOptions) {
  const newVariants = options.variants as Variant[];
  return {
    ...options,
    variants: newVariants.map((variant) => ({
      ...variant,
      value: variant.value.trim(),
    })),
  };
}
