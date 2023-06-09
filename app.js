/* eslint-disable no-unused-vars */
require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const paginate = require('express-paginate');
const routerUsers = require('./routes/users');
const routerPosts = require('./routes/posts');
const indexRoutes = require('./routes/index');
const errorHandler = require('./middlewares/handler');

const { NotFoundError } = require('./constants/errors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { createUser, login } = require('./controllers/users');
const { checkAuth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3000;
const app = express();

// keep this before all routes that will use pagination
app.use(paginate.middleware(20, 100));
app.use(helmet());
app.use(limiter);
/* app.use(express.static(path.join(__dirnamey, 'public'))); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', indexRoutes);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  console.log(err);
  errorHandler(err, req, res, next);
});

routerUsers.use((req, res) => {
  throw new NotFoundError('Роут не найден');
});
routerPosts.use((req, res) => {
  throw new NotFoundError('Роут не найден');
});
const NODE_ENV = 'production';
mongoose.connect(
  NODE_ENV === 'production' ? 'mongodb://localhost:27017/postsdb' : 'dev-secret',
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log('mongdb is connected');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  },
);
module.exports = app;
