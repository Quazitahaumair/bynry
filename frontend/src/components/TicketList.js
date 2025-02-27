import React, { useEffect, useState } from 'react';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    // Fetch the ticket list from the Django backend
    useEffect(() => {
        fetch('/tickets/')
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error fetching tickets:', error));
    }, []);

    return (
        <div>
            <h2>Ticket List</h2>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id}>
                        <strong>{ticket.service_type}</strong>: {ticket.description} (Status: {ticket.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketList;
