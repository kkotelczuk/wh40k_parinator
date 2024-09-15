<script setup lang="ts">
import { useSession } from '@/lib/use-session'
import './assets/index.css'

useSession()
</script>

<template>
  <RouterView />
</template>
