import { Language } from '@prisma/client'
import { Outlet } from '@remix-run/react'
import { useState } from 'react'
import { PHONE_MEDIA_MAX } from '~/constants'
import useMediaQuery from 'src/shared/hooks/useMediaQuery'
import Menu from '~/modules/Common/components/Menu'
import Navigation from '~/modules/Common/components/Menu/components/Navigation'
import Overlay from '~/modules/Common/components/Overlay'
import { Main } from './lib'

type UserDataType = {
  streak: number
  wasToday: boolean
}

export default function MainPage({
  userData,
  languages
}: {
  userData: UserDataType
  languages: Language[]
}) {
  const [isOverlay, setIsOverlay] = useState(false)

  const matches = useMediaQuery(`(max-width: ${PHONE_MEDIA_MAX}px)`)

  return (
    <>
      <Menu userData={userData} languages={languages} onOverlay={setIsOverlay} />
      <Main>
        <Outlet />
      </Main>

      {matches ? <Navigation /> : null}
      <Overlay active={isOverlay} />
    </>
  )
}
