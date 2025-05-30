import clsx from 'clsx'
import Icon from '@/shared/ui/Icon'
import { Link, useLocation } from '@tanstack/react-router'
import { useUser } from '@/entities/user'

const links = [
  { title: 'Learn', icon: 'learn', href: '/learn' },
  { title: 'Build', icon: 'constructor', href: '/constructor' },
  // { title: 'Share', icon: 'share', href: '/share' }, // If you uncomment this line, the app crashes. We need error boundaries
  { title: 'Profile', icon: 'profile', href: '/profile' }
] as const

interface PropsType {
  isNavClosed?: boolean
}

export default function Navigation({ isNavClosed = false }: PropsType) {
  const { user } = useUser()
  const { pathname } = useLocation()

  return (
    <div
      className={clsx(
        'sticky w-[88px] left-0 top-0 h-screen overflow-y-auto select-none text-hare border-r-2 border-swan font-medium text-[17px] leading-[25px] px-4',
        !isNavClosed && 'lg:w-[256px]'
      )}
    >
      <nav
        className={clsx('flex flex-col gap-2 relative', isNavClosed ? 'w-14' : 'w-14 lg:w-auto')}
      >
        <Link to="/learn" aria-current="page" className="mt-8 mb-7 flex items-center">
          {/* <img
            src={logoFull}
            alt="Full logo"
            className={clsx('hidden h-[30px] w-[128px] lg:block', isNavClosed && 'lg:hidden')}
          />
          <img
            src={logo}
            alt="Logo icon"
            className={clsx('block h-10 w-10 lg:block', !isNavClosed && 'lg:hidden')}
          /> */}

          <span>Logo</span>
        </Link>

        {links.map(({ title, icon, href }) => {
          const active = pathname === href

          return (
            <Link
              to={href === '/profile' && !user ? '/login' : href}
              state={{ login: !user ? 'signUp' : 'login' }}
              key={title}
            >
              <span
                className={clsx(
                  'flex items-center justify-center lg:justify-start relative h-13 p-2 border-2 rounded-xl transition-colors',
                  !active && 'hover:bg-polar border-transparent',
                  active && 'bg-iguana border-blue-jay [&>span]:text-macaw',
                  isNavClosed && 'lg:justify-center'
                )}
              >
                <div className={clsx('flex relative', !isNavClosed && 'lg:mr-5', 'lg:ml-[6px]')}>
                  <Icon name={icon} />
                </div>
                <span
                  className={clsx(
                    'hidden text-[15px] font-bold tracking-wider uppercase text-wolf select-none font-sans',
                    !isNavClosed && 'lg:inline'
                  )}
                >
                  {href === '/profile' && !user ? 'Sign up' : title}
                </span>
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
