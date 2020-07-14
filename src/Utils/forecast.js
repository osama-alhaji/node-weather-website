const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33b5ad356798650e2743fb220bf939fe&query=' + latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, { body })=> {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }else if (body.error){
            callback('Unable to find location!', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] 
                        + '. The Current Temperature is: ' 
                        + body.current.temperature 
                        + ' It feels like ' 
                        + body.current.feelslike + ' Degrees'
                    )
        }
    }) 
}

module.exports = forecast

// weather_description: response.body.current.weather_descriptions[0],
// Current_temperature: response.body.current.temperature,
// feels_like: response.body.current.feelslike