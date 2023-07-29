const axios = require('axios');
const catchErrorAsync = require('../utilities/catchErrorAsync');
const AppError = require('../utilities/AppError');
const Blockchain = require('../blockchain/Blockchain');

const blockchain = new Blockchain();

const response = {
  status: 'Not found',
  statusCode: 404,
  data: null,
  error: null,
};

// Controller function to get all books from the blockchain
exports.getBooks = catchErrorAsync(async (req, res) => {
  // Fetch data from the blockchain (or any other data source)
  const data = blockchain.chain;

  // Update the response object with the fetched data
  response.status = 'Success';
  response.statusCode = 200;
  response.data = data;

  // Send the response as JSON
  res.status(response.statusCode).json(response);
});

// Controller function to add a new book to the blockchain
exports.addBook = catchErrorAsync(async (req, res) => {
  const { title, author, pages } = req.body;

  // Check if any of the required properties are missing
  if (!title) {
    throw new AppError('Title is missing!', 400);
  }

  if (!author) {
    throw new AppError('Author is missing!', 400);
  }

  if (!pages || isNaN(pages)) {
    throw new AppError('Pages is missing or invalid!', 400);
  }

  // Convert pages to a number (assuming it should be a number)
  const parsedPages = parseInt(pages);

  // Other validation logic, if required

  const bookData = {
    title,
    author,
    pages: parsedPages,
    // Other properties if needed
  };

  // Add the book data to the blockchain using the addBlock function
  const block = blockchain.addBlock({ data: bookData });
  console.log(bookData);

  // Check the validity of the blockchain after adding the block
  if (!Blockchain.isValid(blockchain.chain)) {
    throw new AppError('Blockchain is not valid after adding the block!', 500);
  }

  // Send the response with the newly added block information
  res.status(201).json({ message: 'Added new block', block: block });
});

// Controller function to check the validity of the blockchain
exports.checkValidity = catchErrorAsync(async (req, res) => {
  const isValid = Blockchain.isValid(blockchain.chain);

  if (isValid) {
    res.status(200).json({ message: 'Blockchain is valid' });
  } else {
    res.status(500).json({ message: 'Blockchain is not valid' });
  }
});
