const express = require('express')
const rateLimit = require("express-rate-limit")
const { requiresAuth } = require('express-openid-connect')
const helmet = require('helmet')
const logger = require("./logging/logger")

const config = require('./config/config')
const booksRoute = require('./routes/books')
const authorsRoute = require('./routes/authors')
const connectToDB = require('./database/db')
const Books = require("./models/booksModel");

const auth0Middleware = require('./auth/auth0');

const app = express()


//Middlewares
app.use(express.json())

//Connect to DB
connectToDB()

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(auth0Middleware)

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

app.get('/', (req, res) => {
    res.render('index', {
         user: req.oidc.user,
    });
});

//Get profile
// Add the requiresAuth middleware for routes that require authentication
app.get('/profile',requiresAuth(), (req, res) => {
    //console.log(req.oidc.user);
    res.render('profile', {
        user: req.oidc.user,
        Books
    });
});

app.post('/logout', (req, res) => {
    req.oidcLogout();
    res.redirect('/');
});

// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(config.PORT, () => {
    logger.info(`App is runing on Port ${config.PORT}`)
})