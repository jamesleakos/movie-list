const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const MovieController = require('./controllers/MoviesController.js');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get('/api/movies', (req, res) => MovieController.getMovies(req, res));
app.post('/api/movies', (req, res) => MovieController.addMovie(req, res));
app.delete('/api/movies/:id', (req, res) => MovieController.deleteMovie(req, res));
app.all('*', function (req, res) {
  console.log('logging here');
  res.status(404).send('not found');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})