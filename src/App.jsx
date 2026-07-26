import "./App.css";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
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

  return (
    <div>
      <h1>Jammming</h1>

      <SearchBar />

      <SearchResults searchResults={searchResults} />

      <Playlist />
    </div>
  );
}

export default App;
