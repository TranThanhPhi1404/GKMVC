const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for books
const bookSchema = new mongoose.Schema({
    MaSach: String,
    TenSach: String,
    NhaXuatBan: String,
    SoTrang: Number,
    NamXuatBan: Number
});

// Create a model based on the schema
const Book = mongoose.model('Book', bookSchema);

const BookController = {
    // Tìm một sách
    getBook: async function(req, res) {
        const MaSach = req.params.MaSach;
        try {
            const book = await Book.findOne({ MaSach });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: book });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Cập nhật một sách
    updateBook: async function(req, res) {
        const MaSach = req.params.MaSach;
        const updateData = req.body;
        try {
            const book = await Book.findOneAndUpdate({ MaSach }, updateData, { new: true });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: book });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Xóa một sách
    deleteBook: async function(req, res) {
        const MaSach = req.params.MaSach;
        try {
            const book = await Book.findOneAndDelete({ MaSach });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: book });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Lấy tất cả sách
    getAllBooks: async function(req, res) {
        try {
            const books = await Book.find({});
            if (books.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: books });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Thêm một sách mới
    createBook: async function(req, res) {
        const { MaSach, TenSach, NhaXuatBan, SoTrang, NamXuatBan } = req.body;
        try {
            const newBook = new Book({ MaSach, TenSach, NhaXuatBan, SoTrang, NamXuatBan });
            const savedBook = await newBook.save();
            return res.status(200).json({ message: 'SUCCESS', data: savedBook });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

app.get('/books/:MaSach', BookController.getBook);
app.get('/books', BookController.getAllBooks);
app.delete('/books/:MaSach', BookController.deleteBook);
app.put('/books/:MaSach', BookController.updateBook); // PUT endpoint
app.post('/books', BookController.createBook);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/books");
});
