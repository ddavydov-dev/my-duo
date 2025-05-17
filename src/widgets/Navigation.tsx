import classnames from 'classnames'
import logo from '/icons/logo.svg'
import logoFull from '/icons/logo-full.svg'
import { Icon } from '@/shared/ui/Icon'
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

function Navigation({ isNavClosed = false }: PropsType) {
  const { user } = useUser()
  const { pathname } = useLocation()

  return (
    <div
      className={classnames(
        'fixed left-0 top-0 z-[210] h-screen overflow-y-auto select-none bg-snow text-hare border-r-2 border-swan font-medium text-[17px] leading-[25px] px-4',
        isNavClosed ? 'w-[88px]' : 'w-[88px] lg:w-[256px]'
      )}
    >
      <div
        className={classnames(
          'box-content h-[39px] pl-2 pt-7 pb-6 lg:h-[30px] lg:pl-4 lg:pt-8 lg:pb-7'
        )}
      >
        <Link to="/learn" aria-current="page" className="block h-full w-fit">
          <img
            src={logoFull}
            alt="Full logo"
            className={classnames('hidden h-[30px] w-[128px] lg:block', isNavClosed && 'lg:hidden')}
          />
          <img
            src={logo}
            alt="Logo icon"
            className={classnames('block h-10 w-10 lg:block', !isNavClosed && 'lg:hidden')}
          />
        </Link>
      </div>
      <nav
        className={classnames(
          'flex flex-col gap-2 relative',
          isNavClosed ? 'w-14' : 'w-14 lg:w-auto'
        )}
      >
        {links.map(({ title, icon, href }) => {
          const active = pathname === href

          return (
            <Link
              to={href === '/profile' && !user ? '/login' : href}
              state={{ login: !user ? 'signUp' : 'login' }}
              key={title}
            >
              <span
                className={classnames(
                  'flex items-center justify-center lg:justify-start relative h-13 p-2 border-2 rounded-xl transition-colors',
                  !active && 'hover:bg-polar border-transparent',
                  active && 'bg-iguana border-blue-jay [&>span]:text-macaw',
                  isNavClosed && 'lg:justify-center'
                )}
              >
                <div
                  className={classnames('flex relative', !isNavClosed && 'lg:mr-5', 'lg:ml-[6px]')}
                >
                  <Icon name={icon} />
                </div>
                <span
                  className={classnames(
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

export default Navigation
