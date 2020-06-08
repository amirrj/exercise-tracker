const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database up and running');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/user', require('./routes/api/User'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});
