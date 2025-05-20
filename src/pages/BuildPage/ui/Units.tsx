import { useUnits } from '@/entities/unit'
import { FC, useCallback } from 'react'
import { Button } from '@/shared/ui/Button'
import { Accordion } from '@/shared/ui/Accordion'
import Lessons from './Lessons'
import { useAtom } from 'jotai'
import { activeLessonIdAtom, activeUnitIdAtom } from '../model/atoms'
import { useLessons } from '@/entities/lesson'

interface UnitsProps {
  skillId: string
}

export const Units: FC<UnitsProps> = ({ skillId }) => {
  const { data: units, remove: removeUnit } = useUnits(skillId)
  const [openUnitId, setOpenUnitId] = useAtom(activeUnitIdAtom)

  const handleToggle = useCallback(
    (id: string) => setOpenUnitId(openUnitId === id ? undefined : id),
    [setOpenUnitId, openUnitId]
  )

  return (
    <div className="flex flex-col gap-2">
      {units.map(unit => (
        <UnitRow
          key={unit.id}
          unit={unit}
          isOpen={unit.id === openUnitId}
          onToggle={() => handleToggle(unit.id)}
          onDelete={() => removeUnit(unit.id)}
        />
      ))}
    </div>
  )

  function UnitRow({
    unit,
    isOpen,
    onToggle,
    onDelete
  }: {
    unit: { id: string; title: string }
    isOpen: boolean
    onToggle: VoidFunction
    onDelete: VoidFunction
  }) {
    const { data: lessons = [], create } = useLessons(unit.id)
    const [, setActiveLessonId] = useAtom(activeLessonIdAtom)

    const addLesson = () =>
      create({
        title: `Lesson ${lessons.length + 1}`,
        unitId: unit.id,
        order: lessons.length
      }).then(l => setActiveLessonId(l.id))

    return (
      <Accordion
        title={unit.title}
        isOpen={isOpen}
        onToggle={onToggle}
        actions={[
          { icon: 'plus', tooltip: 'Add lesson', onClick: addLesson },
          {
            icon: 'settings',
            tooltip: 'Options',
            menu: (
              <div className="flex flex-col gap-2 p-2">
                <Button variant="ghost" onClick={onDelete}>
                  Delete
                </Button>
              </div>
            )
          }
        ]}
      >
        <Lessons />
      </Accordion>
    )
  }
}
