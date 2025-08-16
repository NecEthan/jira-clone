

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import './Kanban.css';
import Modal from './Modal';
import { fetchTickets } from '../services/services';
import type { Ticket } from '../shared/Ticket.interface';
import { useTicketContext } from '../context/useTicketContext';

function Kanban() {

    const { tickets, setTickets } = useTicketContext();

    useEffect(() => {
        getTickets();
    }, [])

    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket>();

    const getTickets = () => {
        fetchTickets().then(setTickets);
    }

    function onShowModal() {
        setShowModal(!showModal);
    }

   
    const columns = [
        { key: 'todo', label: 'To Do' },
        { key: 'inprogress', label: 'In Progress' },
        { key: 'qa', label: 'QA' },
        { key: 'done', label: 'Done' },
    ];



    //   const [tickets, setTickets] = useState<Ticket[]>([
    //     { id: 1, description: 'Set up project', priority: 'High', type: 'bug', reporter: 'Alice', status: 'todo' },
    //     { id: 2, description: 'Build Kanban UI', priority: 'Medium',type: 'bug', reporter: 'Bob', status: 'inprogress' },
    //     { id: 4, description: 'QA review', priority: 'Medium',type: 'bug', reporter: 'Bob', status: 'qa' },
    //     { id: 3, description: 'Write tests', priority: 'Low',type: 'bug', reporter: 'Carol', status: 'done' },
    //   ]);



    const grouped = columns.reduce((acc, col) => {
        acc[col.key] = tickets.filter(t => (t.status || 'todo') === col.key);
        return acc;
    }, {} as Record<string, Ticket[]>);

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const ticketId = parseInt(draggableId.replace('ticket-', ''));
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) return;
        // Remove from old column and insert into new column at correct index
        const filtered = tickets.filter(t => t.id !== ticketId);
        const updated = [
            ...filtered.slice(0, destination.index),
            { ...ticket, status: destination.droppableId },
            ...filtered.slice(destination.index)
        ];
        setTickets(updated);
    };

    const onTicketClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        onShowModal();
    };

    return (
        <div className="ml-64 mt-5">
            <h2 className="text-sm font-medium text-[#5e6c84] mb-3">Projects  /  Angular Jira Clone /  Kanban Board</h2>
            <h1 className="text-2xl font-bold block mb-6">Kanban board</h1>

            <div className="flex items-center justify-start mb-5">
                <input className="w-60 py-1 px-4 rounded bg-[white] text-black text-base border-2 mr-5 border-gray-300 placeholder:text-[#b6c2cf]" type="text" placeholder="Search Jira" />
                <div className="avatar">
                    <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                </div>
                <div className="avatar">
                    <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                </div>
                <div className="avatar">
                    <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                </div>
                <div className="avatar">
                    <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                </div>

            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6">
                    {columns.map(col => (
                        <Droppable droppableId={col.key} key={col.key}>
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`bg-gray-100 rounded-lg p-4 w-60 min-h-[500px] flex-1 transition-colors ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                                >
                                    <h2 className="text-lg font-semibold mb-4">{col.label}</h2>
                                    <div className="space-y-4">
                                        {grouped[col.key].length === 0 && (
                                            <div className="text-gray-400 text-sm italic">No tickets</div>
                                        )}
                                        {grouped[col.key].map((ticket, idx) => (
                                            <Draggable draggableId={`ticket-${ticket.id}`} index={idx} key={ticket.id}>
                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    <div onClick={() => onTicketClick(ticket)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`bg-white rounded shadow p-3 border border-gray-200 ${snapshot.isDragging ? 'ring-2 ring-blue-400' : ''}`}
                                                    >
                                                        <div className="font-medium text-blue-700">{ticket.description?.slice(0, 30) || 'Untitled'}</div>
                                                        <div className="text-xs text-gray-500 mt-1">Priority: {ticket.priority}</div>
                                                        <div className="text-xs text-gray-500">Reporter: {ticket.reporter}</div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            {showModal && selectedTicket && (
                <Modal  open={showModal} onClose={onShowModal}>
                    <Ticket onClose={onShowModal} ticketInfo={selectedTicket} />
                </Modal>
            )}
        </div>


    );
}

export default Kanban;