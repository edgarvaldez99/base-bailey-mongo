import { addKeyword } from "@bot-whatsapp/bot";
import { readFileSync } from "fs";
import { join } from "path";
import ChatGPTClass from "../openai/chatgpt";
import { getTickets } from "../services/tickets.service";
import { getUser } from "../services/users.service";
import { delay } from "src/utils/delay";

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_TECNICO.txt"), "utf-8");
  return text;
};

const flowReparacion = (chatgptClass: ChatGPTClass) => {
  return addKeyword("1", {
    sensitive: true,
  })
    .addAction(async (ctx: any, { endFlow, flowDynamic, provider }: any) => {
      await flowDynamic("Consultando en la base de datos...");

      const jid = ctx.key.remoteJid;
      const refProvider = await provider.getInstance();

      await refProvider.presenceSubscribe(jid);
      await delay(500);

      await refProvider.sendPresenceUpdate("composing", jid);

      const user = await getUser(ctx.from); //Consultamos a strapi! ctx.from = numero

      const lastTicket = await getTickets(user?._id?.toString());

      if (!lastTicket.length) {
        await flowDynamic("No tienes ticket abierto!");
        return endFlow();
      }

      const listTickets = lastTicket
        .map(
          (i) =>
            `ID_REF: ${i._id ?? ""}, cliente: ${user?.username}, model: ${
              i.model
            }, description: ${i.description}, status: ${i.status}`
        )
        .join("\n");

      const data = await getPrompt();

      await chatgptClass.handleMsgChatGPT(data); //Dicinedole actua!!

      const textFromAI = await chatgptClass.handleMsgChatGPT(
        `cliente=${user?.username}, lista_de_reparaciones="${listTickets}"`
      );

      await flowDynamic(textFromAI.text);
    })
    .addAnswer(
      `Tienes otra pregunta? o duda?`,
      { capture: true },
      async (ctx: any, { fallBack }: any) => {
        // ctx.body = es lo que la peronsa escribe!!

        if (!ctx.body.toLowerCase().includes("ofertas")) {
          const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
          await fallBack(textFromAI.text);
        }
      }
    );
};

export default flowReparacion;
