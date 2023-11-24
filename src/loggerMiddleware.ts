import { NextFunction, Request, Response } from 'express'

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction) {
  const length = (JSON.stringify(req.body) || '').length

  console.log(`[${req.method}]`, '\t', `${length}bytes`, '\t', req.path)

  next()
}
