import { useUnits } from '@/entities/unit'
import { FC, useCallback, useState } from 'react'
import { Lessons } from './Lessons'
import { Button } from '@/shared/ui/Button'
import { Accordion } from '@/shared/ui/Accordion'

interface UnitsProps {
  skillId?: string
}

export const Units: FC<UnitsProps> = ({ skillId }) => {
  const { data: units, create, remove } = useUnits(skillId || '')

  const [activeUnitId, setActiveUnitId] = useState<string | null>(null)

  const handleUnitToggle = useCallback(
    (unitId: string) => setActiveUnitId(prev => (unitId === prev ? null : unitId)),
    [setActiveUnitId]
  )

  const addUnit = useCallback(() => {
    create({
      title: `Unit ${units.length + 1}`,
      skillId: skillId || '',
      order: units.length
    })
  }, [skillId, create, units.length])

  return (
    <div>
      {units.map(unit => {
        const isUnitActive = unit.id === activeUnitId

        return (
          <Accordion
            isOpen={isUnitActive}
            onToggle={() => handleUnitToggle(unit.id)}
            key={unit.id}
            title={unit.title}
            options={
              <Button variant="ghost" onClick={() => remove(unit.id)}>
                Delete
              </Button>
            }
          >
            <Lessons unitId={activeUnitId!} />
          </Accordion>
        )
      })}

      <Button
        isFullWidth
        variant="ghost"
        onClick={addUnit}
        style={{
          height: 43,
          justifyContent: 'flex-start',
          textTransform: 'initial',
          padding: '0 12px'
        }}
        icon="plus"
      >
        Add a new unit
      </Button>
    </div>
  )
}
