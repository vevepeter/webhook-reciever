import { Request, Response } from 'express'
import publishHandler from './publishHandler'
import { WebhookBody, WebhookPingBody, WebhookPublishBody, WebhookUnpublishBody } from './types'


export const receiverMiddleware = async (req: Request, res: Response) => {
  const body = req.body as WebhookBody | WebhookPublishBody

  console.log(`Event received [${body.event}]`)

  if (isPublishEvent(body)) {
    await publishHandler(body)
  } else if (isPingEvent(body)) {
    console.log(`Webhook test ping received from: ${req.ip}`)
  } else if (isUnpublishEvent(body)) {
    // TODO
  } else {
    throw new Error(`Unsupported event [${body.event}]`)
  }

  console.log(`Event handled [${body.event}]`)
  res.send({ message: 'I received your webhook!!' })
}

const isPingEvent = (body: WebhookBody): body is WebhookPingBody => body?.event === 'PING'
const isPublishEvent = (body: WebhookBody): body is WebhookPublishBody => body?.event === 'PUBLISH'
const isUnpublishEvent = (body: WebhookBody): body is WebhookUnpublishBody => body?.event === 'UNPUBLISH'
