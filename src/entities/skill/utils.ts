import type { Skill } from './config/types'

const LOCAL_STORAGE_KEY = 'offline_skills'

export const getLocalSkills = async (): Promise<Skill[]> => {
  const json = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!json) return []
  try {
    return JSON.parse(json) as Skill[]
  } catch {
    return []
  }
}

export const setLocalSkills = async (skills: Skill[]): Promise<void> => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(skills))
}
