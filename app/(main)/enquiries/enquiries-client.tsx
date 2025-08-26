"use client";

import {
  getConversationMessages,
  sendMessage as sendMessageAction,
} from "@/actions/conversations";
import { Card } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Loader2, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Conversation = {
  id: string;
  product_name: string;
  business_name: string;
  updated_at: string;
  product_image?: string;
};

type Message = {
  id: string;
  sender_id: string;
  message_content: string;
  created_at: string;
};

type EnquiriesClientProps = {
  initialConversations: Conversation[];
  userId: string;
};

export function EnquiriesClient({
  initialConversations,
  userId,
}: EnquiriesClientProps) {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Keep current conversation object in sync
  useEffect(() => {
    if (!selectedConversation) {
      setCurrentConversation(null);
      return;
    }
    const conv = conversations.find((c) => c.id === selectedConversation) || null;
    setCurrentConversation(conv);
  }, [selectedConversation, conversations]);

  // Query messages for the selected conversation
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["conversation", selectedConversation],
    queryFn: async () => {
      if (!selectedConversation) return [] as Message[];
      const { data } = await getConversationMessages(selectedConversation);
      return data || [];
    },
    enabled: !!selectedConversation,
  });

  // Mutation to send a message with optimistic update
  const sendMessageMutation = useMutation({
    mutationFn: async (messageContent: string) => {
      if (!selectedConversation) throw new Error("No conversation selected");
      const { data } = await sendMessageAction(
        selectedConversation,
        userId,
        messageContent
      );
      return data;
    },
    onMutate: async (messageContent: string) => {
      if (!selectedConversation) return;
      // cancel outgoing fetches so we don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["conversation", selectedConversation],
      });
      const previous =
        (queryClient.getQueryData<Message[]>([
          "conversation",
          selectedConversation,
        ]) as Message[]) || [];

      const optimistic: Message = {
        id: `temp-${Date.now()}`,
        sender_id: userId,
        message_content: messageContent,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Message[]>(
        ["conversation", selectedConversation],
        [...previous, optimistic]
      );

      // Update conversations list ordering
      setConversations((prev) =>
        prev
          .map((conv) =>
            conv.id === selectedConversation
              ? { ...conv, updated_at: new Date().toISOString() }
              : conv
          )
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
      );

      return { previous } as { previous: Message[] };
    },
    onError: (_err, _vars, context) => {
      if (!selectedConversation) return;
      if (context?.previous) {
        queryClient.setQueryData<Message[]>(
          ["conversation", selectedConversation],
          context.previous
        );
      }
    },
    onSettled: () => {
      if (!selectedConversation) return;
      queryClient.invalidateQueries({
        queryKey: ["conversation", selectedConversation],
      });
    },
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sendMessageMutation.isPending) return;
    const messageContent = newMessage;
    setNewMessage("");
    sendMessageMutation.mutate(messageContent);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    let timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo
      .replace("about ", "")
      .replace("less than a minute ago", "just now")
      .replace("minute", "min");
  };

  const handleBackToList = () => {
    // On mobile, go back to the conversation list by clearing selection
    setSelectedConversation(null);
  };

  // Auto-scroll to bottom when messages update or conversation changes
  useEffect(() => {
    if (!bottomRef.current) return;
    // Use smooth scroll after initial paint; instant on first mount is fine too
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, selectedConversation]);

  return (
    <Card className="m-4 p-0 md:h-[calc(100vh-140px)] overflow-hidden flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List - hidden on mobile when a conversation is selected */}
        <div
          className={`bg-white flex flex-col w-full md:w-80 lg:w-96 border-r border-gray-200 ${selectedConversation ? "hidden md:flex" : "flex"}`}
        >
          <div
            className="hidden md:block p-4 border-b border-gray-200 sticky top-0 z-10 md:static"
          >
            <h2 className="font-semibold text-lg">My Enquiries</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`px-4 md:p-4 md:border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
                    selectedConversation === conv.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {conv.business_name}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatTimeAgo(conv.updated_at)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                <MessageSquare className="h-10 w-10 mb-2" />
                <p>No conversations yet</p>
                <p className="text-sm mt-2">Your enquiries will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Messages Area */}
        {selectedConversation && currentConversation && (
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Conversation Header */}
            <div
              className="border-b border-gray-200 bg-white p-3 sticky top-0 z-10 md:static"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="p-1 -ml-1 text-gray-500 hover:text-gray-700 md:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {currentConversation.business_name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 p-3 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isCurrentUser = msg.sender_id === userId;

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]">
                          <div
                            className={`p-3 rounded-lg text-sm sm:text-base ${
                              !isCurrentUser
                                ? "bg-primary text-white rounded-br-none"
                                : "bg-white border border-gray-200 rounded-bl-none"
                            }`}
                          >
                            <div className="break-words">
                              {msg.message_content}
                            </div>
                            <div
                              className={`text-xs mt-1 text-right`}
                            >
                              {formatTimeAgo(msg.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                  <MessageSquare className="h-10 w-10 mb-2" />
                  <p>No messages yet</p>
                  <p className="text-sm mt-1">Start the conversation</p>
                </div>
              )}
              {/* Bottom sentinel for auto-scroll */}
              <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 bg-white p-3 sticky bottom-0 md:static">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSendMessage()
                  }
                  className="flex-1 border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Type a message..."
                  disabled={sendMessageMutation.isPending}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sendMessageMutation.isPending}
                  className="bg-primary text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// Mobile: list of conversations linking to /enquiries/[id]
export function EnquiriesList({ initialConversations }: { initialConversations: Conversation[] }) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    let timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo.replace("about ", "").replace("less than a minute ago", "just now").replace("minute", "min");
  };

  return (
      <div className="flex-1 overflow-y-auto">
        {initialConversations.length > 0 ? (
          initialConversations.map((conv) => (
            <Link
              href={`/enquiries/${conv.id}`}
              key={conv.id}
              className="block px-4 py-3 hover:bg-gray-50 border-b"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{conv.business_name}</div>
                  <div className="text-xs text-gray-400 mt-1">{formatTimeAgo(conv.updated_at)}</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
            <MessageSquare className="h-10 w-10 mb-2" />
            <p>No conversations yet</p>
            <p className="text-sm mt-2">Your enquiries will appear here</p>
          </div>
        )}
      </div>
  );
}

// Mobile: single conversation page client
export function ConversationClient({ conversationId, userId }: { conversationId: string; userId: string }) {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const { data } = await getConversationMessages(conversationId);
      return (data || []) as Message[];
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageContent: string) => {
      const { data } = await sendMessageAction(conversationId, userId, messageContent);
      return data;
    },
    onMutate: async (messageContent: string) => {
      await queryClient.cancelQueries({ queryKey: ["conversation", conversationId] });
      const previous = (queryClient.getQueryData<Message[]>(["conversation", conversationId]) as Message[]) || [];
      const optimistic: Message = {
        id: `temp-${Date.now()}`,
        sender_id: userId,
        message_content: messageContent,
        created_at: new Date().toISOString(),
      };
      queryClient.setQueryData<Message[]>(["conversation", conversationId], [...previous, optimistic]);
      return { previous } as { previous: Message[] };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) queryClient.setQueryData<Message[]>(["conversation", conversationId], ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation", conversationId] });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || sendMessageMutation.isPending) return;
    const messageContent = newMessage;
    setNewMessage("");
    sendMessageMutation.mutate(messageContent);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    let timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo.replace("about ", "").replace("less than a minute ago", "just now").replace("minute", "min");
  };

  useEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, conversationId]);

  return (
    <>
      <div className="flex-1 p-3 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.sender_id === userId;
              return (
                <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%] sm:max-w-[75%]">
                    <div className={`p-3 rounded-lg text-sm sm:text-base ${!isCurrentUser ? "bg-primary text-white rounded-br-none" : "bg-white border border-gray-200 rounded-bl-none"}`}>
                      <div className="break-words">{msg.message_content}</div>
                      <div className="text-xs mt-1 text-gray-400 text-right">{formatTimeAgo(msg.created_at)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
            <MessageSquare className="h-10 w-10 mb-2" />
            <p>No messages yet</p>
            <p className="text-sm mt-1">Start the conversation</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-200 bg-white p-3 sticky bottom-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            className="flex-1 border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Type a message..."
            disabled={sendMessageMutation.isPending}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sendMessageMutation.isPending}
            className="bg-primary text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sendMessageMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </>
  );
}
