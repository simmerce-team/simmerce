'use client'

import { getConversationMessages, sendMessage as sendMessageAction } from '@/actions/conversations'
import { formatDistanceToNow } from 'date-fns'
import { Loader2, MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'

type Conversation = {
  id: string
  product_name: string
  business_name: string
  updated_at: string
}

type Message = {
  id: string
  sender_id: string
  message_content: string
  created_at: string
}

type EnquiriesClientProps = {
  initialConversations: Conversation[]
  userId: string
}

export function EnquiriesClient({ initialConversations, userId }: EnquiriesClientProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Load messages when conversation is selected
  useEffect(() => {
    if (!selectedConversation) return

    const loadMessages = async () => {
      setIsLoading(true)
      try {
        const { data } = await getConversationMessages(selectedConversation, userId)
        setMessages(data || [])
        // Set the current conversation details
        const conv = conversations.find(c => c.id === selectedConversation)
        if (conv) setCurrentConversation(conv)
      } catch (error) {
        console.error('Error loading messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [selectedConversation, userId])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending) return

    const messageContent = newMessage
    setNewMessage('')
    setIsSending(true)

    try {
      const { data } = await sendMessageAction(selectedConversation, userId, messageContent)
      
      if (data?.id) {
        setMessages(prev => [...prev, {
          id: data.id,
          sender_id: userId,
          message_content: messageContent,
          created_at: new Date().toISOString()
        }])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setNewMessage(messageContent) // Restore message if sending fails
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-200px)] border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Conversations</h2>
        </div>
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedConversation === conv.id ? 'bg-blue-50' : ''}`}
            onClick={() => setSelectedConversation(conv.id)}
          >
            <div className="font-medium">{conv.product_name}</div>
            <div className="text-sm text-gray-500">{conv.business_name}</div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="border-b p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {currentConversation?.product_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentConversation?.business_name}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedConversation(null)
                    setCurrentConversation(null)
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : messages.length > 0 ? (
                messages.map(msg => {
                  const isCurrentUser = msg.sender_id === userId;
                  const messageDate = new Date(msg.created_at);
                  
                  let timeAgo = formatDistanceToNow(messageDate, { addSuffix: true });
                  
                  // Make it more user-friendly
                  timeAgo = timeAgo
                    .replace('about ', '')
                    .replace('less than a minute ago', 'just now')
                    .replace('minute', 'min');
                  
                  return (
                    <div 
                      key={msg.id} 
                      className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-[80%]">
                        <div 
                          className={`p-3 rounded-lg ${isCurrentUser 
                            ? 'bg-blue-500 text-white rounded-br-none' 
                            : 'bg-gray-100 rounded-bl-none'}`}
                        >
                          {msg.message_content}
                          <div 
                            className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'} text-right`}
                          >
                            {timeAgo}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageSquare className="h-10 w-10 mb-2" />
                  <p>No messages yet</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  disabled={isSending}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={!newMessage.trim() || isSending}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : 'Send'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
