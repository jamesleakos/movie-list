import React from "react";
import ListItem from "./ListItem.jsx";

const List = ({movies, toggleWatched, deleteMovie}) => {
  return (
    <div>
      { movies.length > 0 ? 
          movies.map((movie, index) => {
            return <ListItem key={movie.title + index} index={index} movie={movie} toggleWatched={toggleWatched} deleteMovie={deleteMovie}/>
          }) : 
          <div className="list-item">No movies found</div>
      }
    </div>
  );
}

export default List;