const superagent = require('superagent');

function getMovies(request, response){

  const moviesQuery = request.query.citySearchedFor;

  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: moviesQuery
  };

  // USE superagent to make the api call. the DATA most care about lives at results.body
  superagent
    .get(url)
    .query(query)
    .then(movieData => {
        response.json(movieData.body.results.map(movie => 
          (new MovieDisplay(movie))));
    });

}


function MovieDisplay(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date
}

// node syntax for what we are exporting
module.exports = getMovies;