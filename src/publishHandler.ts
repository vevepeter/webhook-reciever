import { WebhookPage, WebhookPublishBody } from './receiverMiddleware'
import path from 'path'
import fs from 'fs'

const publishHandler = async (body: WebhookPublishBody) => {
  const { payload } = body

  if (isOfflineAssets(body)) {
    const { assets, assetsFolder } = payload

    for (const asset of (assets || [])) {
      if (!assetsFolder) throw new Error('Missing field "assetsFolder"')

      const response = await fetch(asset)
      const buffer = await response.arrayBuffer();

      const assPath = path.join('./public/', payload.dir, assetsFolder, getAssetPath(asset, assetsFolder))
      await saveFile(assPath, Buffer.from(buffer))

      console.log(`. saved asset\n\t${asset}\n\t-> ${assPath.toString()}`)
    }
  }

  if (isDownloadPagesWebhook(body)) await downloadPages(payload.pages)

  for (const page of payload.pages) {
    let pagePath = path.join('./public/', payload.dir, page.index ? 'index.html' : page.path)
    if (!path.extname(pagePath)) pagePath = path.join(pagePath, 'index.html')

    if (page.html)
      await saveFile(pagePath, page.html)
  }
}

/**
 * Populates the pages' `html` fields
 *
 * @param pages
 */
const downloadPages = async (pages: WebhookPage[]) => {
  for (const page of pages) {
    if (page.downloadUrl) {
      const response = await fetch(page.downloadUrl)

      page.html = await response.text()
    }
  }
}

const getAssetPath = (path: string, assetsFolder: string) =>
  path.match(/.*(\/.*$)/)?.[1] || ''

const isDownloadPagesWebhook = (body: WebhookPublishBody) =>
  body.payload.pages.reduce((prev, current) => prev || !!current.downloadUrl, false)

const isOfflineAssets = (body: WebhookPublishBody) =>
  !!body.payload.assetsFolder

const saveFile = async (filePath: string, contents: Buffer | string) => {
  console.debug('. writing:', filePath)
  const dir = path.dirname(filePath)

  // ensure folder exists
  try {
    await fs.promises.access(dir)
  } catch (e) {
    await fs.promises.mkdir(dir, { recursive: true })
  }

  await fs.promises.writeFile(filePath, contents)
}

export default publishHandler
