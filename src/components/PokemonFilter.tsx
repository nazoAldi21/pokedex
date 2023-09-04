// components/PokemonFilter.tsx
import React, { useState } from 'react';

interface PokemonFilterProps {
  filterTypes: string[];
  onFilterChange: (filterType: string) => void;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({ filterTypes, onFilterChange }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <div className="pokemon-filter flex justify-end">
      <select value={selectedType} onChange={handleTypeChange} className="text-black rounded px-2 py-1" >
        <option value="">All Types</option>
        {filterTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonFilter;
