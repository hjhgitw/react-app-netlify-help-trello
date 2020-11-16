const HelpScout = require('helpscout-mailbox-api');

// %%APP_ID%% is our openweathermapp appid which we store in an environment variable

const url = "https://api.openweathermap.org/data/2.5/weather?appid=f09f9fd35e1d61a51ed2b4a1ec6e10cf&units=metric&lang=en&lat=40.7143528&lon=-74.0059731";



function OpenDialog(url, width, height, callback)
{
    var win = window.open(url, "MyDialog", width, height, "menubar=0,toolbar=0");
    var timer = setInterval(function ()
    {
        if (win.closed)
        {
            clearInterval(timer);
            var returnValue = win.returnValue;
            callback(returnValue);
        }
    }, 500);
}

window.onmessage = function (e) {
    if (e.data) {
        //Code for true
        console.log("win close ");
    } else {
        //Code for false
        console.log("win close 2");
    }
};

function onAfterAuth(e){
    console.log("win close 3");
}

export default function fetchMailBoxData() {
    console.log(process.env.NODE_ENV);

    const helpscout = new HelpScout({
        clientId: '%%CLIENT_ID%%',
        clientSecret: '%%CLIENT_SECRET%%',
        authenticationFlow: 'OAuth2'
    });

    const authorizeUri = helpscout.generateAuthorizationUri();

    HTMLFormControlsCollection.log("Open Auth url " + authorizeUri);

    OpenDialog(authorizeUri,300,300,onAfterAuth);



  //  https://secure.helpscout.net/authentication/authorizeClientApplication?client_id=CUFgxbQTS8mb2Ei88s8EN9YR7wt7NWjr&state=x90sXiiknUXymcst20POSqktDJyxa4ne


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

