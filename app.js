const express = require('express');
const app = express();
let bodyParser = require('body-parser')

let cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const userRoutes = require('./routes/users');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use('/users',userRoutes)


module.exports = app
