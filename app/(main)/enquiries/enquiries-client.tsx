"use client";

import {
  getConversationMessages,
  sendMessage as sendMessageAction,
} from "@/actions/conversations";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Loader2, MessageSquare, Send } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversationList(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Load messages when conversation is selected
  useEffect(() => {
    if (!selectedConversation) return;

    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const { data } = await getConversationMessages(selectedConversation);
        setMessages(data || []);
        const conv = conversations.find((c) => c.id === selectedConversation);
        if (conv) setCurrentConversation(conv);

        // On mobile, show conversation view when a conversation is selected
        if (isMobileView) {
          setShowConversationList(false);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [selectedConversation, userId, isMobileView]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending) return;

    const messageContent = newMessage;
    setNewMessage("");
    setIsSending(true);

    try {
      const { data } = await sendMessageAction(
        selectedConversation,
        userId,
        messageContent
      );

      if (data?.id) {
        const newMsg = {
          id: data.id,
          sender_id: userId,
          message_content: messageContent,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);

        // Update the conversation's updated_at in the list
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
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setNewMessage(messageContent);
    } finally {
      setIsSending(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    let timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo
      .replace("about ", "")
      .replace("less than a minute ago", "just now")
      .replace("minute", "min");
  };

  // Toggle between conversation list and messages on mobile
  const handleBackToList = () => {
    setShowConversationList(true);
  };

  return (
    <Card className="py-0 h-[calc(100vh-180px)] md:h-[calc(100vh-140px)] overflow-hidden flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List - Hidden on mobile when a conversation is selected */}
        {(showConversationList || !isMobileView) && (
          <div
            className={`${
              isMobileView
                ? "w-full"
                : "w-full md:w-80 lg:w-96 border-r border-gray-200"
            } bg-white flex flex-col`}
          >
            <div
              className={`${
                isMobileView
                  ? "sticky top-0 z-10 bg-white border-b border-gray-200"
                  : "border-b border-gray-200"
              } p-4`}
            >
              <h2 className="font-semibold text-lg">My Enquiries</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length > 0 ? (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
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
                  <p className="text-sm mt-2">
                    Your enquiries will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Area */}
        {(!isMobileView || !showConversationList) &&
          selectedConversation &&
          currentConversation && (
            <div className="flex-1 flex flex-col bg-gray-50">
              {/* Conversation Header */}
              <div
                className={`${
                  isMobileView ? "sticky top-0 z-10" : ""
                } border-b border-gray-200 bg-white p-3`}
              >
                <div className="flex items-center gap-3">
                  {isMobileView && (
                    <button
                      onClick={handleBackToList}
                      className="p-1 -ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
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
                                isCurrentUser
                                  ? "bg-blue-500 text-white rounded-br-none"
                                  : "bg-white border border-gray-200 rounded-bl-none"
                              }`}
                            >
                              <div className="break-words">
                                {msg.message_content}
                              </div>
                              <div
                                className={`text-xs mt-1 ${
                                  isCurrentUser
                                    ? "text-blue-100"
                                    : "text-gray-400"
                                } text-right`}
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
              </div>

              {/* Message Input */}
              <div
                className={`${
                  isMobileView ? "sticky bottom-0" : ""
                } border-t border-gray-200 bg-white p-3`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendMessage()
                    }
                    className="flex-1 border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a message..."
                    disabled={isSending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isSending}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSending ? (
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
