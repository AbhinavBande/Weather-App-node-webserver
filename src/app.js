const express=require('express')
const path=require('path')
const hbs=require('hbs')

const geocode=require('../utils/geocode.js')
const forecast=require('../utils/forecast.js')

const app=express()

//express config dir
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Abhinav Bande'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Abhinav Bande'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Abhinav Bande'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: 'Location must be provided'
        })
    }

    geocode(req.query.location, (error,{location, latitude, longitude}={})=>{
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude,longitude,(error,message)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                message
            })
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Abhinav Bande',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 404,
        name: 'Abhinav Bande',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is running')
})