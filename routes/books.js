const express = require('express')

const booksController = require('../controllers/books')

const {addBookValidator} = require('../validator/validator')


const booksRoute = express.Router()

booksRoute.get('/', booksController.getAllBooks)

booksRoute.post('/', addBookValidator, booksController.addBooks)

booksRoute.get('/:id', booksController.getBook)

booksRoute.patch('/:id', booksController.updateBook)

booksRoute.delete('/:id', booksController.deleteBook)

module.exports = booksRoute
