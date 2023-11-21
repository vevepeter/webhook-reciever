export const errorMiddleware = (req, res, next) => {
  try {
    next()
  } catch (e) {
    console.error('caught an error')
    res.send({ ok: false, error: e })
  }
}
