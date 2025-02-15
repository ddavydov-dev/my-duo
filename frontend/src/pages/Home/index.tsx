import { Button } from '@/shared/ui/Button'
import Menu from '../../widgets/nav-menu'
import { useUser } from '@/entities/user'

export const Home = () => {
  const { user, signOut } = useUser()

  console.log('user: ', user)

  return (
    <>
      <Menu userData={{ streak: 1, wasToday: true }} languages={[]} onOverlay={() => {}} />
      <Button onClick={signOut}>Log out</Button>
      {/* <Main>
      <Outlet />
    </Main> */}

      {/* {matches ? <Navigation /> : null} */}
      {/* <Overlay active={isOverlay} /> */}
    </>
  )
}
