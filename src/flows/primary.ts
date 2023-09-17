import BotWhatsapp from "@bot-whatsapp/bot";
import flowDocs from "./docs";
import flowGracias from "./thanks";
import flowTuto from "./tutotial";
import flowDiscord from "./discord";

const flowPrincipal = BotWhatsapp.addKeyword(["hola", "ole", "alo", "op"])
  .addAnswer("🙌 Hola bienvenido a este *Chatbot*")
  .addAnswer(
    [
      "te comparto los siguientes links de interes sobre el proyecto",
      "👉 *doc* para ver la documentación",
      "👉 *gracias*  para ver la lista de videos",
      "👉 *discord* unirte al discord",
    ],
    null,
    null,
    [flowDocs, flowGracias, flowTuto, flowDiscord]
  );

export default flowPrincipal;
