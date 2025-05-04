// src/shared/cascade.ts
import { StorageAdapter } from './storage'

export interface CascadeConfig<T extends { id: string }> {
  adapter: StorageAdapter<T>
  /** if present, how to find direct children of this node */
  child?: {
    config: CascadeConfig<T>
    /** return true if `item` is a child of id=`parentId` */
    filterFn: (parentId: string, item: T) => boolean
  }
}

/**
 * Recursively deletes the node with `id` in `config.adapter`,
 * then all its children (and grandchildren…) according to `config.child`.
 */

export async function cascadeDeleteLocal<T extends { id: string }>(
  config: CascadeConfig<T>,
  id: string
): Promise<T[]> {
  // 1) delete children first
  // if (config.child) {
  //   const { config: childConfig, filterFn } = config.child
  //   const allKids = await childConfig.adapter.getAll()
  //   const mine = allKids.filter(k => filterFn(id, k))
  //   for (const k of mine) {
  //     await cascadeDeleteLocal(childConfig, k.id)
  //   }
  // }

  if (config.child) {
    const { config: childConfig, filterFn } = config.child
    const allChildren = await childConfig.adapter.getAll()

    const toDelete = allChildren.filter((child): child is T => filterFn(id, child))
    for (const child of toDelete) {
      await cascadeDeleteLocal(childConfig, child.id)
    }
  }

  const all = await config.adapter.getAll()
  const next = all.filter(item => item.id !== id)
  await config.adapter.saveAll(next)

  return next
}
