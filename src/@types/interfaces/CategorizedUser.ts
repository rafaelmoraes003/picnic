import { Ticket } from "./Ticket";

export interface CategorizedUser {
  category: string;
  tickets: Ticket[];
}