/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResourceDef, resourceDefs, ResourceRegistry } from './resourceRegistry'
import { snakeCaseObject } from './snakeCaseObject'
import { supabase } from '@/supabase'
import type { CascadeConfig } from './cascade'
import { useResource } from './hooks/useResource'
import { StorageAdapter } from './storage'

type ResourceKind = keyof ResourceRegistry

type EntityOf<K extends ResourceKind> =
  ResourceRegistry[K] extends ResourceDef<infer T, any> ? T : never
type CreateArgsOf<K extends ResourceKind> =
  ResourceRegistry[K] extends ResourceDef<any, infer C> ? C : never

type UseEntityReturn<K extends ResourceKind> = ReturnType<
  typeof useResource<EntityOf<K>, CreateArgsOf<K>>
>

export function useEntity<K extends ResourceKind>(kind: K, parentId?: string): UseEntityReturn<K> {
  const def = resourceDefs[kind] as ResourceRegistry[K]

  const adapter = def.adapter as unknown as StorageAdapter<EntityOf<K>>
  const createLocal = def.createLocal as unknown as (dto: CreateArgsOf<K>) => EntityOf<K>
  const cascadeLocal = def.cascadeConfig as unknown as CascadeConfig<EntityOf<K>> | undefined

  const parentKey = def.parentKey ? (def.parentKey as keyof EntityOf<K>) : undefined

  // build React-Query key + local filter
  const keys = parentId != undefined ? [kind, parentId] : [kind]
  const getFilterFn =
    parentKey && parentId ? (item: EntityOf<K>) => item[parentKey] === parentId : undefined

  // generic Supabase CRUD
  const { table } = def
  const createRemote = async (item: EntityOf<K>) =>
    !(await supabase
      .from(table)
      .insert([snakeCaseObject(item)])
      .then(r => r.error))
  const updateRemote = async (item: EntityOf<K>) =>
    !(await supabase
      .from(table)
      .update(snakeCaseObject(item))
      .eq('id', item.id)
      .then(r => r.error))
  const deleteRemote = async (id: string) =>
    !(await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .then(r => r.error))

  // now call your existing hook
  return useResource<EntityOf<K>, CreateArgsOf<K>>({
    keys,
    adapter,
    getFilterFn,
    createLocal,
    createRemote,
    updateRemote,
    deleteRemote,
    /** will be `undefined` for exercises, but cascade everywhere else */
    cascadeLocal
  })
}
