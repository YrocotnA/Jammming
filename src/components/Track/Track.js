import React from 'react';
import './Track.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const handleAction = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  const actionText = isRemoval ? '-' : '+';

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button 
        className="Track-action"
        onClick={handleAction}
        aria-label={isRemoval ? 'Remove track' : 'Add track'}
      >
        {actionText}
      </button>
    </div>
  );
}

export default Track;
