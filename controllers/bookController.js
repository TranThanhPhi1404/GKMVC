const { request } = require('express');
const newBook = require('../models/book.js');


const BookController = {
    getBook: async function(req, res) {
        // Logic for getting a book
        const MaSach = req.params.MaSach;
        console.log(MaSach);
        try {
            const books = await newBook.findOne({ MaSach });
            if (!books) {
                return res.status(404).json({ message: 'Book not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: books });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateBook: async function(req, res) {
        // Logic for updating a book
        const MaSach = req.params.MaSach;
        const updateData = req.body;
        try {
            const books = await newBook.findOneAndUpdate({ MaSach }, updateData, { new: true });
            if (!books) {
                return res.status(404).json({ message: 'Book not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: books });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteBook: async function(req, res) {
        // Logic for deleting a book
        const MaSach = req.params.MaSach;
        try {
            const books = await newBook.findOneAndDelete({ MaSach });
            if (!books) {
                return res.status(404).json({ message: 'Book not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: books });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllBooks: async function(req, res) {
        try {
            const books = await newBook.find({});
            if (books.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: books });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    createBook: async function(req, res) {
        // Logic for creating a book
        const { MaSach, TenSach, NhaXuatBan, SoTrang, NamXuatBan } = req.body;
        try {
            const newB = await newBook.create({MaSach, TenSach, NhaXuatBan, SoTrang, NamXuatBan});
            res.json(newB);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    
    }
};

module.exports = BookController;
