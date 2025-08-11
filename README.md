# Jammming - Spotify Playlist Creator

## Purpose

Jammming is a React web application that allows users to search the Spotify music library, create custom playlists, and save them directly to their Spotify account. This project demonstrates modern React development practices, API integration, and state management.

## Features

- **Music Search**: Search for songs by title, artist, or album using the Spotify Web API
- **Playlist Creation**: Build custom playlists by adding tracks from search results
- **Playlist Management**: Edit playlist names, add/remove tracks, and organize your music
- **Spotify Integration**: Seamlessly save playlists to your personal Spotify account
- **Responsive Design**: Modern, mobile-friendly interface that works on all devices
- **Real-time Updates**: Instant feedback when adding/removing tracks

## Technologies Used

- **Frontend**: React 18, CSS3, HTML5
- **State Management**: React Hooks (useState)
- **API Integration**: Spotify Web API
- **Authentication**: OAuth 2.0 with Implicit Grant Flow
- **Styling**: Custom CSS with modern design principles
- **Build Tools**: Create React App

## Prerequisites

Before running this application, you'll need:

- Node.js (version 14 or higher)
- npm or yarn package manager
- A Spotify account
- A Spotify Developer account and registered application

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd jammming
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - App name: "Jammming"
   - App description: "A React app for creating Spotify playlists"
   - Website: `http://localhost:3000`
   - Redirect URI: `http://localhost:3000`
5. Accept the terms and create the app
6. Copy your **Client ID** from the app dashboard

### 4. Configure the Application

1. Open `src/util/Spotify.js`
2. Replace `YOUR_SPOTIFY_CLIENT_ID` with your actual Spotify Client ID
3. Save the file

### 5. Start the Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## How to Use

1. **Authentication**: When you first visit the app, you'll be redirected to Spotify to authorize access
2. **Search for Music**: Use the search bar to find songs, artists, or albums
3. **Add Tracks**: Click the "+" button on any track to add it to your playlist
4. **Customize Playlist**: Edit the playlist name by clicking the edit button
5. **Save to Spotify**: Click "Save to Spotify" to save your playlist to your account

## Project Structure

```
src/
├── components/
│   ├── SearchBar/          # Search input and form
│   ├── SearchResults/      # Display search results
│   ├── Playlist/          # Playlist management
│   └── Track/             # Individual track display
├── util/
│   └── Spotify.js         # Spotify API integration
├── App.js                 # Main application component
├── App.css               # Main application styles
└── index.js              # Application entry point
```

## API Endpoints Used

- **Search**: `GET /v1/search` - Search for tracks
- **User Profile**: `GET /v1/me` - Get current user information
- **Create Playlist**: `POST /v1/users/{user_id}/playlists` - Create new playlist
- **Add Tracks**: `POST /v1/users/{user_id}/playlists/{playlist_id}/tracks` - Add tracks to playlist

## Future Work

- **Enhanced Search**: Add filters for genre, year, popularity, and duration
- **Playlist Templates**: Pre-built playlist themes and suggestions
- **Collaborative Playlists**: Allow friends to contribute to shared playlists
- **Playlist Analytics**: Track listening statistics and trends
- **Offline Support**: Cache playlists for offline viewing
- **Social Features**: Share playlists on social media platforms
- **Advanced Playlist Management**: Duplicate, merge, and split playlists
- **Dark Mode**: Toggle between light and dark themes
- **Mobile App**: Native iOS and Android applications
- **Voice Commands**: Voice-controlled playlist creation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Spotify for providing the comprehensive Web API
- Codecademy for the project inspiration and requirements
- React team for the amazing framework
- Open source community for various tools and libraries

## Support

If you encounter any issues or have questions:

1. Check the [Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/)
2. Review the browser console for error messages
3. Ensure your Spotify app is properly configured
4. Verify your redirect URI matches exactly

---

**Note**: This application requires a Spotify Premium account for full functionality, as the Web API has certain limitations for free accounts.
