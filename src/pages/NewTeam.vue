<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/vue-query'
import { useDebounce } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { data: tournaments, isLoading } = useQuery({
  queryKey: ['tournaments'],
  queryFn: async () => await supabase
    .from('tournament')
    .select('*')
    .then(res => res.data),
})

const searchQuery = ref('')
const debouncedSearchQuery = useDebounce(searchQuery, 300)

const { data: members, refetch: refetchMembers } = useQuery({
  queryKey: ['profiles', debouncedSearchQuery],
  queryFn: async () => await supabase
    .from('profiles')
    .select('*')
    .or(`first_name.ilike.%${debouncedSearchQuery.value}%,last_name.ilike.%${debouncedSearchQuery.value}%,nickname.ilike.%${debouncedSearchQuery.value}%`)
    .then(res => res.data),
})

const showAutocomplete = computed(() => searchQuery.value.length > 0 && members.value && members.value.length > 0)

function searchMembers() {
  refetchMembers()
}

const selectedMembers = ref<any[]>([])

function addMember(member: any) {
  selectedMembers.value.push(member)
  searchQuery.value = ''
}

function removeMember(member: any) {
  selectedMembers.value = selectedMembers.value.filter(m => m.id !== member.id)
}

const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <Card class="w-[550px]">
      <CardHeader>
        <CardTitle>Create team</CardTitle>
        <CardDescription>Create new team, select tournament and invite your friends</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Name</Label>
              <Input id="name" placeholder="Name of your team" />
            </div>
            <p v-if="isLoading">
              Loading tournaments...
            </p>
            <div v-else class="flex flex-col space-y-1.5">
              <Label for="tournament">Tournament</Label>
              <Select>
                <SelectTrigger id="tournament">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem v-for="tournament in tournaments" :key="tournament.id" :value="String(tournament.id)">
                    {{ tournament.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="members">Members</Label>
              <div class="relative">
                <Input
                  id="members"
                  v-model="searchQuery"
                  placeholder="Start typing to search members..."
                  @input="searchMembers"
                />
                <ul v-if="showAutocomplete" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <li
                    v-for="member in members"
                    :key="member.id"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    @click="addMember(member)"
                  >
                    {{ member.first_name }}
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="selectedMembers.length > 0" class="flex flex-wrap gap-2">
              <div
                v-for="member in members"
                :key="member.id"
                class="px-2 py-1 text-sm bg-gray-200 rounded-full"
              >
                {{ member.first_name }}
                <button class="ml-2 text-gray-600 hover:text-gray-800" @click="removeMember(member)">
                  &times;
                </button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button variant="outline" @click="router.back()">
          Cancel
        </Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  </div>
</template>
