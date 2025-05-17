import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { Text } from '@/shared/ui/Text'

import animation from './animation.json'
import styles from './LandingPage.module.scss'
import Lottie from 'lottie-react'
import { Link } from '@tanstack/react-router'

export const LandingPage = () => {
  return (
    <Flex alignItems="center" justifyContent="end" className={styles.Container} space={11}>
      <span style={{ maxWidth: 424, marginRight: -65 }}>
        <Lottie animationData={animation} />
      </span>

      <div className={styles.Welcome}>
        <Text as="h1" type="title-1" className={styles.Title}>
          The free, fun, and effective way to learn everything!
        </Text>

        <Flex flexDirection="column" space={3} className={styles.Buttons}>
          <Link to="/register">
            <Button variant="secondary" isFullWidth>
              Get started
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary-ghost" isFullWidth>
              I already have an account
            </Button>
          </Link>
        </Flex>
      </div>
    </Flex>
  )
}
