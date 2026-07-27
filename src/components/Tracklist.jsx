import Track from "./Track";

function Tracklist({ tracks, addTrack, onTrackRemove, isRemoval }) {
  return (
    <div>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          addTrack={addTrack}
          onTrackRemove={onTrackRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default Tracklist;
