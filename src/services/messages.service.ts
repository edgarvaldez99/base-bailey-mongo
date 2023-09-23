import { PhoneMessages } from "src/interfaces/message";
import { database, client } from "../database/mongo";

export const getUser = async (phone: string) => {
  try {
    const collection = database.collection<PhoneMessages>("messages");
    const query = { phone };
    const result = await collection.findOne(query);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.close();
  }
};
