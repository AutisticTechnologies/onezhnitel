import type { Dispatcher } from '@mtcute/dispatcher'

import type Storage from '../../core/storage/abstract.js'
import type { Dependenices } from '../dispatchers/index.js'
import { FilesystemStorage } from '../../core/storage/filesystem.js'

export default function initializeDependenices(
  dispatcher: Dispatcher,
  dependenices: Dependenices,
): void {
  let storage: Storage

  switch (dependenices.storage) {
    case 'filesystem':
      storage = new FilesystemStorage()
      break
    default:
      throw new Error(`Unknown storage type: ${dependenices.storage}`)
  }

  dispatcher.inject('storage', storage)
}
