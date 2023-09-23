import { ObjectId } from "mongodb";

export interface Ticket {
  userId: string;
  name: string;
  model: string;
  description: string;
  status: string;
}
