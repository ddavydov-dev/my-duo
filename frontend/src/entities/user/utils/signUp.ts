import { supabase } from '../../../supabase'

export const signUp = async (email: string, password: string) => {
  const { data } = await supabase.auth.signUp({
    email,
    password
  })

  if (data.user) {
    await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email,
      name: data.user.email
    })
  }
}
