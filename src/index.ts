import express from 'express'
import bodyParser from 'body-parser'
import { loggerMiddleware } from './loggerMiddleware'
import { vevSignatureMiddleware } from './vevSignatureMiddleware'
import { errorMiddleware } from './errorMiddleware'
import { receiverMiddleware } from './receiverMiddleware'
import { serverMiddleware } from './server-middleware'

export const files: Record<string, string> = {}

const PORT = 8001

const app = express()
app.set('trust proxy', true)

app.get(
  '*',
  loggerMiddleware,
  serverMiddleware
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
