import express from 'express'
import bodyParser from 'body-parser'
import { loggerMiddleware } from './loggerMiddleware'
import { vevSignatureMiddleware } from './vevSignatureMiddleware'
import { errorMiddleware } from './errorMiddleware'
import { receiverMiddleware } from './receiverMiddleware'

const app = express()
app.set('trust proxy', true)

app.post(
  '/webhook',
  errorMiddleware,
  bodyParser.json({
    limit: '200000kb'
  }),
  loggerMiddleware,
  vevSignatureMiddleware,
  receiverMiddleware
)

app.listen(8001, () => console.log(`Example app listening on port 8001!`))
