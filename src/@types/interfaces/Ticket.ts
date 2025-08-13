import { Comment } from "./Comment";
import { Requester } from "./Requester";

export interface Ticket {
  subject: string;
  requester: Requester;
  created_at: string;
  comment: {
    body: string;
    public: boolean;
  };
  comments: Comment[];
}