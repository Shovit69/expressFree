const express = require ('express')
const app = express()
//const morgan = require('morgan')


// const logger = require('./logger')

//app.use(morgan('tiny'))

// app.use ('/api', logger)


// app.get('/',(req,res)=>{
    
//     res.send('Home')
// })
// app.get('/about',(req,res)=>{
//     res.send('ABout')
// })
// app.get('/api',(req,res)=>{
    
//     res.send('Home')
// })
// app.get('/api/products',(req,res)=>{
//     res.send('ABout')
// })

const logger = (req,res,next)=>{
    const method =req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time);
    next()
}

app.get('/',logger,(req,res)=>{
    
    res.send('Home')
})
app.get('/about',logger,(req,res)=>{
    res.send('ABout')
})

app.listen(5000, ()=>{
    console.log('server listening at port 5000');
})