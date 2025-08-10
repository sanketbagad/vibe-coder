import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.setTimeout(60_000 * 10 * 3); // Set timeout to 30 minutes
  if (!sandbox) {
    throw new Error(`Sandbox with ID ${sandboxId} not found`);
  }

  return sandbox;
}

export function lastAssistantTextMessageContent(message: AgentResult) {
  const lastAssistantTextMessage = message.output.findLastIndex(
    (m) => m.role === "assistant"
  );

  const lastMessage =
    (message.output[lastAssistantTextMessage] as TextMessage) || undefined;
  return lastMessage?.content
    ? typeof lastMessage.content === "string"
      ? lastMessage.content
      : lastMessage.content.map((m) => m.text).join("")
    : undefined;
}
