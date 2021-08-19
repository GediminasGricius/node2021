const request=require('postman-request');  //Kintamajame request bus užkrautas modulis postman-request

const forecast=(place)=>{
    //URL į kurį kreipsimės
    const url='https://api.meteo.lt/v1/places/'+place+'/forecasts/long-term';

    //Iškviečiama funkcija request, kuriai paduodamas uri, callback funkcija kuri bus iškviečiama
    // tuomet kai gausime atsakymą arba įvyks klaida
    // Funkcija iškviečiama Asinchroniniu būdu
    request({url:url}, (error, response)=>{
        const data=response.body;       //Gautą atsakymą (JSON) išsaugome į kintamąjį (String)
        const weather=JSON.parse(data); //Iš string'o (JSON) pagaminame objektą
        console.log(weather.place.name);
        console.log(weather.forecastTimestamps[0].forecastTimeUtc);
        console.log(weather.forecastTimestamps[0].airTemperature);
    });
}

module.exports=forecast;