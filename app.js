const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());
const routes = require('./routes/bookRoutes');
app.use(routes);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});



app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
