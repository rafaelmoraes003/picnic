import { Attachment } from "./Attachment";
import { Author } from "./Author";

export interface Comment {
  body: string;
  public: boolean;
  created_at: string;
  author: Author;
  attachments: Attachment[];
}