const express = require('express');
const router = express.Router();

const {
  getBooks,
  addBook,
  checkValidity, 
} = require('../controllers/books-controllers');

router.get('/', getBooks);

router.post('/', addBook);

router.get('/validity', checkValidity);

module.exports = router;
