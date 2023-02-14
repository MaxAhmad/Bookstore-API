const Books = require("./../models/booksModel");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Books.find();
    res.status(200).json({
      status: "success",
      data: {
        books,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.addBooks = async (req, res, next) => {
  try {
    const bookPayload = req.body;

    const book = await Books.create(bookPayload);
    res.status(200).json({
      status: "succes",
      data: book,
    });
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const update = req.body;

    const book = await Books.findByIdAndUpdate(bookId, update, { new: true });
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Books.findById(req.params.id);
    console.log(book)
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Books.findByIdAndDelete(req.params.id)
        res.status(204).json({
            message: 'Deleted successfully'
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}