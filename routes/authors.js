const express = require('express')

const authorController = require('../controllers/authors')



const authorsRoute = express.Router()

authorsRoute.get('/', authorController.getAllAuthors)

authorsRoute.post('/', authorController.addAuthor)

authorsRoute.get('/:id', authorController.getAuthor)

authorsRoute.patch('/:id', authorController.updateAuthor)

authorsRoute.delete('/:id', authorController.deleteAuthor)

module.exports = authorsRoute
