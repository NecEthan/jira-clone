import { useContext } from 'react';
import { TicketContext } from './TicketContext';

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error('useTicketContext must be used within a TicketProvider');
  return context;
};
