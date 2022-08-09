const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/weatherForecast.js')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const port = process.env.PORT || 3000

//////// Define path for express Config.
const publicDirectory = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

///////// Setup static directory to serve.
app.use(express.static(publicDirectory))

///////// Setup handlebars engine and views location.
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

/////////////////////////////////// Index //////////
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harsh'
    })
})


/////////////////////////////////// About /////////////
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harsh'
    })
})



//////////////////////////////////// Help //////////////
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I am here to help you out !',
        title: 'Help',
        name: 'Harsh'
    })
})

//////////////////////////////////// 404 //////////////
// app.get('*', (req, res) => {
//     res.render('404', {
//         errorMessage: 'NO Such Page Found !',
//         title: '404',
//         name: 'Harsh'
//     })
// })
//////////////////////////////////// Weather ////////////
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send( {
                forecast: forecastData,
                location
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send ({
//             error: 'Please enter address'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})