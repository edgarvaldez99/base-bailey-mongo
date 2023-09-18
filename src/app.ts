import BotWhatsapp from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import "dotenv/config";
import ChatGPTClass from "./openai/chatgpt";
import mongoAdapter from "./database/mongo";
import {
  flowAgente,
  flowOfertas,
  flowPrincipal,
  flowReparacion,
} from "./flows";

const chatgpt = new ChatGPTClass();

const app = async () => {
  const adapterFlow = BotWhatsapp.createFlow([
    flowPrincipal,
    flowAgente,
    flowOfertas(chatgpt),
    flowReparacion(chatgpt),
  ]);
  const adapterProvider = BotWhatsapp.createProvider(BaileysProvider);
  BotWhatsapp.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: mongoAdapter,
  });
  QRPortalWeb();
};

export default app;
