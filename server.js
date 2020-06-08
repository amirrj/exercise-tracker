const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database up and running');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});
