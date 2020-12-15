require('dotenv').config();
const express = require('express')
const port = process.env.PORT || 3001
const mongoose = require('mongoose');
const routes = require('./routes/index')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//mongoDb on mongoAtlas
mongoose.connect(process.env.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },(err) => {
    if(err) {
        console.log({error: err})
    } else {
        console.log({message: "connected to mongoAtlas cluster"})
    }
})

app.use(routes)

app.listen(port, () => {
    console.log(`app is listening to http://localhost:${port}`)
})