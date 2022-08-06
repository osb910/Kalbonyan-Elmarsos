const mongoose = require('mongoose');

const MONGO_URL =
  'mongodb+srv://nasa-api:QbdlNPNW9LC1wjmE@nasacluster.fsf4tb8.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

const mongoConnect = async () => await mongoose.connect(MONGO_URL);

const mongoDisconnect = async () => await mongoose.disconnect();

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
