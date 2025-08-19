import { useState } from 'react';
import type { ReactNode } from 'react';
import { TicketContext } from './TicketContextObject';
import type { ITicket } from '../shared/Ticket.interface';

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
}

export { TicketContext };
