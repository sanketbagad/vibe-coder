import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const ProjectsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string().min(1, "Project ID cannot be empty"),
      })
    )
    .query(async ({ input }) => {
      const project = await prisma.project.findUnique({
        where: { id: input.id },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Project with ID ${input.id} not found`,
        });
      }
      return project;
    }),
  getMany: baseProcedure.query(async () => {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 100,
    });
    return projects;
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, "Message cannot be empty")
          .max(10000, "Message is too long"),
      })
    )
    .mutation(async ({ input }) => {
      const newProject = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab",
          }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });
      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: newProject.id, // Pass the project ID to the event
        },
      });
      return newProject;
    }),
});
