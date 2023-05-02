// auotomatically load env file to our app
require('dotenv').config()

// import express
const express=require('express')

// import cors
const cors=require('cors')

// import conncetion file
require('./db/connection')

// import router
const router=require('./routes/router')

// create server app
const server=express()
// to store port number
const PORT = 3000


// use cors express.json and router in server app
server.use(cors())
server.use(express.json())
server.use(router)


// route - localhost:3000
// server.get('/',(req,res)=>{
    // res.status(200).json("E cart server started")
// })

// run app
server.listen(PORT,()=>{
    console.log(`E cart server started at port ${PORT}`);
})
