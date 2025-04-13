import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react'

import type {
  ATTRIBUTES,
  AVAILABLE_TAG,
  DEFAULT_TAG,
  EVENTS,
  PROPERTIES,
  SPACE
} from './Flex.consts'

export type WithPartialProperty<TType, TKey extends keyof TType> = Omit<TType, TKey> &
  Partial<Pick<TType, TKey>>

interface TypeByTagMap {
  div: HTMLDivElement
  header: HTMLHeadElement
  footer: HTMLElement
  section: HTMLElement
  aside: HTMLElement
  article: HTMLElement
  form: HTMLFormElement
  nav: HTMLElement
  span: HTMLSpanElement
  fieldset: HTMLElement
}

export type FlexSpaceType = (typeof SPACE)[number]
export type FlexProperties = (typeof PROPERTIES)[number]
export type FlexAsType = (typeof AVAILABLE_TAG)[number]
export type FlexEventsType = (typeof EVENTS)[number]
export type FlexAttributesType = (typeof ATTRIBUTES)[number]
export type FlexHtmlType = TypeByTagMap[FlexAsType]

interface FlexProps<TTag extends FlexAsType, TElement extends FlexHtmlType>
  extends Pick<CSSProperties, FlexProperties>,
    Pick<HTMLAttributes<TElement>, FlexAttributesType | FlexEventsType> {
  /**
   * Задаёт поведение инлайнового (строчного) блока
   */
  isInline?: boolean
  /**
   * Задаёт отступ между колонками (от 1 до 11)
   */
  space?: FlexSpaceType | [FlexSpaceType | undefined, FlexSpaceType | undefined]
  /**
   * Растягивает на всю доступную ширину
   */
  isFluid?: boolean
  /**
   * Задаёт тег
   */
  as: TTag
  /**
   * Задаёт ref
   */
  ref?: Ref<TElement>
  /**
   * Задаёт содержимое
   */
  children: ReactNode | ReactNode[]
}

/**
 * Интерфейс компонента `Flex`
 */
export type FlexPropsType =
  | {
      [TTag in FlexAsType]: FlexProps<TTag, TypeByTagMap[TTag]>
    }[FlexAsType]
  | WithPartialProperty<FlexProps<never, TypeByTagMap[typeof DEFAULT_TAG]>, 'as'>
