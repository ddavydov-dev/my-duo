import { supabase } from '../../../supabase'

export const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({
    email,
    password
  })
