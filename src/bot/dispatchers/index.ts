import { Dispatcher } from '@mtcute/dispatcher'
import { TelegramClient } from '@mtcute/node'

import { dispatcher as helloDispatcher } from './hello.js'

/**
 * Configures dispatchers for the Telegram client
 * @param client Telegram client
 */
export default function configureDispatchers(
  client: TelegramClient
): void {
  const dispatcher = Dispatcher.for(client)
  dispatcher.addChild(helloDispatcher)
}
