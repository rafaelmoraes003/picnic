import { Ticket } from "../@types/interfaces/Ticket";
import { Requester } from "../@types/interfaces/Requester";
import { Occurrence } from "../@types/interfaces/Occurrence";

export class TicketHandler {
  public tickets: Ticket[];

  constructor(tickets: Ticket[]) {
    this.tickets = tickets;
  }

  private getCategory(subject: string): string {
    const lowerSubject = subject.toLowerCase();

    if (lowerSubject.includes("return") || lowerSubject.includes("refund") || lowerSubject.includes("exchange")) {
      return "Returns and Exchanges";
    }
    if (lowerSubject.includes("payment") || lowerSubject.includes("charged") || lowerSubject.includes("billing") || lowerSubject.includes("credit card") || lowerSubject.includes("gift card") || lowerSubject.includes("store credit")) {
      return "Payment and Billing Issues";
    }
    if (lowerSubject.includes("account") || lowerSubject.includes("log in") || lowerSubject.includes("password") || lowerSubject.includes("2fa")) {
      return "Account Access Issues";
    }
    if (lowerSubject.includes("shipping") || lowerSubject.includes("status") || lowerSubject.includes("delivery") || lowerSubject.includes("delivered")) {
      return "Order Status/Delivery";
    }
    if (lowerSubject.includes("product") || lowerSubject.includes("item") || lowerSubject.includes("broken") || lowerSubject.includes("damaged") || lowerSubject.includes("defect") || lowerSubject.includes("incorrect item")) {
      return "Product Issues";
    }
    if (lowerSubject.includes("promo code") || lowerSubject.includes("discount") || lowerSubject.includes("price")) {
      return "Promotion and Pricing Issues";
    }
    return "Others";
  }

  public categorizeTickets(): { category: string; tickets: Ticket[]; }[] {
    const categorizedTickets: Record<string, Ticket[]> = {};

    this.tickets.forEach((ticket) => {
      const category: string = this.getCategory(ticket.subject);

      if (!categorizedTickets[category]) {
        categorizedTickets[category] = [];
      }
      categorizedTickets[category].push(ticket);
    });

    return Object.entries(categorizedTickets).map(([category, tickets]) => ({
      category,
      tickets,
    }));
  }

  public getMostRelevantUsers(): Occurrence[] {
    const requesters: Record<string, number> = {};

    this.tickets.forEach((ticket) => {
      const requesterName = ticket.requester.name;
      requesters[requesterName] = (requesters[requesterName] || 0) + 1;
    });

    return this.createOcurrence(requesters);
  }

  private createOcurrence(data: Record<string, number>): Occurrence[] {
    return Object.entries(data).map(([name, occurrences]) => ({
      name,
      occurrences
    })).sort((a, b) => b.occurrences - a.occurrences);
  }
}