import BotWhatsapp from "@bot-whatsapp/bot";
import flowSecundario from "./secondary";

const flowTuto = BotWhatsapp.addKeyword(["tutorial", "tuto"]).addAnswer(
  [
    "🙌 Aquí encontras un ejemplo rapido",
    "https://bot-whatsapp.netlify.app/docs/example/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

export default flowTuto;
