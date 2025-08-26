import { MobileHeader } from "@/components/header/mobile-header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ConversationClient } from "../enquiries-client";

export default async function EnquiryConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const conversationId = (await params).id;

  return (
    <>
      <MobileHeader isBack title="Conversation" />
      <ConversationClient
        conversationId={conversationId}
        userId={user.id}
      />
    </>
  );
}
