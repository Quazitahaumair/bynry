// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TicketForm from './components/ticketForm';
import Login from './components/LoginPage';
import Register from './components/Register';


const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/login">Login</Link> | <Link to="/create-ticket">Create Ticket</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/create-ticket" element={<TicketForm />} />
                <Route path="/register" element={<Register />} />

            </Routes>
        </Router>
    );
};

export default App;
