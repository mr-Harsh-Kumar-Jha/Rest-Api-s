const dotenv = require('dotenv')
const express = require('express')

const authRoutes = require('./routes/auth')

const app = express()
dotenv.config()

require('./config/databse')

app.use(express.json())

app.use('/auth/user',authRoutes)




app.listen(process.env.PORT, () => {
    console.log('server connected');
})