import { createContext } from 'react';
import type { Ticket } from '../shared/Ticket.interface';

export type TicketContextType = {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
};

export const TicketContext = createContext<TicketContextType | undefined>(undefined);
