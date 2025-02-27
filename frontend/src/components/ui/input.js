import React from 'react';

export const Input = ({ placeholder, value, onChange, className = '' }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border p-2 w-full mb-2 ${className}`}
  />
);
