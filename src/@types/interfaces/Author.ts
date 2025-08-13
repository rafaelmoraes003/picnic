export interface Author {
  role: 'requester' | 'agent';
  name: string;
  email?: string;
}