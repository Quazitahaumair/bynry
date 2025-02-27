import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const CustomerTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, [statusFilter, searchTerm]); // Combined dependencies

    const fetchTickets = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You are not logged in!');
                window.location.href = '/login';
                return;
            }
            
            const response = await axios.get(`/tickets/?status=${statusFilter}`, {
                headers: { Authorization: 'Bearer ' + token }
            });
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setError('Failed to load tickets. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredTickets = tickets.filter(ticket =>
        ticket.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-4'>
            <h2 className='text-2xl mb-4'>My Service Requests</h2>

            <div className='flex gap-4 mb-4'>
                <Input
                    placeholder='Search by service type...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select onValueChange={setStatusFilter} value={statusFilter}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Filter by status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=''>All</SelectItem>
                        <SelectItem value='Pending'>Pending</SelectItem>
                        <SelectItem value='In Progress'>In Progress</SelectItem>
                        <SelectItem value='Completed'>Completed</SelectItem>
                        <SelectItem value='Closed'>Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading && <p>Loading tickets...</p>}
            {error && <p className='text-red-500'>{error}</p>}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {!loading && filteredTickets.length === 0 && (
                    <p className='text-gray-500'>No tickets found.</p>
                )}
                {filteredTickets.map((ticket) => (
                    <Card key={ticket.id} className='p-4'>
                        <CardContent>
                            <h3 className='text-xl font-semibold'>{ticket.service_type}</h3>
                            <p className='text-sm text-gray-600'>{ticket.description}</p>
                            <p className='mt-2'><strong>Status:</strong> {ticket.status}</p>
                            <p className='text-xs text-gray-500'>
                                Created at: {new Date(ticket.created_at).toLocaleString()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CustomerTickets;
