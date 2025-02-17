import { supabase } from '@/supabase'

export const signInWithEmail = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUpWithEmail = (email: string, password: string, name?: string) => {
  const options = name ? { data: { name } } : undefined

  return supabase.auth.signUp({ email, password, options })
}

export const signOut = () => supabase.auth.signOut()
