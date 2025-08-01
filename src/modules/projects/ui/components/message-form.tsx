"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
  value: z
    .string()
    .min(1, "Message cannot be empty")
    .max(10000, "Message is too long"),
});

export function MessageForm({ projectId }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const showUsage = false; // Replace with actual logic to determine if usage should be shown
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries(
        trpc.messages.getMany.queryOptions({ projectId })
      );
    },

    onError: (error) => {
      toast.error(`Error creating message: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  }));

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Call the create message mutation here
    await createMessage.mutateAsync({ value: data.value, projectId });
  };

  const isPending = createMessage.isPending;
  const isDisabled = isPending || !form.formState.isValid;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutosize
              disabled={isPending}
              {...field}
              minRows={2}
              maxRows={8}
              placeholder="What would you like to build??"
              className="pt-4 resize-none border-none w-full outline-none bg-transparent "
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />

        <div className="flex gap-2 items-end justify-end pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>#8984</span> Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            disabled={isDisabled}
            className={cn(
              "size-8 rounded-full",
              isDisabled && "bg-muted-foreground border"
            )} type="submit">
              {
                isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                   <ArrowUpIcon className="size-4" />
                )
              }
          
          </Button>
        </div>
      </form>
    </Form>
  );
}
