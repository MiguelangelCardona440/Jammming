import Tracklist from "./Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onNameChange,
  onTrackRemove,
  onSave,
}) {
  return (
    <div>
      <input
        value={playlistName}
        placeholder="Enter playlist name"
        onChange={(event) => onNameChange(event.target.value)}
      />
      <Tracklist
        tracks={playlistTracks}
        onTrackRemove={onTrackRemove}
        isRemoval={true}
      />

      <button type="button" onClick={onSave}>
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;
