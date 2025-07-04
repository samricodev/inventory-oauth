const express = require('express');
const app = express();

const router = require('./routes/router');

app.use(express.json());
app.use('/', router);

app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.send('pong');
})

module.exports = app;
