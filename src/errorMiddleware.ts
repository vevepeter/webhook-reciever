import { NextFunction, Request, Response } from 'express'

export const errorMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  try {
    next()
  } catch (e) {
    console.error('caught an error')
    res.send({ ok: false, error: e })
  }
}
