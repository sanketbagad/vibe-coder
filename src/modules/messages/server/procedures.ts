import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const messages = await prisma.message.findMany({
      orderBy: { updatedAt: "desc" },
      take: 100,
      include: {
        fragments: true,
      },
    });
    return messages;
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, "Message cannot be empty")
          .max(10000, "Message is too long"),
        projectId: z.string().min(1, "Project ID cannot be empty"),
      })
    )
    .mutation(async ({ input }) => {
      const newMessage = await prisma.message.create({
        data: {
          projectId: input.projectId,
          content: input.value,
          role: "USER",
          type: "RESULT",
        },
      });
      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: input.projectId, // Pass the project
        },
      });
      return newMessage;
    }),
});
