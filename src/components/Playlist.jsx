import Tracklist from "./Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onNameChange,
  onTrackRemove,
  isRemoval,
}) {
  return (
    <div>
      <input
        value={playlistName}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Tracklist
        tracks={playlistTracks}
        onTrackRemove={onTrackRemove}
        isRemoval={true}
      />

      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
