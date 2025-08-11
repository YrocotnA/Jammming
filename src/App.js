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
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">        
            <span className="navbar-title">Welcome, Music Lovers!</span>
          </div>
          <div className="navbar-menu">
            <a href="#search" className="navbar-link">Search</a>
            <a href="#playlist" className="navbar-link">Playlist</a>
            <a href="#about" className="navbar-link">About</a>
          </div>
        </div>
      </nav>
      
      <div className="App-header">
        <h1 className="music-title">
          <span className="title-letter">J</span>
          <span className="music-symbol">♬</span>
          <span className="title-letter">m</span>
          <span className="title-letter">m</span>
          <span className="music-symbol">♬</span>
          <span className="title-letter">n</span>
          <span className="title-letter">g</span>
        </h1>
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
