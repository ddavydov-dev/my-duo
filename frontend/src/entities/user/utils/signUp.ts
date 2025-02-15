import { supabase } from '../../../supabase'

export const signUp = async (email: string, password: string) =>
  supabase.auth.signUp({
    email,
    password
  })
