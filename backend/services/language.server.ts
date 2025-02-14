import type { Project } from '@prisma/client'

import { getUserId, logout } from '~/session.server'
import { prisma } from '../db.server'

export type { Project } from '@prisma/client'

export async function createInitialLanguage(userId: string) {
  return await prisma.project.create({
    data: { userId, active: true, title: 'MyFirstProject' }
  })
}

export async function createNewLanguage(request: Request, title: Project['title']) {
  const userId = await getUserId(request)
  if (typeof userId !== 'string') {
    return null
  }

  await deactiveAllUserLanguages(userId)

  const project = await prisma.project.create({
    data: { userId, title, active: true }
  })

  return project
}

async function deactiveAllUserLanguages(userId: Project['userId']) {
  const languages = await prisma.project.updateMany({
    where: {
      userId
    },
    data: {
      active: false
    }
  })

  return languages
}

export async function setActiveLanguage(id: string) {
  const project = await prisma.project.findUnique({
    where: { id }
  })

  if (project) {
    await deactiveAllUserLanguages(project.userId)
  }

  await prisma.project.update({
    where: {
      id
    },
    data: {
      active: true
    }
  })

  return project
}

export async function getActiveLanguage(request: Request) {
  const userId = await getUserId(request)
  if (typeof userId !== 'string') {
    return null
  }

  try {
    const project = await prisma.project.findFirst({
      where: { userId, active: true }
    })
    return project
  } catch {
    throw logout(request)
  }
}

export async function getLanguages(request: Request) {
  const userId = await getUserId(request)
  if (typeof userId !== 'string') {
    return null
  }

  try {
    const languages = await prisma.project.findMany({
      where: { userId }
    })
    return languages
  } catch {
    throw logout(request)
  }
}

export async function whenLastPractice(request: Request) {
  const languages = (await getLanguages(request)) as Project[]
  const lastUpdatedSkill = await prisma.skill.findFirst({
    where: {
      projectId: { in: languages.map(({ id }) => id) }
    },
    select: { updatedAt: true },
    orderBy: { updatedAt: 'desc' }
  })
  if (!lastUpdatedSkill) {
    return 0
  }
  return lastUpdatedSkill.updatedAt as number
}
