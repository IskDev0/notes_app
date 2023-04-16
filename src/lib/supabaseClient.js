import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://kgchxtevoeisrawlxtzk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnY2h4dGV2b2Vpc3Jhd2x4dHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NDM1MjUsImV4cCI6MTk5NzIxOTUyNX0.hAk8lO3_xXQn1yX42bwUKG_UVIuaO32QZY2pgM-DoW8')