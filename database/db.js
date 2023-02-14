const mongoose = require('mongoose')
const config = require('../config/config')

function connectToDB () {
    mongoose.connect(config.MONGOURL)

    mongoose.connection.on('connected', () => {
        console.log('Connected to Database')
    })
}

module.exports = connectToDB