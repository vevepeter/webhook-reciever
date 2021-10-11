export function loggerMiddleware(req, res, next) {
  const length = (JSON.stringify(req.body) || '').length;
  
  console.log('Request body length:', length);
  
  next();
}
