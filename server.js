'use strict'

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
// actually use the .env file I created
require('dotenv').config();
// import the json file
const weatherData = require('./data/weather.json')

const app = express();

// makes sure our data is accessible from the React frontend
app.use(cors());

const PORT = process.env.PORT || 3001;

// most of your actual server definition goes here
// A server's job is to listen at some path for a particular method
// listening for GET requests at the path /
app.get('/', (request, response) => {
  // when we get that request, send a response that says 'hello!'
  // response has some methods that are very helpful, such as a send method
  response.send('hello!');
});

// Constructor function for Forecast objects
// function DailyForecast(day) {
//   this.date = day.datetime;
//   this.description = day.weather.description;
// }

// Constructor function for Movie objects
// function MovieDisplay(movie) {
//   this.title = movie.original_title;
//   this.overview = movie.overview;
//   this.average_votes = movie.vote_average;
//   this.total_votes = movie.vote_count;
//   this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//   this.popularity = movie.popularity;
//   this.released_on = movie.release_date
// }

function handleErrors(error, response){
response.status(500).send('Internal error')
}

// app.get('/weather', (request, response) => {
//   superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
//     // .query lets us break up the query parameters using an object instead of a string
//     .query({
//       key: process.env.WEATHER_API_KEY,
//       units: 'I',
//       lat: request.query.lat,
//       lon: request.query.lon
//     })
//     .then(weatherData => {
//       response.json(weatherData.body.data.map(day => 
//         (new DailyForecast(day))));
//     });
// });

// app.get('/movies', (request, response) => {
//   console.log(request.query.citySearchedFor)
//   superagent.get('https://api.themoviedb.org/3/search/movie')
//     .query({
//       api_key: process.env.MOVIE_API_KEY,
//       query: request.query.citySearchedFor
//     })
//     .then(movieData => {
//       response.json(movieData.body.results.map(movie => 
//         (new MovieDisplay(movie))));
//     });
// });
const getMovies = require('./handlers/getMovies');
app.get('/movies', getMovies);

const getWeather = require('./handlers/getWeather');
app.get('/weather', getWeather);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));