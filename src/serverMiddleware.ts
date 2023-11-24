import { NextFunction, Request, Response } from 'express'
import { files } from './index'
import { sanitizePath } from './helpers'

export function serverMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = sanitizePath(req.path)

  if (files[path])
    return res.send(files[path])

  // if nothing has been published to `/`, serve a table of contents
  if (path === '')
    return res.send(getList())

  next()
}

/**
 * Generates a list of all files on the "server", with links
 */
const getList = () => Object.keys(files).length ?
  Object
    .keys(files)
    .map(path => `<a href="${path}">${path}</a>`)
    .join('<br />') :
  '<h1>Nothing has been published yet</h1>'
