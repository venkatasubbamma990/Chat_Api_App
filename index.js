const app = require('./app')
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require("dotenv").config();
mongoose.connect(process.env.DB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.listen(port , () => {
    console.log(`Server is running on port http://localhost:${port}`);
  })