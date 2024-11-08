import express from 'express'
import bodyParser from 'body-parser'
import { loggerMiddleware } from './loggerMiddleware'
import { vevSignatureMiddleware } from './vevSignatureMiddleware'
import { errorMiddleware } from './errorMiddleware'
import { receiverMiddleware } from './receiverMiddleware'

const PORT = 8088

const app = express()
app.set('trust proxy', true)

app.get(
  '*',
  loggerMiddleware,
  express.static('public')
)

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

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
