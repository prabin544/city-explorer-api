const express = require('express');
const cors = require('cors');
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
function Forecast(date, description) {
  this.date = date;
  this.description = description;
}


app.get('/weather', (request, response) => {
  
  let dailyForecast = weatherData.data
  const forecast = dailyForecast.map(forecast => (
    {
      description: forecast.weather.description,
      date: forecast.datetime
    }
    ));
    response.send(forecast)
  
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));