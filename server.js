// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bidding_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Item model
const Item = require('./models/Item');

// Route to fetch bidding items
app.get('/api/items', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: 'Server error' }));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
