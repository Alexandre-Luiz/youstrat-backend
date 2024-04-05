import express from 'express';
import cors from 'cors';
import winston from 'winston';
import session from 'express-session';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

import gameRouter from './routes/game.route.js';
import mapRouter from './routes/map.route.js';
import stratRouter from './routes/strategy.route.js';
import userRouter from './routes/user.route.js';

const app = express();
// Heroku will set a env port dynamically that is why the .env.PORT
const PORT = process.env.PORT || 3001;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'YouStrat.log' }),
  ],
  format: combine(label({ label: 'YouStrat-api' }), timestamp(), myFormat),
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://youstrat-frontend2.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const corsOptions = {
  // origin:  'http://localhost:3000',
  origin: 'https://youstrat-frontend2.vercel.app/',
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      httpOnly: true,
    },
  })
);

app.use('/game', gameRouter);
app.use('/map', mapRouter);
app.use('/strategies', stratRouter);
app.use('/user', userRouter);

// Error middleware
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default app;
