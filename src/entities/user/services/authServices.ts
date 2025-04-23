import { supabase } from '@/supabase'

export const signInWithEmail = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUpWithEmail = (email: string, password: string, name?: string) => {
  const options = name ? { data: { name } } : undefined

  return supabase.auth.signUp({ email, password, options })
}

export const signOut = () => {
  localStorage.removeItem('offline_skills')
  localStorage.removeItem('offline_units')
  localStorage.removeItem('offline_lessons')
  localStorage.removeItem('offline_exercises')
  localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE')
  supabase.auth.signOut()
}
