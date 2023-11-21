import { NextFunction, Request } from 'express'

export function loggerMiddleware(req: Request, _res, next: NextFunction) {
  const length = (JSON.stringify(req.body) || '').length

  console.log('Request body length:', length)

  next()
}
