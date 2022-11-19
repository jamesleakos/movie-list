import React, { useEffect, useState } from 'react';
import axios from 'axios';
import exampleData from './exampleData.js';
import movieInfo from './movieInfo.js';
import List from './List.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';
import { filter } from 'underscore';

const App = () => {
  
  const [movieData, setMovieData] = useState([]);
  const [displayMovies, setDisplayMovies] = useState(movieData);
  const [showHaveWatched, setShowHaveWatched] = useState(false);
  
  // on first load, fetch movies from the server
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/movies')
    .then((response) => {
      setMovieData(response.data);
    });
  }, [])

  // add a new movie to movie data - movie data changing will then trigger a rerender
  const addNewMovie = (newMovieName) => {
    axios.post('http://127.0.0.1:3000/api/movies', {
      title: newMovieName, 
      watched: false
    })
    .then((response) => {
      console.log('the response was ' + JSON.stringify(response.data));
      setMovieData(prev => [...prev, response.data]);
    })
    .catch((err) => console.log(err));
  }

  const deleteMovie = (movie) => {
    console.log('delete movie with id: ' + movie.id);
    axios.delete('http://127.0.0.1:3000/api/movies/' + movie.id)
    .then((response) => {
      console.log('the response was ' + JSON.stringify(response.data));
      setMovieData(response.data);
    })
    .catch((err) => console.log(err));
  }

  // anytime the movie data changes, we want to rerender the displayed movies
  useEffect(
    () => {
      console.log('movie data changed');
      showMovies('');
    },
    [movieData]
  )

  // function for filtering and displaying the subset of movies that we'd like to display
  const showMovies = (filter) => {
    const newMovies = movieData.filter((movie) => { 
      if ((movie.title.toLowerCase().includes(filter.toLowerCase()) || filter === '') && movie.watched === showHaveWatched) return movie; 
    });
    setDisplayMovies(newMovies);
  }

  // change the 'watched' field of a movie - movie data changing will then trigger a rerender
  const toggleWatched = (movie, watched) => {
    var i = movieData.indexOf(movie);
    var newMovies = [...movieData];
    newMovies[i].watched = watched;
    setMovieData(newMovies);
  }

  // switch between displaying watched vs to watch movie (movie.watched) - this will trigger a rerender
  const toggleView = (set) => {
    setShowHaveWatched(set);
  }
  // rerender the displayed movie after 'watched' field changed
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
        <button className={'watch-button' + (showHaveWatched ? ' watch-button-selected' : '')} onClick={() => toggleView(true)}>Watched</button>
        <button className={'watch-button' + (!showHaveWatched ? ' watch-button-selected' : '')} onClick={() => toggleView(false)}>To Watch</button>
      </div>
      <div className="list-container">
        <List movies={displayMovies} toggleWatched={toggleWatched} deleteMovie={deleteMovie}/>
      </div>
    </div>
  )
};

export default App;