import classnames from 'classnames'
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

export function Navigation({ isNavClosed = false }: { isNavClosed?: boolean }) {
  const { user } = useUser()
  const { pathname } = useLocation()

  return (
    <div className={classnames(styles.Navigation, { [styles['Navigation--short']]: isNavClosed })}>
      <div
        className={classnames(styles.Logo, {
          [styles['Logo--Navigation--short']]: isNavClosed
        })}
      >
        <Link to="/learn" aria-current="page">
          <img
            src={logoFull}
            className={classnames(styles['Logo--full'], {
              [styles['Logo--full--Navigation--short']]: isNavClosed
            })}
          />
          <img
            src={logo}
            className={classnames(styles['Logo--short'], {
              [styles['Logo--short--Navigation--short']]: isNavClosed
            })}
          />
        </Link>
      </div>
      <div className={classnames(styles.NavBar, { [styles['NavBar--short']]: isNavClosed })}>
        {links.map(({ title, icon, href }) => (
          <Link
            to={href === '/profile' && !user ? '/login' : href}
            state={{ login: !user ? 'signUp' : 'login' }}
            key={title}
          >
            <span
              className={classNames(styles.Item, {
                [styles['Item--active']]: pathname === href,
                [styles['Item--short']]: isNavClosed
              })}
            >
              <div className={styles.IconWrapper}>
                <Icon name={icon} />
              </div>
              <span>{href === '/profile' && !user ? 'Sign up' : title}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
