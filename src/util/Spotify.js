const clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace with your actual Spotify Client ID
const redirectUri = 'http://localhost:3000/';

class Spotify {
  constructor() {
    this.accessToken = null;
  }

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      
      // Clear parameters from URL
      window.setTimeout(() => this.accessToken = null, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      
      return this.accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  }

  async search(term) {
    const accessToken = this.getAccessToken();
    
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const jsonResponse = await response.json();
      
      if (!jsonResponse.tracks) {
        return [];
      }
      
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  }

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    try {
      // Get user ID
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: headers
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to get user ID');
      }
      
      const userJsonResponse = await userResponse.json();
      userId = userJsonResponse.id;

      // Create playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: 'Created with Jammming'
        })
      });

      if (!createPlaylistResponse.ok) {
        throw new Error('Failed to create playlist');
      }

      const createPlaylistJsonResponse = await createPlaylistResponse.json();
      const playlistId = createPlaylistJsonResponse.id;

      // Add tracks to playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: trackUris
        })
      });

      if (!addTracksResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
      }

      return true;
    } catch (error) {
      console.error('Error saving playlist:', error);
      throw error;
    }
  }
}

export default new Spotify();
