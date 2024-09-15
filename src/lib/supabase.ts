import type { Database } from './database.types'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient<Database>(
  'https://ffgsfmtkzifefebhmriy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZ3NmbXRremlmZWZlYmhtcml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MTY0NzgsImV4cCI6MjA0MTk5MjQ3OH0.ic1Lkq7T7gNC2MT3ZoeWvbc5xguyJtCSGypO771-mUA',
)
