import { useSkills } from '@/entities/skill'
import Icon from '@/shared/ui/Icon'
import { useState } from 'react'

export const Sidebar = () => {
  return (
    <section className="w-[368px]">
      <Stats />
      {/* <Menu userData={{ streak: 1, wasToday: true }} languages={[]} onOverlay={() => {}} />
    <p>User: {JSON.stringify(user)}</p>
    <Button onClick={signOut}>Log out</Button> */}
    </section>
  )
}

function Stats() {
  return (
    <div className="flex h-11 mb-2 gap-12 justify-center items-center relative">
      <Skill />
      <div className="flex items-center gap-3">
        <Icon name="streak" className="h-7" />
        <p className="text-hare">1</p>
      </div>
    </div>
  )
}

function Skill() {
  const [isShown, setIsShown] = useState(false)
  const { data: skills } = useSkills()

  const activeSkill = skills.find(skill => skill.isActive)!

  return (
    <>
      <div
        className="px-5 py-2 hover:bg-polar transition-background rounded-2xl"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <h2 className="text-hare">{activeSkill.title}</h2>

        {isShown && (
          <div
            className="absolute left-1/2 top-full z-[10] border-2 border-swan mt-3 w-[240px] -translate-x-[147.5px] rounded-[15px] text-black"
            // style={{ backgroundColor: unitColor }}
            // ref={modalRef}
          >
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

// interface SkillsProps {
//   skills: SkillType[]
//   onClose: VoidFunction
// }

// function Skills({ skills, onClose }: SkillsProps) {
//   const modalRef = useRef<HTMLDivElement>(null)

//   useOnClickOutside(modalRef, onClose)

//   return (
//     <div
//       className="absolute left-1/2 top-full z-[1] mt-3 w-[295px] -translate-x-[147.5px] rounded-[15px] text-white"
//       // style={{ backgroundColor: unitColor }}
//       ref={modalRef}
//     >
//       <div className="flex flex-col p-4 text-center text-[19px] font-bold leading-[1.4]">
// {skills.map(skill => (
//   <div>{skill.title}</div>
// ))}
//       </div>

//       <div className="absolute top-[-8px] left-[calc(50%-15px)] h-[10px] w-[20px] overflow-hidden box-border">
//         <div
//           className="absolute bg-white"
//           style={{
//             height: '14.14427157px',
//             width: '14.14427157px',
//             left: '50%',
//             transform: 'translateZ(0) rotate(45deg)',
//             transformOrigin: 'top left'
//           }}
//         />
//       </div>
//     </div>
//   )
// }
