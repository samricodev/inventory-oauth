const express = require('express');
const app = express();

const connection = require('./db/connection');
const router = require('./routes/router');

connection();

app.use(express.json());

app.use('/', router);
app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.send('pong');
})

module.exports = app;
