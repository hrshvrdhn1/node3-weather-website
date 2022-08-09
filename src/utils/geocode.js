const request = require('request')
const queryStr = '.json?'
    + 'access_token=pk.eyJ1IjoiaHNyaHZyZGhuMjgxOCIsImEiOiJjbDZnYmUwNTcwb3Y0M2NwcnNxajN5NXJuIn0'
    + '.ITBVTkUzfKUVZ_Rq0BYn7g'
    + '&limit=1'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) + queryStr

    request({ url, json: true }, (error, { body } = {}) => {
        if(error){
            callback('Unable to Connect geocode !!', undefined)
        } else if(body.features.length == 0 ){
            callback('Unable to find location', undefined)
        }
        else {
            callback('', {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode