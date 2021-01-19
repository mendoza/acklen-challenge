require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const body = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('front/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
