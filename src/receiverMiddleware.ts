import { storeVevPage } from './storeVevPage'
import { Request, Response } from 'express'

export const receiverMiddleware = async (req: Request, res: Response) => {
  const { payload, event } = req.body as any
  const pages = (payload && payload.pages) || []

  console.log('Event received [' + event + ']')

  if (event === 'PUBLISH') {
    const projectDir = payload.dir

    await Promise.all(pages.map(page => storeVevPage(page, projectDir)))
  } else if (event === 'PING') {
    // @ts-ignore
    console.log('Webhook test ping received from: ' + req.ip)
  } else if (event === 'UNPUBLISH') {
    console.log('UNPUBLISH page - not (yet) supported')
  } else {
    throw new Error(`Unsupported event [${event}]`)
  }

  console.log('Event handled [' + event + ']')
  res.send({ message: 'I received your webhook!!' })
}
