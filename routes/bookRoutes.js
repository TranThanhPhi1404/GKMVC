// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/books/:MaSach', BookController.getBook);
router.get('/books/', BookController.getAllBooks);
router.delete('/books/:MaSach', BookController.deleteBook);
router.put('/books/:MaSach', BookController.updateBook);
router.post('/books', BookController.createBook);

module.exports = router;
