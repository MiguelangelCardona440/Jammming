function Track({ track, addTrack, onTrackRemove, isRemoval }) {
  const { name, artist, album } = track;

  return (
    <div>
      <h3>{name}</h3>

      <p>
        {artist} | {album}
      </p>

      {isRemoval ? (
        <button type="button" onClick={() => onTrackRemove(track)}>
          -
        </button>
      ) : (
        <button type="button" onClick={() => addTrack(track)}>
          +
        </button>
      )}
    </div>
  );
}

export default Track;
