<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/use-session'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const email = ref('')
const password = ref('')

const { session } = useSession()

function onSignIn() {
  supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div>
    <div v-if="session">
      {{ session.user.email }}
      <Button @click="supabase.auth.signOut()">
        Sign out
      </Button>
    </div>
    <form v-else @submit.prevent="onSignIn">
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <Button>
        Sign in
      </Button>
    </form>
  </div>
</template>
