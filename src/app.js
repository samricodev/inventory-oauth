const express = require('express');
const app = express();

require('dotenv').config();

const connection = require('./db/connection');
const router = require('./routes/router');

connection();

app.use(express.json());

app.use('/auth/', router);
app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.send('pong');
})

module.exports = app;
