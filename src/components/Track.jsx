function Track({ track, addTrack, onTrackRemove, isRemoval }) {
  return (
    <div>
      <h3>{track.name} </h3>
      <p>
        {track.artist} | {track.album}
      </p>
      {isRemoval ? (
        <button onClick={() => onTrackRemove(track)}>-</button>
      ) : (
        <button onClick={() => addTrack(track)}>+</button>
      )}
    </div>
  );
}

export default Track;
