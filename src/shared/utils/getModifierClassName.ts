import { camelCase } from 'tiny-case'

type GetModifierClassNameUtilType = <TStyles extends Record<string, string>>(
  styles: TStyles,
  property: string,
  value?: string | number
) => string

export const getModifierClassName: GetModifierClassNameUtilType = (styles, property, value) =>
  (value && styles[camelCase(`${property}_${value.toString()}`)]) || ''
