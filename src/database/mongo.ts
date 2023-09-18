import { MongoClient } from "mongodb";
import MongoAdapter from "@bot-whatsapp/database/mongo";
import { env } from "node:process";

const MONGO_DB_URI = env["DB_URI"] as string;
const MONGO_DB_NAME = env["DB_NAME"] as string;

const mongoAdapter = new MongoAdapter({
  dbUri: MONGO_DB_URI,
  dbName: MONGO_DB_NAME,
});

export const client = new MongoClient(MONGO_DB_URI);

export const database = client.db(MONGO_DB_NAME);

export default mongoAdapter;
