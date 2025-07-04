const mongoose = require('mongoose')
const config = require('config')

const connection = () => {
  mongoose.connect(config.get('mongodb.url'),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err)
    );
}

module.exports = connection
