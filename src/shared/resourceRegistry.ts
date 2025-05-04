import {
  lessonsAdapter,
  unitsAdapter,
  skillsAdapter,
  exercisesAdapter,
  StorageAdapter
} from './storage'
import { CascadeConfig } from './cascade'
import { lessonCascadeConfig, skillCascadeConfig, unitCascadeConfig } from './cascadeConfigs'
import { CreateExerciseArgs } from '@/entities/exercise/model/useExercises'
import { CreateLessonArgs } from '@/entities/lesson/model/useLessons'
import { CreateUnitArgs } from '@/entities/unit/model/useUnits'
import { CreateSkillArgs } from '@/entities/skill/model/useSkills'
import { Exercise } from '@/entities/exercise/config/types'
import { Skill } from '@/entities/skill/config/types'
import { Unit } from '@/entities/unit/config/types'
import { Lesson } from '@/entities/lesson/config/types'

export interface ResourceDef<T extends { id: string }, C> {
  adapter: StorageAdapter<T>
  table: string
  /** which field holds the parent id? */
  parentKey?: keyof T
  /** how to build a new local entity */
  createLocal: (dto: C) => T
  /** pre-built local-cascade config (if any) */
  cascadeConfig?: CascadeConfig<T>
}

export interface ResourceRegistry {
  skills: ResourceDef<Skill, CreateSkillArgs>
  units: ResourceDef<Unit, CreateUnitArgs>
  lessons: ResourceDef<Lesson, CreateLessonArgs>
  exercises: ResourceDef<Exercise, CreateExerciseArgs>
}

export const resourceDefs: ResourceRegistry = {
  skills: {
    adapter: skillsAdapter,
    table: 'skills',
    createLocal: ({ title, isPublic, userId }: CreateSkillArgs): Skill => ({
      id: crypto.randomUUID(),
      title,
      isPublic: isPublic ?? false,
      createdAt: new Date().toISOString(),
      isActive: true,
      userId: userId ?? '',
      units: []
    }),
    cascadeConfig: skillCascadeConfig
  },
  units: {
    adapter: unitsAdapter,
    table: 'units',
    parentKey: 'skillId',
    createLocal: ({ title, skillId, order = 0, style = 'owl' }: CreateUnitArgs): Unit => ({
      id: crypto.randomUUID(),
      title,
      skillId,
      order,
      style,
      lessons: []
    }),
    cascadeConfig: unitCascadeConfig
  },
  lessons: {
    adapter: lessonsAdapter,
    table: 'lessons',
    parentKey: 'unitId',
    createLocal: ({ title, unitId, order = 0 }: CreateLessonArgs): Lesson => ({
      id: crypto.randomUUID(),
      title,
      unitId,
      order,
      exercises: [],
      isCompleted: false
    }),
    cascadeConfig: lessonCascadeConfig
  },
  exercises: {
    adapter: exercisesAdapter,
    table: 'exercises',
    parentKey: 'lessonId',
    createLocal: ({ prompt, answer, lessonId, order = 0 }: CreateExerciseArgs): Exercise => ({
      id: crypto.randomUUID(),
      prompt,
      answer,
      lessonId,
      order,
      type: 'question_answer'
    })
  }
} as const
