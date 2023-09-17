import MongoAdapter from "@bot-whatsapp/database/mongo";
import { env } from 'node:process';

const MONGO_DB_URI = env["DB_URI"];
const MONGO_DB_NAME = env["DB_NAME"];

const mongoAdapter = new MongoAdapter({
  dbUri: MONGO_DB_URI,
  dbName: MONGO_DB_NAME,
});

export default mongoAdapter;
