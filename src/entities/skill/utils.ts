import { Project } from './config/types'

const LOCAL_STORAGE_KEY = 'offline_projects'

export const getLocalProjects = async (): Promise<Project[]> => {
  const json = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!json) return []
  try {
    return JSON.parse(json) as Project[]
  } catch {
    return []
  }
}

export const setLocalProjects = async (projects: Project[]): Promise<void> => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects))
}
