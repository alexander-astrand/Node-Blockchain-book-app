const express = require('express');
const dotenv = require('dotenv');
const books = require('./routes/books-routes');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utilities/AppError');

dotenv.config({ path: '../config/config.env' });
console.log('Environment variables:', process.env);

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/1/books', books);

app.all('*', (req, res, next) => {
    next(
      new AppError(
        `Couldn't find ${req.originalUrl}, did you misspell the url?`,
        404
      )
    );
  });

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => 
    console.log(`Server is up and running on port: ${PORT}`)
);