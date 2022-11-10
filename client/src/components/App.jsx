import React, { useEffect, useState } from 'react';
import exampleData from './exampleData.js';
import movieInfo from './movieInfo.js';
import List from './List.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';
import { filter } from 'underscore';

const App = () => {
  
  const [movieData, setMovieData] = useState(exampleData);
  const [displayMovies, setDisplayMovies] = useState(movieData);
  const [showHaveWatched, setShowHaveWatched] = useState(false);

  const showMovies = (filter) => {
    const newMovies = movieData.filter((movie) => { 
      if ((movie.title.toLowerCase().includes(filter.toLowerCase()) || filter === '') && movie.watched === showHaveWatched) return movie; 
    });
    setDisplayMovies(newMovies);
  }

  const addNewMovie = (newMovieName) => {
    const newMovie = {title: newMovieName, watched: false};
    setMovieData(prev => [...prev, newMovie]);
  }

  const toggleWatched = (movie, watched) => {
    var i = movieData.indexOf(movie);
    var newMovies = [...movieData];
    newMovies[i].watched = watched;
    setMovieData(newMovies);
  }

  useEffect(
    () => {
      showMovies('');
    },
    [movieData]
  )

  const toggleView = () => {
    setShowHaveWatched(!showHaveWatched);
  }
  useEffect(
    () => {
      showMovies('');
    },
    [showHaveWatched]
  )
  
  return (
    <div>
      <header>
        <h1>Movie List</h1>
      </header>
      <div className="bars">
        <AddMovieBar addNewMovie={addNewMovie}/>
        <SearchBar filterMovies={showMovies}/>
        <button className={'watch-button' + (showHaveWatched ? ' watch-button-selected' : '')} onClick={toggleView}>Watched</button>
        <button className={'watch-button' + (!showHaveWatched ? ' watch-button-selected' : '')} onClick={toggleView}>To Watch</button>
      </div>
      <div className="list-container">
        <List movies={displayMovies} toggleWatched={toggleWatched}/>
      </div>
    </div>
  )
};

export default App;