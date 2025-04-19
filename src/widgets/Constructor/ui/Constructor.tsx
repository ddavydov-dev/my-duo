import { Button } from '@/shared/ui/Button'
import { useState } from 'react'
import QuestionAnswer from './Levels/components/QuestionAnswer'
import { BackButton } from '@/shared/ui/BackButton'
import { Exercise } from '@/entities/exercise/ui/Exercise'
// import Levels from './Levels'
// import SkillInfo from './SkillInfo'

export const Constructor = () => {
  const [units, setUnits] = useState<string[]>([])
  const [activeUnit, setActiveUnit] = useState<string | null>(null)

  const addUnit = (name: string) => {
    setUnits(prev => [...prev, name])
    setActiveUnit(name)
  }

  return (
    // <section className={styles.Constructor}>
    //   <div className={styles.ConstructorInner}>
    <>
      {/* Sidebar */}
      <div style={{ width: 300, borderRight: '1px solid #E0E0E0', height: '100vh' }}>
        <h1>Spanish</h1>

        <h2>Units</h2>
        {units.map((unit, index) => (
          <Button
            key={index}
            style={{ padding: 10, borderBottom: '1px solid #E0E0E0' }}
            onClick={() => setActiveUnit(unit)}
          >
            {unit}
          </Button>
        ))}
        <Button onClick={() => addUnit(Math.random().toString())}>Add a unit</Button>
      </div>

      <Exercise title="Answer the question" />
      {/* Unit */}
      {/* {activeUnit ? (
        
      ) : null} */}
    </>
    //   </div>
    // </section>
  )
}
