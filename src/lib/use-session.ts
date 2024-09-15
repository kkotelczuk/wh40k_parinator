import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { createSharedComposable } from '@vueuse/core'
import { supabase } from './supabase'

export const useSession = createSharedComposable(() => {
  const queryClient = useQueryClient()
  const { data, ...query } = useQuery({
    queryKey: ['session'],
    queryFn: async () => await supabase.auth
      .getSession()
      .then(res => res.data?.session),
  })

  supabase.auth.onAuthStateChange((_, session) => {
    queryClient.setQueryData(['session'], session)
  })

  return {
    ...query,
    session: data,
  }
})
