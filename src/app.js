const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./Utils/forecast')
const geocode = require('./Utils/geocode')

// Dfine paths for exoress config
const publicDicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPth = path.join(__dirname,'../templates/partials')

const app = express()

// Set up handelbars engine and vies location
app.set('view engine', 'hbs')
app.set('views' ,viewsPath)
hbs.registerPartials(partialsPth)

// Setup static dirctory to serve
app.use(express.static(publicDicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Osama'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Osama'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'What the fuck is your problem',
        title: 'Help',
        name: 'Osama'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) =>{
           if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            }
            )
            
        })
    })

})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Osama',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Osama',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})