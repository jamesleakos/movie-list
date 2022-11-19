const db = require('../db');

const getMovies = (callback) => {
  db.con.query(
    'SELECT * FROM movies', 
    (err, movies) => {
      if (err) callback(err);
      else (callback(null, movies));
    }
  );
}

const addMovie = (title, callback) => {
  db.con.query(
    'INSERT INTO movies (title) VALUES (?)',
    [title],
    (err, info) => {
      if (err) callback(err);
      else callback(null, info);
    }
  )
};

const getMovie = (id, callback) => {
  db.con.query(
    'SELECT * FROM movies WHERE id=? LIMIT 1', 
    [id],
    (err, movie) => {
      if (err) callback(err);
      else (callback(null, movie));
    }
  );
}

const deleteMovie = (id, callback) => {
  db.con.query(
    'DELETE FROM movies WHERE id = ?', 
    [id],
    (err, info) => {
      if (err) {
        console.log('err: ' + err);
        callback(err);
      } else {
        callback(null);
      }
    }
  );
}

module.exports.getMovies = getMovies;
module.exports.addMovie = addMovie;
module.exports.getMovie = getMovie;
module.exports.deleteMovie = deleteMovie;