import { ObjectId } from "mongodb";

export interface Ticket {
  _id?: ObjectId;
  userId: string;
  name: string;
  model: string;
  description: string;
  status: string;
}
