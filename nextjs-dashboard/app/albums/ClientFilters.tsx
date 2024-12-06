// app/components/ClientFilters.tsx
'use client';

import React from 'react';

interface ClientFiltersProps {
  onFilterByAuthor: (author: string) => void;
  onFilterByLocation: (location: string) => void;
}

export default function ClientFilters({ onFilterByAuthor, onFilterByLocation }: ClientFiltersProps) {
  return (
    <div className="album_filter">
      <div className="filter-button-container">
        <button
          onClick={() => onFilterByAuthor('John Doe')} // Filtrar por autor
          className="filter-button"
        >
          Author filter
        </button>
      </div>
      <div className="filter-button-container">
        <button
          onClick={() => onFilterByLocation('Paris')} // Filtrar por localización
          className="filter-button"
        >
          Location filter
        </button>
      </div>
    </div>
  );
}
