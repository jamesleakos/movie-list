import React, { useState } from 'react';

const ListItem = ({movie, toggleWatched}) => {

  const [hidden, setHidden] = useState(true);

  return (
    <div className={'list-item' + (!hidden ? ' active' : '')}>
      <div className="top-bar" onClick={() => setHidden(!hidden)}>
        {movie.title}
        <button onClick={() => toggleWatched(movie, !movie.watched)}>{movie.watched ? 'Watched' : 'To Watch'}</button>
      </div>
      { !hidden ? 
        <div className="info-panel">
          Hello hello hello
        </div>
        : null
      }
     
    </div>
    
  );
}

export default ListItem;