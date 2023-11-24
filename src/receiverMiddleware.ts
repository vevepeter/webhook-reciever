import { Request, Response } from 'express'
import publishHandler from './publishHandler'

type WebhookEvent = 'PING' | 'PUBLISH' | 'UNPUBLISH'

type WebhookBody = {
  event: WebhookEvent
  /**
   * Hosting key
   */
  hosting: string
  /**
   * Event ID
   */
  id: string
  payload: WebhookPayload
}

type WebhookPayload = {}

export type WebhookPage = {
  downloadUrl?:string
  html?: string
  path: string
  title: string
  viewerUrl: string
}

export type WebhookPublishPayload = {
  /**
   * Assets to be downloaded and put in the `assetsFolder`, present if the Hosting has `includeAssets` enabled
   */
  assets?: string[]
  /**
   * Path name to assets folder, present if the Hosting has `includeAssets` enabled
   */
  assetsFolder?: string
  /**
   * Project directory, treated as the project's path, used for linking from Vev
   */
  dir: string
  pages: WebhookPage[]
  /**
   * Settings for all hosting plugins, present if the Hosting has `sendPackageSettings` enabled
   */
  pluginsData?: Record<string, any>
  projectId: string
  projectTitle: string
  team?: string
  workspace?: string
}

type WebhookUnpublishPayload = {
  projectId: string
}

interface WebhookPingBody extends WebhookBody {
  event: 'PING'
}

export interface WebhookPublishBody extends WebhookBody {
  event: 'PUBLISH',
  payload: WebhookPublishPayload
}

interface WebhookUnpublishBody extends WebhookBody {
  event: 'UNPUBLISH',
  payload: WebhookUnpublishPayload
}


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
