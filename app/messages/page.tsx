"use client";

import { useState } from "react";
import { useChat } from "@/hooks/chat/useChat";
import { useProfile } from "@/hooks/profile/useProfile";
import {
  ConversationList,
  ChatHeader,
  MessageList,
  ChatInput,
  EmptyChatState,
  NewConversation,
} from "@/features/chat";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";

export default function MessagesPage() {
  const [showChatMobile, setShowChatMobile] = useState(false);
  const { data: profile } = useProfile();

  const {
    conversations,
    messages,
    selectedConversation,
    selectedConversationId,
    pendingUserId,
    onlineUsers,
    isTyping,
    currentUserId,
    currentUserImage,
    isLoadingConversations,
    isFetchingConversations,
    isLoadingMessages,
    isSending,
    selectConversation,
    sendMessage,
    refetchConversations,
    sendTypingStatus,
    deleteConversation,
    isDeleting,
  
  } = useChat();

  const handleSelectConversation = (id: number) => {
    selectConversation(id);
    setShowChatMobile(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg" dir="rtl">
      <div className="sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </div>

      <main className="flex-1 mx-auto w-full p-4 sm:p-6 lg:p-10">
        <div className="bg-card-bg shadow-xl border border-border rounded-3xl overflow-hidden flex h-[calc(100vh-140px)] sm:h-[calc(100vh-220px)] min-h-[600px]">
          {/* Sidebar */}
          <div
            className={`${
              showChatMobile ? "hidden md:flex" : "flex"
            } w-full md:w-[380px] border-l border-border flex-col transition-all duration-300 shadow-sm z-10`}
          >
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversationId}
              onlineUsers={onlineUsers}
              onSelect={handleSelectConversation}
              onRefresh={refetchConversations}
              isLoading={isLoadingConversations}
              isFetching={isFetchingConversations}
            />
          </div>

          {/* Chat Window */}
          <div
            className={`${
              showChatMobile ? "flex" : "hidden md:flex"
            } flex-1 flex-col bg-bg/30 backdrop-blur-sm transition-all duration-300`}
          >
            {selectedConversation ? (
              <>
                <ChatHeader
                  name={selectedConversation.otherUserName}
                  image={selectedConversation.otherUserImage}
                  isOnline={
                    selectedConversation.isOnline ||
                    onlineUsers.has(selectedConversation.otherUserId)
                  }
                  onBack={() => setShowChatMobile(false)}
                  onDelete={() => deleteConversation(selectedConversation.id)}
                  isDeleting={isDeleting}
                />

                <MessageList
                  messages={messages}
                  currentUserId={currentUserId}
                  currentUserImage={
                    profile?.profilePictureUrl || currentUserImage
                  }
                  otherUserImage={selectedConversation.otherUserImage}
                  isTyping={isTyping}
                  isLoading={isLoadingMessages}
                />

                <ChatInput
                  key={selectedConversation.id}
                  onSend={(content, attachment) =>
                    sendMessage(
                      selectedConversation.otherUserId,
                      content,
                      attachment,
                    )
                  }
                  isSending={isSending}
                  onTyping={sendTypingStatus}
                />
              </>
            ) : pendingUserId ? (
              <NewConversation
                onSend={(content) => {
                  sendMessage(pendingUserId, content);
                }}
                isSending={isSending}
              />
            ) : (
              <EmptyChatState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
