import TrackList from "./Tracklist";

function SearchResults({ searchResults, addTrack }) {
  return (
    <div className="panel">
      <h2>Search Results</h2>
      <TrackList tracks={searchResults} addTrack={addTrack} isRemoval={false} />
    </div>
  );
}

export default SearchResults;
