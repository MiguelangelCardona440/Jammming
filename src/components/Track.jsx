function Track({ track, addTrack, onTrackRemove, isRemoval }) {
  const { name, artist, album } = track;
  return (
    <div className="track">
      <div>
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>

      {isRemoval ? (
        <button
          type="button"
          onClick={() => onTrackRemove(track)}
          aria-label={`Remove ${name}`}
        >
          −
        </button>
      ) : (
        <button
          type="button"
          onClick={() => addTrack(track)}
          aria-label={`Add ${name}`}
        >
          +
        </button>
      )}
    </div>
  );
}

export default Track;
