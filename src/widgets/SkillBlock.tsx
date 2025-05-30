import { useSkills } from '@/entities/skill'
import { useState } from 'react'

export default function SkillBlock() {
  const [isShown, setIsShown] = useState(false)
  const { data: skills } = useSkills()
  const activeSkill = skills.find(skill => skill.isActive)

  if (!activeSkill) {
    return <div>Add your first skill</div>
  }

  return (
    <>
      <div
        className="px-5 py-2 hover:bg-polar transition-background rounded-2xl"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} // TODO: replace with native css hover
      >
        <h2 className="text-hare">{activeSkill.title}</h2>

        {isShown && (
          <div className="absolute left-1/2 top-full z-[10] border-2 border-swan bg-white mt-3 w-[240px] -translate-x-[147.5px] rounded-[15px] text-black">
            <h2 className="uppercase text-md text-hare pl-5 py-3">My skills</h2>
            <hr className="h-0 border-t-2 border-swan" />
            <div className="flex flex-col text-[19px] font-bold leading-[1.4]">
              {skills.map(skill => {
                const isActive = skill.id === activeSkill.id

                return (
                  <div
                    key={skill.id}
                    style={{
                      backgroundColor: isActive ? 'blue' : 'transparent',
                      color: isActive ? 'white' : 'black'
                    }}
                    className="p-4"
                  >
                    {skill.title}
                  </div>
                )
              })}
            </div>

            <div className="absolute top-[-8px] left-[calc(50%-15px)] h-[10px] w-[20px] overflow-hidden box-border">
              <div
                className="absolute bg-white border-2 border-swan"
                style={{
                  height: '14.14427157px',
                  width: '14.14427157px',
                  left: '50%',
                  transform: 'translateZ(0) rotate(45deg)',
                  transformOrigin: 'top left'
                }}
              />
            </div>
          </div>
        )}
      </div>
      {/* {isShown && <Skills skills={skills} />} */}
    </>
  )
}
