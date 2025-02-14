import { useEffect, useRef, useState } from 'react'
import {
  LessonProgress,
  LessonProgressInner,
  LessonTitle,
  LessonBlockMenu,
  LessonBlockMenuTriangle,
  LessonBlockMenuTriangleContent,
  LessonBlockInner,
  LessonBlockLink,
  LessonBlockButton,
  LessonBlock,
  LessonsContainer
} from './lib'
import Bin from '~/styles/bin.svg'
import useOnClickOutside from 'src/shared/hooks/useOnClickOutside'
import { Form, useTransition } from '@remix-run/react'
import { SkillsListItemType } from '../../SkillsList'

type SkillsItemType = SkillsListItemType & {
  editLink: string
}

export default function SkillsItem({
  id,
  title,
  currentLesson,
  lessonsAmount,
  editLink
}: SkillsItemType) {
  const [isOpened, setIsOpened] = useState(false)
  const transition = useTransition()
  const ref = useRef(null)

  useEffect(() => {
    if (transition.state === 'loading') {
      setIsOpened(false)
    }
  }, [transition.state])
  useOnClickOutside(ref, () => setIsOpened(false))

  function toggleMenu() {
    setIsOpened(!isOpened)
  }

  const isDisabled = transition.state !== 'idle'
  const exp = (currentLesson / lessonsAmount) * 100
  const skillLink = `/skill/${title}/${exp >= 100 ? 'practice' : currentLesson + 1}`
  const startButtonMessage = exp < 100 ? 'Start +16 XP' : 'Practice +16 XP'

  return (
    <LessonsContainer>
      <LessonBlock ref={ref}>
        <button key={id} aria-labelledby={title} onClick={toggleMenu}>
          <LessonProgress exp={exp}>
            <LessonProgressInner />
          </LessonProgress>
          <LessonTitle>{title}</LessonTitle>
        </button>
        <LessonBlockMenu isOpened={isOpened}>
          <LessonBlockMenuTriangle>
            <LessonBlockMenuTriangleContent />
          </LessonBlockMenuTriangle>
          <LessonBlockInner>
            <div style={{ display: 'flex' }}>
              <LessonBlockLink to={editLink}>Edit</LessonBlockLink>
              <Form method="post">
                <input type="hidden" name="id" value={id} />
                <LessonBlockButton
                  type="submit"
                  disabled={isDisabled}
                  title="Delete skill"
                  name="_action"
                  value="Delete skill"
                >
                  <img src={Bin} alt="delete" width={20} height={20} />
                </LessonBlockButton>
              </Form>
            </div>
            {/* If the skill is 100% done, then we just repeat all lessons from it */}
            {/* Otherwise we study lessons only from next chapter */}
            <LessonBlockLink to={skillLink}>{startButtonMessage}</LessonBlockLink>
          </LessonBlockInner>
        </LessonBlockMenu>
      </LessonBlock>
    </LessonsContainer>
  )
}
