import logo from './logo.svg'
import logoFull from './logo-full.svg'
import styles from './Navigation.module.scss'
import { Icon } from '@/shared/ui/Icon'
import classNames from 'classnames'
import { Link, useLocation } from '@tanstack/react-router'
import { useUser } from '@/entities/user'

const links = [
  {
    title: 'Learn',
    icon: 'learn',
    href: '/learn'
  },
  {
    title: 'Constructor',
    icon: 'constructor',
    href: '/constructor'
  },
  {
    title: 'Profile',
    icon: 'profile',
    href: '/profile'
  }
] as const

export function Navigation() {
  const { user } = useUser()
  const { pathname } = useLocation()

  return (
    <div className={styles.Navigation}>
      <div className={styles.Logo}>
        <Link to="/learn" aria-current="page">
          <img src={logoFull} className={styles['Logo--full']} />
          <img src={logo} className={styles['Logo--short']} />
        </Link>
      </div>
      <div className={styles.NavBar}>
        {links.map(({ title, icon, href }) => (
          <Link
            to={href === '/profile' && !user ? '/login' : href}
            state={{ login: !user ? 'signUp' : 'login' }}
            key={title}
          >
            <span
              className={classNames(styles.Item, { [styles['Item--active']]: pathname === href })}
            >
              <div className={styles.IconWrapper}>
                <Icon name={icon} />
              </div>
              <span>{title}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
