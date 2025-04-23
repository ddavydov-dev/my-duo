// src/shared/useResource.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@/entities/user'
import { StorageAdapter } from '../storage'

interface ResourceConfig<T extends { id: string }, C> {
  keys: string[] // e.g. 'units'
  // fetchAll: () => Promise<T[]>
  adapter: StorageAdapter<T>
  getFilterFn?: (item: T) => boolean
  // tableName?: string // supabase table name
  createLocal?: (dto: C) => T
  createRemote?: (item: T) => Promise<boolean>
  // updateLocal?: (dto: U) => T
  updateRemote?: (dto: T) => Promise<boolean>
  deleteRemote?: (id: string) => Promise<boolean>
}

export function useResource<T extends { id: string }, C>(config: ResourceConfig<T, C>) {
  const qc = useQueryClient()
  const { user } = useUser()

  // 1. read/fallback // TODO: update to also get from the db and then merge
  const query = useQuery<T[]>({
    queryKey: config.keys,
    queryFn: async () => {
      const local = await config.adapter.getAll(config.getFilterFn)
      return local
    },
    initialData: []
  })

  // 2. create
  const create = useMutation({
    mutationFn: async (dto: C) => {
      // local
      const item = config.createLocal?.(dto)
      if (!item) {
        console.error('No item created')
        return null
      }

      const all = await config.adapter.getAll()
      const next = [...all, item]
      await config.adapter.saveAll(next)
      qc.setQueryData(config.keys, next)

      // remote sync
      if (user && config.createRemote) config.createRemote(item)

      return item
    }
  })

  // 3. update
  const update = useMutation({
    mutationFn: async (item: T) => {
      // const updated = config.updateLocal?.(item)
      // if (!updated) {
      //   console.error('No item updated')
      //   return null
      // }

      console.log('update item', item)

      const all = await config.adapter.getAll()
      const next = all.map(i => (i.id === item.id ? { ...item } : i))
      await config.adapter.saveAll(next)
      qc.setQueryData(config.keys, next)

      // remote sync
      if (user && config.updateRemote) config.updateRemote(item)
    }
  })

  // 4. remove
  const remove = useMutation({
    mutationFn: async (id: string) => {
      if (user && config.deleteRemote) await config.deleteRemote(id)
      const all = await config.adapter.getAll()
      const next = all.filter(i => i.id !== id)
      await config.adapter.saveAll(next)
      qc.setQueryData(config.keys, next)
    }
  })

  return {
    ...query,
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync
  }
}
