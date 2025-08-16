
export async function fetchTickets() {
  const res = await fetch('/api/tickets');
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
}

export async function updateTicket(id: number, data: any) {
  const res = await fetch(`/api/tickets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update ticket');
  return res.json();
}
