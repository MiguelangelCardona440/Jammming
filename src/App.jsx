import { useState } from "react";
import "./App.css";

import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Spotify from "./services/Spotify";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const addTrack = (track) => {
    const trackAlreadyExists = playlistTracks.some(
      (playlistTrack) => playlistTrack.id === track.id,
    );

    if (trackAlreadyExists) {
      alert("Track already exists in the playlist");
      return;
    }

    setPlaylistTracks((previousTracks) => [...previousTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks((previousTracks) =>
      previousTracks.filter((playlistTrack) => playlistTrack.id !== track.id),
    );
  };

  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      alert(error.message);
    }
  };

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map((track) => track.uri);

    if (!playlistName.trim()) {
      alert("Enter a playlist name");
      return;
    }

    if (!trackURIs.length) {
      alert("Add at least one song to the playlist");
      return;
    }

    try {
      await Spotify.savePlaylist(playlistName, trackURIs);

      alert("Playlist saved to Spotify");

      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    } catch (error) {
      console.error("Save playlist error:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Jammming</h1>

      <SearchBar onSearch={search} />

      <SearchResults searchResults={searchResults} addTrack={addTrack} />

      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={handleNameChange}
        onTrackRemove={removeTrack}
        onSave={savePlaylist}
      />
    </div>
  );
}

export default App;
