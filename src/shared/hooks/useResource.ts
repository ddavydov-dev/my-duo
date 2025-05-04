import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@/entities/user'
import { StorageAdapter } from '../storage'
import { CascadeConfig, cascadeDeleteLocal } from '../cascade'

interface ResourceConfig<T extends { id: string }, C> {
  keys: string[]
  adapter: StorageAdapter<T>
  getFilterFn?: (item: T) => boolean
  createLocal?: (dto: C) => T
  createRemote?: (item: T) => Promise<boolean>
  updateRemote?: (dto: T) => Promise<boolean>
  deleteRemote?: (id: string) => Promise<boolean>
  cascadeLocal?: CascadeConfig<T>
}

export function useResource<T extends { id: string }, C>(config: ResourceConfig<T, C>) {
  const qc = useQueryClient()
  const { user } = useUser()

  // TODO: update to also get from the db and then merge
  const query = useQuery<T[]>({
    queryKey: config.keys,
    queryFn: async () => {
      console.log('Fetching data from local storage')
      const local = await config.adapter.getAll(config.getFilterFn)
      return local
    },
    initialData: []
  })

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

      const newOnes = await config.adapter.getAll(config.getFilterFn)
      qc.setQueryData(config.keys, newOnes)

      // remote sync
      if (user && config.createRemote) config.createRemote(item)

      return item
    }
  })

  const update = useMutation({
    mutationFn: async (item: T) => {
      const all = await config.adapter.getAll()
      const next = all.map(i => (i.id === item.id ? { ...item } : i))
      await config.adapter.saveAll(next)
      qc.setQueryData(config.keys, next)

      // remote sync
      if (user && config.updateRemote) config.updateRemote(item)
    }
  })

  const remove = useMutation({
    mutationFn: async (id: string) => {
      if (config.cascadeLocal) {
        const next = await cascadeDeleteLocal(config.cascadeLocal, id)
        qc.setQueryData(config.keys, next)
        return
      }

      const all = await config.adapter.getAll()
      const next = all.filter(i => i.id !== id)
      await config.adapter.saveAll(next)
      qc.setQueryData(config.keys, next)
    },
    onSettled: () => {
      qc.invalidateQueries()
    }
  })

  return {
    ...query,
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync
  }
}
