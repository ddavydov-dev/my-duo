import { Exercise } from '@/entities/exercise'
import { Lesson } from '@/entities/lesson'
import { Skill } from '@/entities/skill'
import { Unit } from '@/entities/unit'

export class StorageAdapter<T extends { id: string }> {
  constructor(private key: string) {}

  async getAll(filterFn?: (item: T) => boolean): Promise<T[]> {
    const json = localStorage.getItem(this.key)
    const data = json ? JSON.parse(json) : []

    if (filterFn) return data.filter(filterFn)

    return data
  }
  async saveAll(items: T[]) {
    localStorage.setItem(this.key, JSON.stringify(items))
  }
}

export const skillsAdapter = new StorageAdapter<Skill>('offline_skills')
export const unitsAdapter = new StorageAdapter<Unit>('offline_units')
export const lessonsAdapter = new StorageAdapter<Lesson>('offline_lessons')
export const exercisesAdapter = new StorageAdapter<Exercise>('offline_exercises')
