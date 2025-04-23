import { PHONE_MEDIA_MAX } from '../../shared/config/consts'
import useMediaQuery from '../../shared/hooks/useMediaQuery'
import { Project } from '../../entities/skill/config/types'
import streakActive from '../../shared/assets/icons/streak-active.svg'
import streak from '../../shared/assets/icons/streak.svg'
import styles from './nav-menu.module.css'

// type UserData = Pick<User, 'streak' | 'wasToday'>

const Menu = ({
  userData,
  languages,
  onOverlay
}: {
  userData: {
    streak: number
    wasToday: boolean
  }
  languages: Project[]
  onOverlay: Function
}) => {
  const matches = useMediaQuery(`(max-width: ${PHONE_MEDIA_MAX}px)`)

  return (
    <div className={styles.MenuContainer}>
      <div className={styles.MenuInner}>
        {/* {matches ? null : <Navigation />} */}
        <ul className={styles.HorizontalList}>
          <li className={styles.ListItem}>
            {/* <Languages languages={languages} onOverlay={onOverlay} /> */}
          </li>
          <li className={styles.ListItem}>
            <img
              src={userData.wasToday ? streakActive : streak}
              alt="streak"
              width={25}
              height={30}
              style={{ marginRight: 6 }}
            />
            <b style={{ fontFamily: 'Nunito', color: userData.wasToday ? '#ff9600' : '#e5e5e5' }}>
              {userData.streak}
            </b>
            {/* <MenuStreak wasToday={userData.wasToday}>{userData.streak}</MenuStreak> */}
          </li>
          {/* <li className={styles.ListItem}>
            <form action="/logout" method="post">
              <button className={styles.LogoutButton} type="submit">
                Logout
              </button>
            </form>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default Menu
