const express = require('express');
const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.send('pong');
})

module.exports = app;
