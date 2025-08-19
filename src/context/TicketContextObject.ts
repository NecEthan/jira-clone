import { createContext } from 'react';
import type { ITicket } from '../shared/Ticket.interface';

export type TicketContextType = {
  tickets: ITicket[];
  setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
};

export const TicketContext = createContext<TicketContextType | undefined>(undefined);
