const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://AdminGame:gameshop@gameshop-ncsg9.mongodb.net/bddgameshop';

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};

mongoose.connect(dbUrl, options, error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Your database is OK')
  }
});

module.exports = mongoose;
