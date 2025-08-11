import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a song title, artist, or album..."
          value={searchTerm}
          onChange={handleChange}
          className="SearchBar-input"
        />
        <button type="submit" className="SearchBar-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
