import Track from "./Track";

function Tracklist({ tracks, addTrack, onTrackRemove, isRemoval }) {
  return (
    <div className="track-list">
      {tracks.length === 0 ? (
        <p className="empty-message">No tracks available.</p>
      ) : (
        tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            addTrack={addTrack}
            onTrackRemove={onTrackRemove}
            isRemoval={isRemoval}
          />
        ))
      )}
    </div>
  );
}

export default Tracklist;
