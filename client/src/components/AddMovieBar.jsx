import React, { useState } from "react";

const AddMovieBar = ({addNewMovie}) => {

  const [newMovie, setNewMovie] = useState('');

  return (
    <div className="movie-form">
      <label>Add Movie:</label>
      <input className="text-enter" type="text" onChange={(e) => { setNewMovie(e.currentTarget.value) }} value={newMovie}></input>
      <input className="button" type="submit" value="Submit" onClick={() => { 
        addNewMovie(newMovie); 
        setNewMovie('');
      }}></input>
    </div>
  );
}

export default AddMovieBar;

