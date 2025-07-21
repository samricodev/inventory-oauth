require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');

const app = express();

const connection = require('./db/connection');
const router = require('./routes/router');
const i18n = require('./config/i18n');

connection();

app.use(express.json());
app.use(i18n);
app.use(cors(config.get('cors')));
app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', router);
app.get('/ping', (req, res) => {
  console.log('Pong received');
  res.send('pong');
});

module.exports = app;
