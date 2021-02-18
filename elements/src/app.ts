import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@temasoa/common';
import { createElementRouter } from './routes/new';
import { showElementRouter } from './routes/show';
import { indexElementRouter } from './routes/index';
import { updateElementRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(createElementRouter);
app.use(showElementRouter);
app.use(indexElementRouter);
app.use(updateElementRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
