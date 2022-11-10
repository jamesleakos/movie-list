import React, { useState } from "react";

const SearchBar = ({filterMovies}) => {

  const [filter, setFilter] = useState('');

  return (
    <div className="movie-form">
        <label>Filter:</label>
        <input className="text-enter" type="text" onChange={(e) => { setFilter(e.currentTarget.value) }} value={filter}></input>
        <input className="button" type="submit" value="Submit" onClick={() => { console.log('click'); filterMovies(filter); }}></input>
      </div>
  );
}

export default SearchBar;