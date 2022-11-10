import React, { useState } from 'react';

const ListItem = ({movie, toggleWatched}) => {

  const [hidden, setHidden] = useState(true);

  return (
    <div className={'list-item' + (!hidden ? ' active' : '')}>
      <div className="top-bar" onClick={() => setHidden(!hidden)}>
        {movie.title}
      </div>
      { !hidden ? 
        <div className="info-panel">
          <p>Year: 1985</p>
          <p>Runtime: 107 minutes</p>
          <p>Metascore: 46</p>
          <p>IMBD Rating: 6.2</p>
          <button onClick={() => {toggleWatched(movie, !movie.watched); setHidden(true); }}>{movie.watched ? 'Watched' : 'To Watch'}</button>
        </div>
        : null
      }
     
    </div>
    
  );
}

export default ListItem;