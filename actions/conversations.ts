"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type Conversation = {
  id: string;
  product_name: string;
  business_name: string;
  updated_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  message_content: string;
  created_at: string;
};

export type SendEnquiryState = {
  ok: boolean;
  error?: string;
};

export async function getUserConversations(userId: string): Promise<{
  data: Conversation[] | null;
  error: string | null;
}> {
  try {
    const supabase = await createClient();

    // Get conversations where user is the buyer
    const { data: buyerConvs, error: buyerError } = await supabase
      .from("conversations")
      .select(
        `
        id,
        product:products(name),
        business:businesses!conversations_seller_business_id_fkey(id, name),
        updated_at
      `
      )
      .eq("buyer_id", userId)
      .order("updated_at", { ascending: false });

    if (buyerError) {
      console.error("Error fetching buyer conversations:", buyerError);
      throw new Error("Failed to fetch conversations");
    }

    // Get conversations where user is associated with the business
    const { data: userBusinesses, error: ubError } = await supabase
      .from("user_businesses")
      .select("business_id")
      .eq("user_id", userId);

    if (ubError) {
      console.error("Error fetching user businesses:", ubError);
      throw new Error("Failed to fetch conversations");
    }

    const businessIds = userBusinesses.map((ub) => ub.business_id);
    let sellerConvs: any[] = [];

    if (businessIds.length > 0) {
      const { data, error: sellerError } = await supabase
        .from("conversations")
        .select(
          `
          id,
          product:products(name),
          business:businesses!conversations_seller_business_id_fkey(id, name),
          updated_at
        `
        )
        .in("seller_business_id", businessIds)
        .order("updated_at", { ascending: false });

      if (sellerError) {
        console.error("Error fetching seller conversations:", sellerError);
        throw new Error("Failed to fetch conversations");
      }

      sellerConvs = data || [];
    }

    // Combine and deduplicate conversations
    const allConvs = [...(buyerConvs || []), ...sellerConvs];
    const uniqueConvs = allConvs.filter(
      (conv, index, self) => index === self.findIndex((c) => c.id === conv.id)
    );

    // Transform the data to match our simplified interface
    const conversations = uniqueConvs.map((conv) => ({
      id: conv.id,
      product_name: Array.isArray(conv.product)
        ? conv.product[0]?.name
        : conv.product?.name || "Product",
      business_name: Array.isArray(conv.business)
        ? conv.business[0]?.name
        : conv.business?.name || "Business",
      updated_at: conv.updated_at,
    }));

    return { data: conversations, error: null };
  } catch (error) {
    console.error("Error in getUserConversations:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to load conversations",
    };
  }
}

export async function getConversationMessages(conversationId: string): Promise<{
  data: Message[] | null;
  error: string | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("conversation_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
    }

    const messages = (data || []).map((msg) => ({
      id: msg.id,
      sender_id: msg.sender_id,
      message_content: msg.message_content,
      created_at: msg.created_at,
    }));

    return { data: messages, error: null };
  } catch (error) {
    console.error("Error in getConversationMessages:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to load messages",
    };
  }
}

export async function sendMessage(
  conversationId: string,
  userId: string,
  message: string
): Promise<{
  data: { id: string } | null;
  error: string | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("conversation_messages")
      .insert([
        {
          conversation_id: conversationId,
          sender_id: userId,
          message_content: message.trim(),
          message_type: "text",
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }

    // Update conversation's updated_at
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return { data, error: null };
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
}

export async function sendEnquiry(
  _prevState: SendEnquiryState,
  formData: FormData
): Promise<SendEnquiryState> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = (formData.get("pathname") as string) || "/";
  const search = (formData.get("search") as string) || "";
  const returnUrl = search ? `${pathname}?${search}` : pathname;

  if (!user) {
    redirect(`/auth?redirectedFrom=${encodeURIComponent(returnUrl)}`);
  }

  const productId = formData.get("productId") as string;
  const sellerId = formData.get("sellerId") as string; // business_id
  const message = (formData.get("message") as string)?.trim();

  if (!productId || !sellerId || !message) {
    return { ok: false, error: "Missing required fields." };
  }

  try {
    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .insert({
        buyer_id: user!.id,
        seller_business_id: sellerId,
        product_id: productId,
        status: "open",
      })
      .select()
      .single();

    if (convError || !conversation) {
      console.error("Error creating conversation:", convError);
      return { ok: false, error: "Could not create conversation." };
    }

    const { error: msgError } = await supabase.from("conversation_messages").insert({
      conversation_id: conversation.id,
      sender_id: user!.id,
      message_type: "text",
      message_content: message,
    });

    if (msgError) {
      console.error("Error sending message:", msgError);
      return { ok: false, error: "Could not send message." };
    }

    revalidatePath("/enquiries");
    redirect("/enquiries");
  } catch (e) {
    console.error("sendEnquiry error:", e);
    return { ok: false, error: "Unexpected error." };
  }
}
