// src/shared/cascadeConfigs.ts
import { skillsAdapter, unitsAdapter, lessonsAdapter, exercisesAdapter } from './storage'
import { CascadeConfig } from './cascade'
import { Lesson } from '@/entities/lesson'
import { Exercise } from '@/entities/exercise'
import { Unit } from '@/entities/unit'
import { Skill } from '@/entities/skill'

export const lessonCascadeConfig: CascadeConfig<Lesson> = {
  adapter: lessonsAdapter,
  child: {
    config: { adapter: exercisesAdapter },
    filterFn: (lessonId, ex: Exercise) => ex.lessonId === lessonId
  }
}

export const unitCascadeConfig: CascadeConfig<Unit> = {
  adapter: unitsAdapter,
  child: {
    config: lessonCascadeConfig,
    filterFn: (unitId, ls: Lesson) => ls.unitId === unitId
  }
}

export const skillCascadeConfig: CascadeConfig<Skill> = {
  adapter: skillsAdapter,
  child: {
    config: unitCascadeConfig,
    filterFn: (skillId, u: Unit) => u.skillId === skillId
  }
}
