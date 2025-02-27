import React from 'react';

export const Button = ({ children, onClick }) => (
  <button className="bg-blue-500 text-white p-2 rounded" onClick={onClick}>
    {children}
  </button>
);
