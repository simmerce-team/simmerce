import { getUserConversations } from "@/actions/conversations";
import { MobileHeader } from "@/components/header/mobile-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { EnquiriesClient, EnquiriesList } from "./enquiries-client";

export default async function EnquiriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth?redirect=/enquiries");
  }

  // Fetch conversations on the server side
  const { data: conversations, error: convError } = await getUserConversations(
    user.id
  );

  if (convError) {
    console.error("Error fetching conversations:", convError);
    // We'll still render the page but show an error state
  }

  return (
    <>
      <MobileHeader title="Enquiries" />
      {/* Mobile: show list only; chat opens at /enquiries/[id] */}
      <div className="md:hidden">
        <EnquiriesList initialConversations={conversations || []} />
      </div>
      {/* Desktop: keep existing two-column experience */}
      <div className="hidden md:block">
        <EnquiriesClient
          initialConversations={conversations || []}
          userId={user.id}
        />
      </div>
      <BottomNav />
    </>
  );
}
