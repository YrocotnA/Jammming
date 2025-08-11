import React, { useState } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

function Playlist({ playlistName, playlistTracks, onNameChange, onRemove, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(playlistName);

  const handleNameChange = (e) => {
    setEditName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      onNameChange(editName.trim());
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(playlistName);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(playlistName);
  };

  return (
    <div className="Playlist">
      <div className="Playlist-header">
        {isEditing ? (
          <form onSubmit={handleNameSubmit} className="Playlist-name-form">
            <input
              type="text"
              value={editName}
              onChange={handleNameChange}
              className="Playlist-name-input"
              autoFocus
            />
            <div className="Playlist-name-actions">
              <button type="submit" className="Playlist-name-save">Save</button>
              <button type="button" onClick={handleCancelEdit} className="Playlist-name-cancel">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="Playlist-name-display">
            <h2>{playlistName}</h2>
            <button onClick={handleEditClick} className="Playlist-edit-button">
              ✏️
            </button>
          </div>
        )}
      </div>

      {playlistTracks.length === 0 ? (
        <div className="Playlist-empty">
          <p>Your playlist is empty. Add some tracks from the search results!</p>
        </div>
      ) : (
        <TrackList 
          tracks={playlistTracks} 
          onRemove={onRemove}
          isRemoval={true}
        />
      )}

      <div className="Playlist-actions">
        <button 
          onClick={onSave} 
          className="Playlist-save-button"
          disabled={playlistTracks.length === 0}
        >
          Save to Spotify
        </button>
      </div>
    </div>
  );
}

export default Playlist;
