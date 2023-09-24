/* eslint-disable @typescript-eslint/no-explicit-any */
import { addKeyword } from "@bot-whatsapp/bot";

const flowAgente = addKeyword("AGENTE", { sensitive: true })
  .addAnswer("Estamos desviando tu conversacion a nuestro agente")
  .addAction(async (ctx: any, { provider }: any) => {
    const nanoid = await import("nanoid");
    const ID_GROUP = nanoid.nanoid(5);
    const refProvider = await provider.getInstance();
    await refProvider.groupCreate(`Media Tech Support (${ID_GROUP})`, [
      `${ctx.from}@s.whatsapp.net`,
    ]);
  })
  .addAnswer("Te hemos agregado a un grupo con un asesor! Gracias");

export default flowAgente;
