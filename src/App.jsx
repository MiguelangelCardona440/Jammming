import { useState } from "react";
import "./App.css";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const [playlistTrack, setPlaylistTrack] = useState([
    {
      id: 1,
      name: "song 1",
      artist: "artist 1",
      album: "album 1",
    },
    {
      id: 2,
      name: "song 2",
      artist: "artist 2",
      album: "album 2",
    },
  ]);

  const searchResults = [
    {
      id: 1,
      name: "song 1",
      artist: "artist 1",
      album: "album 1",
    },
    {
      id: 2,
      name: "song 2",
      artist: "artist 2",
      album: "album 2",
    },
    {
      id: 3,
      name: "song 3",
      artist: "artist 3",
      album: "album 3",
    },
  ];

  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const addTrack = (track) => {
    const trackAlreadyExists = playlistTrack.some(
      (playlistTrack) => playlistTrack.id === track.id,
    );

    if (!trackAlreadyExists) {
      setPlaylistTrack([...playlistTrack, track]);
    } else {
      alert("Track already exist in the playlist");
    }
  };

  const removeTrack = (track) => {
    const newPlaylist = playlistTrack.filter(
      (playlistTrack) => playlistTrack.id !== track.id,
    );
    setPlaylistTrack(newPlaylist);
  };

  return (
    <div>
      <h1>Jammming</h1>

      <SearchBar />

      <SearchResults searchResults={searchResults} addTrack={addTrack} />

      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTrack}
        onNameChange={handleNameChange}
        onTrackRemove={removeTrack}
      />
    </div>
  );
}

export default App;
