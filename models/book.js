const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    MaSach: String,
    TenSach: String,
    NhaXuatBan: String,
    SoTrang: Number,
    NamXuatBan: Number
});

const newBook = mongoose.model('Book', bookSchema);

module.exports = newBook;