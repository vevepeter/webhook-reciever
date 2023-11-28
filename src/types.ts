type WebhookEvent = 'PING' | 'PUBLISH' | 'UNPUBLISH'

export interface WebhookPingBody extends WebhookBody {
  event: 'PING'
}

export interface WebhookPublishBody extends WebhookBody {
  event: 'PUBLISH',
  payload: WebhookPublishPayload
}

export interface WebhookUnpublishBody extends WebhookBody {
  event: 'UNPUBLISH',
  payload: WebhookUnpublishPayload
}

export type WebhookBody = {
  event: WebhookEvent
  /**
   * Hosting key
   */
  hosting: string
  /**
   * Event ID
   */
  id: string
  payload: WebhookPayload
}

export type WebhookPage = {
  downloadUrl?: string
  html?: string
  index?: boolean
  path: string
  title: string
  viewerUrl: string
}

export type WebhookPublishPayload = {
  /**
   * Assets to be downloaded and put in the `assetsFolder`, present if the Hosting has `includeAssets` enabled
   */
  assets?: string[]
  /**
   * Path name to assets folder, present if the Hosting has `includeAssets` enabled
   */
  assetsFolder?: string
  /**
   * Project directory, treated as the project's path, used for linking from Vev
   */
  dir: string
  pages: WebhookPage[]
  /**
   * Settings for all hosting plugins, present if the Hosting has `sendPackageSettings` enabled
   */
  pluginsData?: Record<string, any>
  projectId: string
  projectTitle: string
  team?: string
  workspace?: string
}

type WebhookPayload = {}

type WebhookUnpublishPayload = {
  projectId: string
}

