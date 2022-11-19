const MoviesModel = require('../models/Movies');

const getMovies = ((req, res) => {
  MoviesModel.getMovies((err, movies) => {
    if (err) {
      res.status(400).send();
    } else {
      for (let movie of movies) {
        movie.watched = movie.watched===1;
      }
      res.status(200).send(movies);
    }
  })
});

const addMovie = (req, res) => {
  const title = req.body.title;
  MoviesModel.addMovie(title, (err, info) => {
    if (err) {
      console.log('fail 1 : ' + err);
      res.status(400).send();
    } else {
      MoviesModel.getMovie(info.insertId, (err, movies) => {
        if (err) {
          console.log('fail 2 : ' + err);
          res.status(400).send();
        } else {
          const movie = movies[0];
          movie.watched = movie.watched===1;
          res.status(200).send(movie);
        }
      });
    }
  });
};

const deleteMovie = (req, res) => {
  console.log('id should be ' + JSON.stringify(req.params));
  MoviesModel.deleteMovie(req.params.id, (err) => {
    if (err) {
      console.log('fail delete 1: ' + err);
      res.status(400).send();
    } else {
      console.log('getting here');
      MoviesModel.getMovies((err, movies) => {
        if (err) {
          console.log('fail 2 : ' + err);
          res.status(400).send();
        } else {
          for (let movie of movies) {
            movie.watched = movie.watched===1;
          }
          res.status(200).send(movies);
        }
      });
    }
  })
}

module.exports.getMovies = getMovies;
module.exports.addMovie = addMovie;
module.exports.deleteMovie = deleteMovie;