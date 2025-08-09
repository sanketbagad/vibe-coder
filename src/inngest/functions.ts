import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import {
  createAgent,
  createNetwork,
  createState,
  createTool,
  openai,
  type Message,
} from "@inngest/agent-kit";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";
import { stdout } from "process";
import { z } from "zod";
import { PROMPT } from "@/utils/prompts";
import prisma from "@/lib/db";

export const codeAgent = inngest.createFunction(
  { id: "code.agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("lovable-test-5");
      return sandbox.sandboxId;
    });

    const previousMessages = await step.run(
      "get-previous-messages",
      async () => {
        const formattedMessages: Message[] = [];

        const messages = await prisma.message.findMany({
          where: {
            projectId: event.data.projectId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        for (const message of messages) {
          formattedMessages.push({
            type: "text",
            role: message.role === "ASSISTANT" ? "assistant" : "user",
            content: message.content,
          });
        }
        return formattedMessages;
      }
    );

    const state = createState(
      {
        summary: "",
        files: {},
      },
      {
        messages: previousMessages,
      }
    );

    const agent = createAgent({
      name: "lovable-agent",
      description: "An Expert coding agent",
      system: PROMPT,
      model: openai({
        model: "gpt-4.1",
        defaultParameters: {
          temperature: 0.1,
        },
      }),
      tools: [
        createTool({
          name: "terminal",
          description: "Use the terminal to run commands",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = { stdout: "", stderr: "" };
              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                  },
                });
                if (result.exitCode !== 0) {
                  throw new Error(
                    `Command failed with exit code ${result.exitCode}. Stderr: ${buffers.stderr}`
                  );
                }

                return result.stdout;
              } catch (error) {
                return `Command failed: ${error} \nstdout: ${buffers.stdout} \nstderr: ${buffers.stderr}`;
              }
            });
          },
        }),
        createTool({
          name: "createOrUpdateFiles",
          description: "Create or update files in the sandbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              })
            ),
          }),

          handler: async ({ files }, { step, network }) => {
            const newFiles = await step?.run(
              "create-or-update-files",
              async () => {
                try {
                  const updatedFiles = network.state.data.files || {};
                  const sandbox = await getSandbox(sandboxId);
                  for (const file of files) {
                    await sandbox.files.write(file.path, file.content);
                    updatedFiles[file.path] = file.content;
                  }
                  return updatedFiles;
                } catch (error) {
                  return `Failed to create or update files: ${error}`;
                }
              }
            );

            if (typeof newFiles === "object") {
              network.state.data.files = newFiles;
            }
          },
        }),
        createTool({
          name: "readFiles",
          description: "Read files from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step, network }) => {
            return await step?.run("read-files", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const fileContents: any = [];
                for (const filePath of files) {
                  const content = await sandbox.files.read(filePath);
                  fileContents.push({ path: filePath, content });
                }

                return JSON.stringify(fileContents);
              } catch (error) {
                return `Failed to read files: ${error}`;
              }
            });
          },
        }),
      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);
          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        },
      },
    });

    const network = createNetwork({
      name: "lovable-network",
      agents: [agent],
      maxIter: 15,
      defaultState: state,
      router: async ({ network }) => {
        const summary = network.state.data.summary;
        if (summary) {
          return;
        }

        return agent;
      },
    });

    const result = await network.run(event.data.value, { state });

    const isError =
      !result.state.data.summary ||
      Object.keys(result.state.data.files || {}).length === 0;

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });

    await step.run("save-result", async () => {
      if (isError) {
        return await prisma.message.create({
          data: {
            projectId: event.data.projectId,
            content: "Error: Unable to generate a valid response.",
            role: "ASSISTANT",
            type: "ERROR",
          },
        });
      }
      return await prisma.message.create({
        data: {
          projectId: event.data.projectId,
          content: result.state.data.summary as string,
          role: "ASSISTANT",
          type: "RESULT",
          fragments: {
            create: {
              sandboxUrl: sandboxUrl,
              files: result.state.data.files || {},
              title: "Fragment",
            },
          },
        },
      });
    });

    await step.sleep("wait-a-moment", "1s");
    return {
      url: sandboxUrl,
      title: "Fragment",
      files: result.state.data.files || {},
      summary: result.state.data.summary || "No summary available",
    };
  }
);
