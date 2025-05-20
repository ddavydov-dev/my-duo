// import { FC, ReactNode } from 'react'
// import clsx from 'clsx'
// import Icon from '@/shared/ui/Icon'
// import { ActionGroup, Action } from '@/pages/BuildPage/ui/ActionGroup'

// interface SideItemProps {
//   title: string
//   isActive?: boolean
//   isExpandable?: boolean
//   isOpen?: boolean
//   onToggle?: () => void
//   actions: Action[]
//   children?: ReactNode
// }

// export const SideItem: FC<SideItemProps> = ({
//   title,
//   isActive = false,
//   isExpandable = false,
//   isOpen = false,
//   actions,
//   onToggle,
//   children
// }) => (
//   <div className="flex flex-col gap-1">
//     <header
//       onClick={onToggle}
//       className={clsx(
//         'relative group/header flex items-center gap-2 rounded-lg transition-colors',
//         isActive ? 'bg-iguana text-active-menu' : 'bg-white hover:bg-polar'
//       )}
//     >
//       {isExpandable && (
//         <Icon
//           name="arrow"
//           className={clsx(
//             'w-4 ml-1 transition-transform',
//             isOpen && 'rotate-90 stroke-active-menu'
//           )}
//         />
//       )}
//       <span className={clsx('font-semibold truncate', isActive ? 'text-active-menu' : 'text-hare')}>
//         {title}
//       </span>
//       {actions.length > 0 && <ActionGroup actions={actions} isVisible={isOpen} />}
//     </header>
//     {isExpandable && isOpen && <div className="pl-6">{children}</div>}
//   </div>
// )
