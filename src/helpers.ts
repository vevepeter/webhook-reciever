export const sanitizePath = (path: string) =>
  path
    .replace(/\/+/g, '/')
    .replace(/\/$/, '')
