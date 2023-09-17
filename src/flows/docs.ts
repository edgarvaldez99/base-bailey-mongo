import BotWhatsapp from "@bot-whatsapp/bot";
import flowSecundario from "./secondary";

const flowDocs = BotWhatsapp.addKeyword([
  "doc",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
    "https://bot-whatsapp.netlify.app/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

export default flowDocs;
