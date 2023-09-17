import BotWhatsapp from "@bot-whatsapp/bot";

const flowSecundario = BotWhatsapp.addKeyword(["2", "siguiente"]).addAnswer([
  "📄 Aquí tenemos el flujo secundario",
]);

export default flowSecundario;
