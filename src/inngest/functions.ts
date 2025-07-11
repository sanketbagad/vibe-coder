import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter"
import { createAgent, openai } from '@inngest/agent-kit';
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
        const sandbox = await Sandbox.create('lovable-test-5');
        return sandbox.sandboxId;
      });

    const agent = createAgent({
        name: "lovable-agent",
        system: `You are a helpful assistant that can run code in a sandbox. The sandbox ID is ${sandboxId}.`,
        model: openai({ model: "gpt-4o" }),
    });

    const { output } = await agent.run(
        `Write a code that returns a greeting message with the user's email.`,
    )

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
        const sandbox = await getSandbox(sandboxId);
        const host = sandbox.getHost(3000);
        return `http://${host}`;
    });

    await step.sleep("wait-a-moment", "1s");
    return { output, sandboxUrl };
  },
);
