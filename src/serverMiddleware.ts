import { NextFunction, Request, Response } from 'express'
import { files } from './index'
import { sanitizePath } from './helpers'

export function serverMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = sanitizePath(req.path)

  if (files[path]) return res.send(files[path])

  next()
}
