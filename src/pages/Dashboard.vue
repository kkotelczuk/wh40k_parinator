<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/vue-query'

const { data: tournaments, isLoading } = useQuery({
  queryKey: ['tournaments'],
  queryFn: async () => await supabase
    .from('tournament')
    .select('*')
    .then(res => res.data),
})
</script>

<template>
  <div>
    <h2>Tournaments</h2>
    <p v-if="isLoading">
      Loading tournaments...
    </p>
    <ul v-else>
      <li v-for="tournament in tournaments" :key="tournament.id">
        <RouterLink :to="`/tournament/${tournament.id}`">
          {{ tournament.name }}
        </RouterLink>
      </li>
    </ul>
    <Button @click="$router.push('/new_team')">
      New Team
    </Button>
  </div>
</template>
