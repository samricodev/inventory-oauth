const express = require('express');
const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.json('pong');
})

module.exports = app;
