// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({
          error: 'Method not allowed'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 405
        }
      )
    }
    const { userId } = await req.json()
    if (!userId) {
      return new Response(
        JSON.stringify({
          error: 'Missing user ID'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    const { error: dbError } = await supabase.from('profile').delete().match({
      id: userId
    })
    if (dbError) {
      return new Response(
        JSON.stringify({
          error: `DB cleanup failed: ${dbError.message}`
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    const { error: authError } = await supabase.auth.admin.deleteUser(userId)
    if (authError) {
      console.log('🧗 authError:', authError)
      return new Response(
        JSON.stringify({
          error: `Auth deletion failed: ${authError.message}`
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    return new Response(
      JSON.stringify({
        message: `User ${userId} deleted successfully`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: err?.message ?? err
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
