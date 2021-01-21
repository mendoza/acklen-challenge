require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const body = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./routers/api.router');
const DefaultError = require('./middlewares/defaultError.middleware');
const NotFound = require('./middlewares/notFound.middleware');

const app = express();
const PORT = process.env.PORT || 80;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log('successfully connected to MongoDB');
  },
);

app.use(cors());
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(helmet());

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}
const date = new Date();
const accessLogStream = fs.createWriteStream(
  path.join('logs', `${date.toLocaleDateString().replace(/\//g, '-')}.log`),
  { flags: 'a' },
);
app.use(morgan('tiny', { stream: accessLogStream }));

app.use('/api', api);
app.use(DefaultError);
app.use(NotFound);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
