/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "node:process";

class ChatGPTClass {
  queue: any[] = [];
  optionsGPT = { model: "gpt-3.5-turbo-0301" };
  openai: any | undefined;

  constructor() {
    this.init()
      .then((r) => r)
      .catch(() => {});
  }

  init = async (): Promise<void> => {
    const { ChatGPTAPI } = await import("chatgpt");
    this.openai = new ChatGPTAPI({
      apiKey: env["OPENAI_API_KEY"] as string,
    });
  };

  handleMsgChatGPT = async (body: string): Promise<any> => {
    const interaccionChatGPT = await this.openai!.sendMessage(body, {
      conversationId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].conversationId,
      parentMessageId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].id,
    });

    this.queue.push(interaccionChatGPT);
    return interaccionChatGPT;
  };
}

export default ChatGPTClass;
