import data from "./data.json";
import { Ticket } from "./@types/interfaces/Ticket";
import { TicketHandler } from "./handlers/ticket";
import { FileHandler } from "./handlers/file";
import { CategorizedUser } from "./@types/interfaces/CategorizedUser";
import { Occurrence } from "./@types/interfaces/Occurrence";

const { tickets } = data;


const ticketHandler = new TicketHandler(tickets as Ticket[]);

const categorizedTickets: CategorizedUser[] = ticketHandler.categorizeTickets();
const mostRelevantUsers: Occurrence[] = ticketHandler.getMostRelevantUsers();
const mostRelevantTickets: Occurrence[] = ticketHandler.getMostRelevantTickets();

FileHandler.createFile("overview/categorized_tickets", categorizedTickets);
FileHandler.createFile("overview/most_relevant_users", mostRelevantUsers);
FileHandler.createFile("overview/most_relevant_tickets", mostRelevantTickets);