const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true
    }).then(() => {
        console.log('DB connected successfully');
    }).catch((e) => {
        console.log(e);
    })