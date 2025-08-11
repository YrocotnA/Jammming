import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      {searchResults.length === 0 ? (
        <div className="SearchResults-empty">
          <p>Search for songs to get started!</p>
        </div>
      ) : (
        <TrackList 
          tracks={searchResults} 
          onAdd={onAdd}
          isRemoval={false}
        />
      )}
    </div>
  );
}

export default SearchResults;
