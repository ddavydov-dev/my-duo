export const COMPONENT_FLEX_SPACES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const

export const ATTRIBUTES = ['tabIndex', 'className'] as const
export const AVAILABLE_TAG = [
  'div',
  'header',
  'footer',
  'section',
  'aside',
  'article',
  'nav',
  'span',
  'fieldset'
] as const
export const EVENTS = ['onClick'] as const
export const PROPERTIES = [
  'alignItems',
  'alignSelf',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'justifyContent',
  'order'
] as const
export const SPACE = COMPONENT_FLEX_SPACES
export const DEFAULT_TAG = 'div'
export const DIRECTION = ['row', 'column'] as const
