import type { ITicket } from "../shared/Ticket.interface";

export async function fetchTickets() {
  const res = await fetch('http://localhost:4000/api/get/tickets');
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
}

export async function saveTicket(id: number, data: ITicket) {
  const res = await fetch(`http://localhost:4000/api/save/ticket/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update ticket');
  return res.json();
}


export async function updateTicket(id: number, data: ITicket) {
   const res = await fetch(`http://localhost:4000/api/update/ticket/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update ticket');
  return res.json();
}