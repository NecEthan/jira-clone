import { useState } from 'react';
import { useTicketContext } from '../context/useTicketContext';
import { fetchTickets } from '../services/services';

function CreateTicketForm({ onClose }: { onClose: () => void }) {
    const { tickets, setTickets } = useTicketContext();
    
  const [form, setForm] = useState({
    type: 'Bug',
    priority: 'Low',
    description: '',
    reporter: '',
    assignees: '',
  });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // setLoading(true);
    // setError(null);
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:4000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
        })
      });
      if (!res.ok) throw new Error('Failed to create ticket');
      fetchTickets().then((tickets) => setTickets(tickets))
      setSuccess(true);
      setForm({
        type: 'Bug',
        priority: 'Low',
        description: '',
        reporter: '',
        assignees: '',
      });
      onClose();


    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message);
      } else {
        // setError('Unknown error');
      }
    } finally {
    //   setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-xl mb-4">Create Issue</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-[#5e6c84] mb-1">Issue type</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option>Bug</option>
            <option>Task</option>
            <option>Story</option>
            <option>Epic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5e6c84] mb-1">Issue priority</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5e6c84] mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5e6c84] mb-1">Reporter</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="reporter"
            value={form.reporter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5e6c84] mb-1">Assignees (comma separated)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="assignees"
            value={form.assignees}
            onChange={handleChange}
          />
        </div>
        {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}
        {success && <div className="text-green-600 text-sm">Ticket created!</div>}
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </>
  );
}

export default CreateTicketForm;