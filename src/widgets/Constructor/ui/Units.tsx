import { useUnits } from '@/entities/unit'
import { FC, useCallback } from 'react'
import { Lessons } from './Lessons'
import { Button } from '@/shared/ui/Button'

interface UnitsProps {
  skillId?: string
}

export const Units: FC<UnitsProps> = ({ skillId }) => {
  const { units, activeUnitId, setActiveUnitId, create: createUnit } = useUnits(skillId || '')

  const addUnit = useCallback(() => {
    createUnit({
      title: `Unit ${units.length + 1}`,
      skillId: skillId || '',
      order: units.length
    })
  }, [skillId, createUnit, units.length])

  return (
    <div>
      {units.map(unit => {
        const isUnitActive = unit.id === activeUnitId

        return (
          <div key={unit.id}>
            <Button
              style={{
                padding: '12px 8px',
                color: isUnitActive ? '#0097DC' : '#4B4B4B',
                backgroundColor: isUnitActive ? '#D9F4FF' : 'inherit',
                justifyContent: 'flex-start',
                textTransform: 'initial'
              }}
              isFullWidth
              onClick={() => setActiveUnitId(unit.id)}
              variant="ghost"
            >
              {unit.title}
            </Button>

            {isUnitActive ? <Lessons unitId={activeUnitId} /> : null}
          </div>
        )
      })}

      <Button
        isFullWidth
        variant="ghost"
        onClick={addUnit}
        style={{ height: 43, justifyContent: 'flex-start', textTransform: 'initial' }}
      >
        Add a new unit
      </Button>
    </div>
  )
}
