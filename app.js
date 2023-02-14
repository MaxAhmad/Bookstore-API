const express = require('express')
const rateLimit = require("express-rate-limit")
const helmet = require('helmet')

const config = require('./config/config')
const booksRoute = require('./routes/books')
const authorsRoute = require('./routes/authors')
const connectToDB = require('./database/db')

const app = express()


//Middlewares
app.use(express.json())

//Connect to DB
connectToDB()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

//security middleware
app.use(helmet())

app.use('/api/v1/books', booksRoute)
app.use('/api/v1/authors', authorsRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(config.PORT, () => {
    console.log(`App is runing on ${config.PORT}`)
})