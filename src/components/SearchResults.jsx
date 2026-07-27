import TrackList from "./Tracklist";

function SearchResults({ searchResults, addTrack }) {
  return (
    <div>
      <h2>Search Result</h2>
      <TrackList tracks={searchResults} addTrack={addTrack} isRemoval={false} />
    </div>
  );
}

export default SearchResults;
