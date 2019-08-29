// Vendor libs
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const dotenv = require('dotenv');

// Get environment config
dotenv.config();

// Set mongoose Promise to Bluebird
mongoose.Promise = bluebird;

// Members
const MODE = process.env.NODE_ENV || 'development';
const MONGODB_URL = process.env.MONGODB_URL;

// Retry connection

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true
  });
};

// Exit application on error
mongoose.connection.on('error', err => {
  console.log(`MongoDB connection error: ${err}`);
  setTimeout(connectWithRetry, 5000);
  // process.exit(-1)
});

mongoose.connection.on('connected', () => {
  console.log(`MongoDB is connected on ${MONGODB_URL}`);
});

if (MODE !== 'production') {
  mongoose.set('debug', true);
}

const connect = () => {
  connectWithRetry();
};

module.exports = connect();
