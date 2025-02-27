// components/TicketForm.js
import React, { useState } from 'react';
import './ticketForm.css'

const TicketForm = () => {
  const [formData, setFormData] = useState({
    service_type: '',
    description: '',
    status: 'Open',
    user: "Quazitahaumair92@gmail.com"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/tickets/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Ticket created successfully!');
        } else {
            const errorData = await response.json().catch(() => {
                console.error('Non-JSON response received');
                return { detail: 'Server error, check the Django server logs' };
            });
            alert(`Failed to create ticket: ${errorData.detail}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Ticket</h2>
      
      <label>
        Service Type:
        <input
          type="text"
          name="service_type"
          value={formData.service_type}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default TicketForm;
