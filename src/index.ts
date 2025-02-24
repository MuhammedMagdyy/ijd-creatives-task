import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares';
import { corsConfig } from './config';

dotenv.config();

const app = express();
const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
