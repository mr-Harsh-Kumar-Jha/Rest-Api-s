const dotenv = require('dotenv')
const express = require('express')
const app = express()
dotenv.config()

require('./config/databse')




app.listen(process.env.PORT, () => {
    console.log('server connected');
})