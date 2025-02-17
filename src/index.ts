import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { ApiError } from './utils';
import { errorHandler } from './middlewares';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
