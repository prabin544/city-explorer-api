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
function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleErrors(error, response){
response.status(500).send('Internal error')
}


// app.get('/weather', (request, response) => {
//   try{
//   let dailyForecast = weatherData.data.map(day => new DailyForecast(day));
//   response.send(dailyForecast)
//   }catch(error){
//     handleErrors(error, response)
//   }
//   });

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    // .query lets us break up the query parameters using an object instead of a string
    .query({
      key: process.env.WEATHER_API_KEY,
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon
    })
    .then(weatherData => {
      console.log(weatherData.body.city_name)
      response.json(weatherData.body.data.map(x => (
        {date: x.valid_date,
          description: x.weather.description})));
    });
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));