// Vendor libs
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Custom libs
const Country = require('./models/country.model');
const connectDB = require('./db');

// Members
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// parse application/json
app.use(bodyParser.json());

// Server routes
app.get('/', (req, res) => {
  res.json('Hello María');
});

app.get('/countries', async (req, res) => {
  try {
    const results = await Country.find();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post('/countries', async (req, res) => {
  try {
    const country = new Country({
      code: req.body.code,
      name: req.body.name
    });

    const result = await country.save();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Express running on http://${HOST}:${PORT}`);
});
