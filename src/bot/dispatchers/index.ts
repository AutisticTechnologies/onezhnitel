import type { TelegramClient } from '@mtcute/node'
import { Dispatcher } from '@mtcute/dispatcher'

import type Storage from '../../core/storage/abstract.js' // eslint-disable-line perfectionist/sort-imports
import initializeDependenices from '../utils/dependenices.js'

import { dispatcher as helloDispatcher } from './hello.js'
import { dispatcher as videoDispatcher } from './video.js'

declare module '@mtcute/dispatcher' {
  interface DispatcherDependencies {
    storage: Storage
  }
}

export interface Dependenices {
  /**
   * Storage type
   */
  storage: 'filesystem'
}

export default function configureDispatchers(
  client: TelegramClient,
  dependenices: Dependenices,
): void {
  const dispatcher = Dispatcher.for(client)
  initializeDependenices(dispatcher, dependenices)

  dispatcher.addChild(helloDispatcher)
  dispatcher.addChild(videoDispatcher)
}
