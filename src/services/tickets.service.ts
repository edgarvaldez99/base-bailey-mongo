import { database, client } from "../database/mongo";
import { Ticket } from "../interfaces/ticket";

export const getTickets = async (userId?: string): Promise<Ticket[]> => {
  if (!userId) return [];
  try {
    const collection = database.collection<Ticket>("tickets");
    const query = { userId };
    const cursor = collection.find(query);
    const list = [];
    for await (const it of cursor) {
      list.push(it);
    }
    return list;
  } catch (e) {
    console.log(e);
    return [];
  } finally {
    await client.close();
  }
};
