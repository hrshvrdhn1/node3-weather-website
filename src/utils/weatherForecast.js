const request = require ('request')
const access_key = 'access_key=ea7d7ed9cc890a4f09d1d546be433bf8'


const forecast =(lon, lat, callback) => {
    const url = ('http://api.weatherstack.com/current?'
        + access_key
        + '&query='
        + lat
        + ','
        + lon
        + '&units=m')
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to Connect to forecast !!', undefined)
        }else if(body.error) {
            callback('Unable to find location', undefined)
        } 
        else {
            callback('', body.current.weather_descriptions[0]
                + '. It is currently '
                + (body.current.temperature)
                + ' degree celcius but it feels like '
                + (body.current.feelslike)
                + ' degree celcius .'
            )
        }    
    })
}

module.exports = forecast