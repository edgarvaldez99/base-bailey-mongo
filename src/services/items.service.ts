import { WithId } from "mongodb";
import { database, client } from "../database/mongo";
import { Item } from "../interfaces/item";

export const getItems = async (): Promise<WithId<Item>[]> => {
  try {
    const collection = database.collection<Item>("items");
    const cursor = collection.find();
    const list: WithId<Item>[] = [];
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
