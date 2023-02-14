const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    longDescription: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true,
        max: [2022, 'Year must be less than or equal to 2020'] //validation with custom message
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'ISBN must be unique'] //validation with custom message
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0'] //validation with custom message
    }
},
{timestamps: true}
)

const Books = mongoose.model('Books', BookSchema)

module.exports = Books