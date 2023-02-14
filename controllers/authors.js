const Authors = require("../models/authorsModel.js");

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Authors.find();
    res.status(200).json({
      status: "success",
      data: {
        authors,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.addAuthor = async (req, res, next) => {
  try {
    const authorpayload = req.body;

    const author = await Authors.create(authorpayload);
    res.status(200).json({
      status: "succes",
      data: author,
    });
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const authorId = req.params.id;

    const update = req.body;

    const author = await Authors.findByIdAndUpdate(authorId, update, { new: true });
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const author = await Authors.findById(req.params.id);
    console.log(author)
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteAuthor = async (req, res, next) => {
    try {
        const author = await Authors.findByIdAndDelete(req.params.id)
        res.status(204).json({
            message: 'Deleted successfully'
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}