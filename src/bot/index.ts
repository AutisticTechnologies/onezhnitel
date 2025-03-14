import type { TelegramClientOptions } from '@mtcute/node'

import type { Dependenices } from './dispatchers/index.js'

import { TelegramClient } from '@mtcute/node' // eslint-disable-line import/order
import configureDispatchers from './dispatchers/index.js'

const DEFAULT_STORAGE_PATH = 'bot-data/session'

interface BotOptions {
  /**
   * Telegram client options
   */
  clientOptions: Partial<TelegramClientOptions>

  /**
   * Dependenices options
   */
  dependenices: Dependenices

  /**
   * Telegram bot token
   */
  botToken: string

  /**
   * Storage path (default: bot-data/session)
   */
  storagePath?: string
}

export default async function startBot(options: BotOptions): Promise<void> {
  // @ts-expect-error NOTE: clientOptions would have the required options anyway
  const client = new TelegramClient({
    ...options.clientOptions,
    storage: options.storagePath ?? DEFAULT_STORAGE_PATH,
  })
  configureDispatchers(client, options.dependenices)

  const user = await client.start({ botToken: options.botToken })
  console.info('Logged in as %s (@%s)!', user.displayName, user.username)
}
