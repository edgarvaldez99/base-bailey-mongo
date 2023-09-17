import BotWhatsapp from "@bot-whatsapp/bot";
import flowSecundario from "./secondary";

const flowDiscord = BotWhatsapp.addKeyword(["discord"]).addAnswer(
  [
    "🤪 Únete al discord",
    "https://link.codigoencasa.com/DISCORD",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

export default flowDiscord;
