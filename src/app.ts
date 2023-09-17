import "dotenv/config";
import BotWhatsapp from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import mongoAdapter from "./database/mongo";
import flowPrincipal from "./flows/primary";

const app = async () => {
  const adapterFlow = BotWhatsapp.createFlow([flowPrincipal]);
  const adapterProvider = BotWhatsapp.createProvider(BaileysProvider);
  BotWhatsapp.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: mongoAdapter,
  });
  QRPortalWeb();
};

export default app;
