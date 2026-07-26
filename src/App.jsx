import "./App.css";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Track from "./components/Track";
import Tracklist from "./components/Tracklist";

function App() {
  return (
    <div>
      <h1>Jammming</h1>

      <SearchBar />

      <SearchResults />

      <Tracklist />

      <Playlist />
    </div>
  );
}

export default App;
