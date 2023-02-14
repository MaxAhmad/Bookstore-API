const express = require('express')
const config = require('./config/config')
const booksRoute = require('./routes/books')
const connectToDB = require('./database/db')

const app = express()


//Middlewares
app.use(express.json())

//Connect to DB
connectToDB()

app.use('/api/v1/books', booksRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(config.PORT, () => {
    console.log(`App is runing on ${config.PORT}`)
})