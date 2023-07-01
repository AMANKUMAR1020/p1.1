const express = require("express")
const app = express()
const path = require('path')
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const  PORT = process.env.PORT || 3500

app.use(logger)// costom middleware

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())//third party middleware

app.use('/', express.static(path.join(__dirname, 'public')))//express.static() >>grab the file location 
//app.use(express.static('public'))// express.static >> is built-in middleware
// app.use(express.static('public')) <is same as> === app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/',require('./routes/root'))

app.all('*',(req,res) =>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 Not Found'})
    }else{
       res.type('txt').send('404 Not Found') 
    }
})

app.use(errorHandler)// costom middleware

app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
