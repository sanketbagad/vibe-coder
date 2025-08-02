"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessageCard from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";
import { Fragment } from "@/generated/prisma";
import { MessageLoading } from "./message-loading";

interface MessagesContainerProps {
  projectId: string;
  activeFragment: Fragment| null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

export const MessagesContainer = ({ projectId, activeFragment, setActiveFragment }: MessagesContainerProps) => {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId }, {
      refetchInterval: 5000, // Refetch every 5 seconds
    })
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === "ASSISTANT" && !!message.fragments
    );
    if (lastAssistantMessage) {
      setActiveFragment(lastAssistantMessage.fragments);
    }

  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard 
            key={message.id}
            content={message.content}
            role={message.role}
            fragment={message.fragments}
            createdAt={message.createdAt}
            isActiveFragment={activeFragment?.id === message.fragments?.id}
            onFragmentClick={() => setActiveFragment(message.fragments)}
            type={message.type}
            />
          ))}
        </div>
        {isLastMessageUser && (
         <MessageLoading />
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background/70 pointer-events-none" />
        {/* Message Form */}
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};
