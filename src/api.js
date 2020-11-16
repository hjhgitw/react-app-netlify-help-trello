const HelpScout = require('helpscout-mailbox-api');

// %%APP_ID%% is our openweathermapp appid which we store in an environment variable
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather?appid=f09f9fd35e1d61a51ed2b4a1ec6e10cf';


const url = "https://api.openweathermap.org/data/2.5/weather?appid=f09f9fd35e1d61a51ed2b4a1ec6e10cf&units=metric&lang=en&lat=40.7143528&lon=-74.0059731";


export default function fetchMailBoxData() {
    console.log(process.env.NODE_ENV);

    const helpscout = new HelpScout({
        clientId: '%%CLIENT_ID%%',
        clientSecret: '%%CLIENT_SECRET%%',
        authenticationFlow: 'OAuth2'
    });

    const authorizeUri = helpscout.generateAuthorizationUri();

    return fetch( url )
    .then(response => response.json())
    .then(weatherData => {
      // we only care about a bit of the data
      const weather = {};
      weather.temp = weatherData.main.temp;
      weather.wind = weatherData.wind.speed;
      weather.conditions = weatherData.weather[0].id;
      weather.icon = weatherData.weather[0].icon;
   
      return weather;
    });
   
   }