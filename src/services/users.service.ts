import { database, client } from "../database/mongo";
import { User } from "../interfaces/user";

export const getUser = async (phone: string) => {
  try {
    const collection = database.collection<User>("users");
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
