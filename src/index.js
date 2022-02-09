import express from 'express';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './loggerMiddleware.js';
import { vevSignatureMiddleware } from './vevSignatureMiddleware.js';
import { errorMiddleware } from './errorMiddleware.js';
import { receiverMiddleware } from './receiverMiddleware.js';

const app = express();
app.set("trust proxy", true);

app.post(
  "/webhook",
  errorMiddleware,
  bodyParser.json({
    limit: '200000kb',
  }),
  loggerMiddleware,
  vevSignatureMiddleware,
  receiverMiddleware
);

app.listen(8001, () => console.log(`Example app listening on port 8001!`));
