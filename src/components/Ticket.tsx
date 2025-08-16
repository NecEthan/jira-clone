import React, { useState } from 'react';


enum TicketType {
    BUG = 'bug',
    FEATURE = 'feature',
    TASK = 'task',
}

    const ticketIcons: Record<TicketType, React.ReactElement> = {
        [TicketType.BUG]: <i className="fa-solid fa-bug text-red-500"></i>,
        [TicketType.FEATURE]: <i className="fa-solid fa-wrench text-blue-500"></i>,
        [TicketType.TASK]: <i className="fa-solid fa-list-check text-green-500"></i>,
    }


type TicketProps = {
    ticketInfo: {
        id: string | number;
        description: string;
        priority: string;
        reporter: string;
        type: string;
        status: string;
    };
    onClose: () => void;
};

const statusColors: Record<string, string> = {
    todo: 'bg-gray-200 text-gray-700',
    inprogress: 'bg-yellow-100 text-black',
    qa: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
};

export default function Ticket({ ticketInfo, onClose }: TicketProps) {
    const [form, setForm] = useState({ ...ticketInfo });
    const [saving, setSaving] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetch(`/api/tickets/${form.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        } catch (err) {
            console.error('Failed to save ticket:', err);
        } finally {
            setSaving(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="rounded bg-white p-3 transition-colors">
            <div className="heading flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <span>
                        {ticketIcons[form.type as TicketType] }
                    </span>
                <p>{ticketInfo.id}</p>
                </div>
                  
                <div className="buttons flex items-center gap-2">
                    <a href='https://github.com/trungvose/jira-clone-angular/issues/new' target='_blank' className="hover:bg-[#F4F5F7] p-2 cursor-pointer">Give Feedback</a>
                    <i className="fa-solid fa-trash hover:bg-[#F4F5F7] cursor-pointer p-2"></i>
                    <i onClick={() => onClose()} className="fa-solid fa-x text-black-600 text-xs cursor-pointer hover:bg-[#F4F5F7] p-2"></i>
                </div>
                          
            </div>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                    {editingDescription ? (
                        <input
                            className="font-medium text-blue-400 mb-1 truncate bg-transparent border-2 p-2 border-blue-100 focus:outline-none w-full"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            onBlur={() => setEditingDescription(false)}
                            autoFocus
                        />
                    ) : (
                        <span
                            className="font-medium text-blue-700 mb-1 truncate bg-transparent border-2 p-2 border-blue-500 focus:outline-none w-full block cursor-pointer"
                            onClick={() => setEditingDescription(true)}
                            tabIndex={0}
                        >
                            {form.description || <span className="text-gray-400">Click to edit description</span>}
                        </span>
                    )}
                    <div className="text-xs text-gray-500 mt-2">Assignee:
                        <input
                            className="ml-2 bg-transparent border-b border-gray-200 focus:outline-none text-xs"
                            name="reporter"
                            value={form.reporter}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="mt-4 mb-1 text-xs font-bold text-[#5e6c84]">Comments</p>
                    <input className="w-40 py-1 px-2 bg-[white] text-black text-base border-2 mr-3 border-gray-300 placeholder:text-[#b6c2cf]" type="text" placeholder="Comment" />
                </div>
                <div className="flex flex-col items-end flex-shrink-0 text-right gap-1">
                    <p className="mb-1 text-xs font-bold text-[#5e6c84]">STATUS</p>
                    <select
                        className={`flex items-center justify-center bg-[#F4F5F7] px-2 gap-1 py-1 ${statusColors[form.status] || 'bg-gray-100 text-gray-500'}`}
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="qa">QA</option>
                        <option value="done">Done</option>
                    </select>
                    <p className="mt-4 mb-1 text-xs font-bold text-[#5e6c84]">REPORTER</p>
                    <div className="text-black flex items-center justify-center bg-[#F4F5F7] px-2 gap-1 py-1">
                        <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Avatar" className="w-5 h-5 rounded-full object-cover border-2 border-white shadow" />
                        {form.reporter}
                        <span className="ml-1 h-full">
                            <i className="fa-solid fa-x text-gray-400 text-xs"></i>
                        </span>
                    </div>
                    <p className="mt-4 mb-1 text-xs font-bold text-[#5e6c84]">ASSIGNES</p>
                    <span className="text-black flex items-center justify-center bg-[#F4F5F7] px-2 gap-1 py-1">Reporter: {form.reporter}</span>
                    <p className="mt-4 mb-1 text-xs font-bold text-[#5e6c84]">PRIORITY</p>
                    <select
                        className="text-black flex items-center justify-center bg-[#F4F5F7] px-2 gap-1 py-1"
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50"
                        disabled={saving}
                        onClick={handleSubmit}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </form>
    );
}