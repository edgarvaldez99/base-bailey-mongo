import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { employeesAddon } from "src/openai/employees";
import { getTextFromAI } from "src/utils/text-from-ai";


const flowVoiceNote = addKeyword(EVENTS.VOICE_NOTE).addAction(
  async (ctx, ctxFn) => {
    await ctxFn.flowDynamic("dame un momento para escucharte...🙉");
    console.log("🤖 voz a texto....");
    const text = await getTextFromAI(ctx);
    console.log(`🤖 Fin voz a texto....[TEXT]: ${text}`);
    const currentState = ctxFn.state.getMyState();
    const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
    const { employee, answer } = await employeesAddon.determine(fullSentence);
    ctxFn.state.update({ answer });
    employeesAddon.gotoFlow(employee, ctxFn);
  }
);

export default flowVoiceNote;
