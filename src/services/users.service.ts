import { database, client } from "../database/mongo";
import { User } from "../interfaces/user";

export const getUser = async (phone: string) => {
  try {
    const collection = database.collection<User>("users");
    const query = { phone };
    const user = await collection.findOne(query);
    console.log(user);
    return user;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.close();
  }
};
