const superagent = require('superagent');

function getWeather(request, response){

//   const weatherQuery = request.query.citySearchedFor;

  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    key: process.env.WEATHER_API_KEY,
    units: 'I',
    lat: request.query.lat,
    lon: request.query.lon
  };

  // USE superagent to make the api call. the DATA most care about lives at results.body
  superagent
    .get(url)
    .query(query)
    .then(weatherData => {
        response.json(weatherData.body.data.map(day => 
          (new DailyForecast(day))));
    });

}


function DailyForecast(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
}

// node syntax for what we are exporting
module.exports = getWeather;