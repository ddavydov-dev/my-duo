import { useUnits } from '@/entities/unit'
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Accordion } from '@/shared/ui/Accordion'
import Lessons from './Lessons'
import { useAtom } from 'jotai'
import { activeLessonIdAtom, activeUnitIdAtom } from '../model/atoms'
import { useLessons } from '@/entities/lesson'
import Icon from '@/shared/ui/Icon'
import clsx from 'clsx'

interface UnitsProps {
  skillId: string
}

export const Units: FC<UnitsProps> = ({ skillId }) => {
  const { data: units, remove: removeUnit, update: updateUnit } = useUnits(skillId)
  const [openUnitId, setOpenUnitId] = useAtom(activeUnitIdAtom)

  useEffect(() => {
    if (units.length > 0 && !openUnitId) {
      setOpenUnitId(units[0].id)
    }
  }, [units, openUnitId, setOpenUnitId])

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
          onRename={updateUnit}
        />
      ))}
    </div>
  )

  function UnitRow({
    unit,
    isOpen,
    onToggle,
    onDelete,
    onRename
  }: {
    unit: { id: string; title: string }
    isOpen: boolean
    onToggle: VoidFunction
    onDelete: VoidFunction
    onRename: (u: { id: string; title: string }) => Promise<unknown>
  }) {
    const { data: lessons = [], create } = useLessons(unit.id)
    const [, setActiveLessonId] = useAtom(activeLessonIdAtom)

    const [editing, setEditing] = useState(isOpen && unit.title.startsWith('Unit '))
    const [draft, setDraft] = useState(unit.title)
    const inputRef = useRef<HTMLInputElement>(null)

    // autofocus when entering edit mode
    useEffect(() => {
      if (editing) inputRef.current?.focus()
    }, [editing])

    const finish = async () => {
      const next = draft.trim()
      if (next && next !== unit.title) await onRename({ ...unit, title: next })
      setEditing(false)
    }

    const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') finish()
      if (e.key === 'Escape') {
        setDraft(unit.title)
        setEditing(false)
      }
    }

    const addLesson = () =>
      create({
        title: `Lesson ${lessons.length + 1}`,
        unitId: unit.id,
        order: lessons.length
      }).then(l => setActiveLessonId(l.id))

    return (
      <Accordion
        title={unit.title}
        trigger={
          editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={onKey}
              onBlur={finish}
            />
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 w-full py-3 px-2 cursor-pointer"
              onClick={onToggle}
            >
              <div className="flex w-4 h-4 justify-center items-center">
                <Icon
                  name="arrow"
                  className={clsx(
                    'transition-transform duration-300',
                    isOpen ? 'rotate-90 stroke-active-menu' : 'stroke-hare'
                  )}
                />
              </div>
              <span
                className={clsx(
                  'font-semibold text-base truncate',
                  isOpen ? 'text-active-menu' : 'text-hare'
                )}
              >
                {unit.title}
              </span>
            </button>
          )
        }
        isOpen={isOpen}
        onToggle={onToggle}
        actions={[
          { icon: 'plus', tooltip: 'Add lesson', onClick: addLesson },
          {
            icon: 'settings',
            tooltip: 'Options',
            menu: (
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    // const next = prompt('Rename unit:', unit.title)?.trim()
                    // if (next && next !== unit.title) onRename({ ...unit, title: next })
                    setEditing(true)
                  }}
                >
                  Rename
                </Button>
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
