import { TelegramClient, TelegramClientOptions } from '@mtcute/node'
import configureDispatchers from './dispatchers/index.js'

const DEFAULT_STORAGE_PATH = 'bot-data/session'

/**
 * Telegram bot options
 */
interface BotOptions {
  /**
   * Telegram client options
   */
  clientOptions: Partial<TelegramClientOptions>

  /**
   * Telegram bot token
   */
  botToken: string

  /**
   * Storage path (default: bot-data/session)
   */
  storagePath?: string
}

/**
 * Starts a Telegram bot
 * @param options Telegram bot options
 */
export default async function startBot(options: BotOptions): Promise<void> {
  // @ts-expect-error
  const client = new TelegramClient({
    ...options.clientOptions,
    storage: options.storagePath ?? DEFAULT_STORAGE_PATH
  })
  configureDispatchers(client)

  const user = await client.start({ botToken: options.botToken })
  console.info('Logged in as %s (@%s)!', user.displayName, user.username)
}
