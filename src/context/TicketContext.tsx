import { useState } from 'react';
import type { ReactNode } from 'react';
import { TicketContext } from './TicketContextObject';
import type { Ticket } from '../shared/Ticket.interface';

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
}

export { TicketContext };
