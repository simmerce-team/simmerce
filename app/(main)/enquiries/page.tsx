import { getUserConversations } from '@/actions/conversations'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { EnquiriesClient } from './enquiries-client'

export default async function EnquiriesPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth?redirect=/enquiries')
  }

  // Fetch conversations on the server side
  const { data: conversations, error: convError } = await getUserConversations(user.id)
  
  if (convError) {
    console.error('Error fetching conversations:', convError)
    // We'll still render the page but show an error state
  }

  return (
    <EnquiriesClient 
      initialConversations={conversations || []} 
      userId={user.id}
    />
  )
}