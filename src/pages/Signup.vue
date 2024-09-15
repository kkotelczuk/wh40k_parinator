<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
</script>

<template>
  <h2>Signup</h2>
  <Button @click="supabase.auth.signOut()">
    Sign out
  </Button>
</template>
