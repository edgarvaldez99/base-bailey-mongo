import { addKeyword } from "@bot-whatsapp/bot";
import { readFileSync } from "fs";
import { join } from "path";
import ChatGPTClass from "../openai/chatgpt";
import { getItems } from "../services/items.service";
import { getTickets } from "../services/tickets.service";
import { getUser } from "../services/users.service";
import { delay } from "src/utils/delay";

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "02_VENDEDOR.txt"), "utf-8");
  return text;
};

const flowOfertas = (chatgptClass: ChatGPTClass) => {
  return addKeyword("OFERTAS", {
    //TODO!!
    sensitive: true,
  })
    .addAction(async (ctx: any, { endFlow, flowDynamic, provider }: any) => {
      const jid = ctx.key.remoteJid;
      const refProvider = await provider.getInstance();

      await refProvider.presenceSubscribe(jid);
      await delay(500);

      await refProvider.sendPresenceUpdate("composing", jid);

      const user = await getUser(ctx.from);

      const lastTickets = await getTickets(user?._id?.toString());
      if (!lastTickets.length) {
        await flowDynamic("No tienes ticket abierto!");
        return endFlow();
      }

      const listTickets = await getTickets(user?._id?.toString());
      if (!listTickets.length) {
        await flowDynamic("No tenemos articulos disponibles");
        return endFlow();
      }

      const items = await getItems();

      const listItems = items
        .map((i) => `ARTICULO:${i.name}, PRECIO_SUGERIDO:${i.price}`)
        .join("\n");

      const model = listTickets[0].model; // Huawai

      const data = await getPrompt(); //TXT

      await chatgptClass.handleMsgChatGPT(data); //OK

      await refProvider.sendPresenceUpdate("paused", jid);

      const textFromAI = await chatgptClass.handleMsgChatGPT(
        `modelo_telefono="${model}", cliente="${user?.username}", lista_de_articulos="${listItems}"`
      );

      console.log(textFromAI.text);

      await flowDynamic(textFromAI.text);
    })
    .addAnswer(
      `¿Te interesa?`,
      { capture: true },
      async (ctx: any, { fallBack }: any) => {
        const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
        await fallBack(textFromAI.text);
      }
    );
};

export default flowOfertas;
