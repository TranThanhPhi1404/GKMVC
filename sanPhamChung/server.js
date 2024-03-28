const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for products
const productSchema = new mongoose.Schema({
    MaSP: String,
    TenSP: String,
    NgaySX: Date,
    NgayHetHan: Date,
    NoiSX: String
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

const ProductController = {
    // Tìm một sản phẩm
    getProduct: async function(req, res) {
        const MaSP = req.params.MaSP;
        try {
            const product = await Product.findOne({ MaSP });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Cập nhật một sản phẩm
    updateProduct: async function(req, res) {
        const MaSP = req.params.MaSP;
        const updateData = req.body;
        try {
            const product = await Product.findOneAndUpdate({ MaSP }, updateData, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Xóa một sản phẩm
    deleteProduct: async function(req, res) {
        const MaSP = req.params.MaSP;
        try {
            const product = await Product.findOneAndDelete({ MaSP });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Lấy tất cả sản phẩm
    getAllProducts: async function(req, res) {
        try {
            const products = await Product.find({});
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            return res.status(200).json({ message: 'SUCCESS', data: products });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Thêm một sản phẩm mới
    createProduct: async function(req, res) {
        const { MaSP, TenSP, NgaySX, NgayHetHan, NoiSX } = req.body;
        try {
            const newProduct = new Product({ MaSP, TenSP, NgaySX, NgayHetHan, NoiSX });
            const savedProduct = await newProduct.save();
            return res.status(200).json({ message: 'SUCCESS', data: savedProduct });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

app.get('/products/:MaSP', ProductController.getProduct);
app.get('/products', ProductController.getAllProducts);
app.delete('/products/:MaSP', ProductController.deleteProduct);
app.put('/products/:MaSP', ProductController.updateProduct); // PUT endpoint
app.post('/products', ProductController.createProduct);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/products");
});
