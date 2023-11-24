import { WebhookPage, WebhookPublishBody } from './receiverMiddleware'
import { files } from './index'
import { sanitizePath } from './helpers'

const publishHandler = async (body: WebhookPublishBody) => {
  if (isOfflineAssets(body)) {
    // TODO
  } else {
    const { payload } = body

    if (isDownloadPagesWebhook(body)) await downloadPages(payload.pages)

    for (const page of payload.pages) {
      files[sanitizePath(`${payload.dir}/${page.path}`)] = page.html
    }

    console.log(`"files": ${JSON.stringify(files, null, '| ')}`)
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

const isDownloadPagesWebhook = (body: WebhookPublishBody) =>
  body.payload.pages.reduce((prev, current) => prev || !!current.downloadUrl, false)

const isOfflineAssets = (body: WebhookPublishBody) =>
  !!body.payload.assetsFolder

export default publishHandler
