const joi = require("joi");

const bookSchema = joi.object({
  title: joi.string().min(5).max(255).trim().required(),
  year: joi.number().integer().max(2023),
  isbn: joi.string().min(10).max(13).required(),
  price: joi.number().min(0).required(),
  createAt: joi.date().default(Date.now),
  lastUpdateAt: joi.date().default(Date.now),
});


exports.addBookValidator = async (req, res, next) => {
    const bookPayload = req.body

    await bookSchema.validateAsync(bookPayload)
    res.status(200).json({
        status: true,
        data: bookPayload
    })
    next()
    
}