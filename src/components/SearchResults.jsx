import TrackList from "./Tracklist";

function SearchResults({ searchResults }) {
  return (
    <div>
      <h2>Search Result</h2>
      <TrackList tracks={searchResults} />
    </div>
  );
}

export default SearchResults;
