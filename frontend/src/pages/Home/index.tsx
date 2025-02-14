import Menu from '../../widgets/nav-menu'

export const Home = () => {
  return (
    <>
      <Menu userData={{ streak: 1, wasToday: true }} languages={[]} onOverlay={() => {}} />
      {/* <Main>
      <Outlet />
    </Main> */}

      {/* {matches ? <Navigation /> : null} */}
      {/* <Overlay active={isOverlay} /> */}
    </>
  )
}
