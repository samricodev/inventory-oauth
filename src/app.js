const express = require('express');
const app = express();
const config = require('config');
const cors = require('cors');

const connection = require('./db/connection');
const router = require('./routes/router');

connection();

app.use(express.json());
app.use(cors(config.get('cors')));

app.use('/auth', router);
app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.send('pong');
})

module.exports = app;
