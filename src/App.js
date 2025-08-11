import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(prev => prev.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    if (playlistTracks.length === 0) {
      alert('Please add some tracks to your playlist first!');
      return;
    }
    
    try {
      const trackUris = playlistTracks.map(track => track.uri);
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      alert('Playlist saved to Spotify!');
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist. Please try again.');
    }
  };

  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Jammming</h1>
        <p>Create and save custom playlists to your Spotify account</p>
      </div>
      
      <div className="App-main">
        <SearchBar onSearch={search} />
        
        <div className="App-content">
          <div className="App-left">
            <SearchResults 
              searchResults={searchResults} 
              onAdd={addTrack} 
            />
          </div>
          
          <div className="App-right">
            <Playlist 
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onNameChange={updatePlaylistName}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
