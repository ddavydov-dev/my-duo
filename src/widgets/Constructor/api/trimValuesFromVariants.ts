import { Variant } from '../ui/Levels/components/MatchingPairs/reducer'
import { StepOptions } from '../ui/Levels/types'

export function trimValuesFromVariants(options: StepOptions) {
  const newVariants = options.variants as Variant[]
  return {
    ...options,
    variants: newVariants.map(variant => ({
      ...variant,
      value: variant.value.trim()
    }))
  }
}
