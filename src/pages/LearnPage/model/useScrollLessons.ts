import { Unit } from '@/entities/unit'
import { useRef, useEffect, Dispatch, SetStateAction } from 'react'

export const useScrollLessons = (
  units: Unit[],
  setActiveUnitId: Dispatch<SetStateAction<string | null>>,
  activeUnit?: Unit
) => {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Find the entry that is most visible in the viewport
        const visibleEntries = entries.filter(entry => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most visible section
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.intersectionRatio > prev.intersectionRatio ? current : prev
          })

          const id = mostVisible.target.getAttribute('data-unit-id')
          if (id) {
            setActiveUnitId(id)
          }
        }
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Only consider the middle 50% of the viewport
        threshold: [0, 0.25, 0.5, 0.75, 1] // Multiple thresholds for better precision
      }
    )

    // Observe all sections
    units.forEach(unit => {
      const el = sectionRefs.current[unit.id]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [units, activeUnit, setActiveUnitId]) // ActiveUnit is added to dependencies for scrolling container initialization

  return sectionRefs
}
