"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();

  const {data: messages} = useQuery(trpc.messages.getMany.queryOptions());

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created successfully!");
      },
      onError: (error) => {
        console.error("Error creating message:", error);
      },
    })
  );

  return (
    <div className="font-bold text-3xl text-center my-10">
      <h1>Welcome to Lovable!</h1>
      <div className="text-lg text-gray-500 my-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message here..."
          className="my-4"
        />
        <Button onClick={() => createMessage.mutate({ value: value })}>
          Click Me
        </Button>
        {messages && (
          JSON.stringify(messages, null, 2)
        )}
      </div>
    </div>
  );
}
