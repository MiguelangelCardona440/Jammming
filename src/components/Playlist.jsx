import Tracklist from "./Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onNameChange,
  onTrackRemove,
  onSave,
}) {
  return (
    <div className="panel playlist-panel">
      <input
        className="playlist-name"
        value={playlistName}
        placeholder="Enter playlist name"
        onChange={(event) => onNameChange(event.target.value)}
      />
      <Tracklist
        tracks={playlistTracks}
        onTrackRemove={onTrackRemove}
        isRemoval={true}
      />

      <button className="save-button" type="button" onClick={onSave}>
        <span>Save to Spotify</span>
      </button>
    </div>
  );
}

export default Playlist;
