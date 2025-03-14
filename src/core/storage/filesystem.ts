import type { UUID } from 'node:crypto'
import type { Readable } from 'node:stream'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'

import Storage from './abstract.js'

interface FilesystemStorageEntry {
  id: UUID
  expiresAt: number
  path: string
}

export class FilesystemStorage extends Storage {
  // NOTE: reference to famous "etilqs_" prefix
  //       https://github.com/mackyle/sqlite/blob/18cf47156abe94255ae1495ba2da84517dce6081/src/os.h#L65
  private static TEMPORARY_DIRECTORY_PREFIX = 'letnihzeno_'

  private static INTERVAL_IN_MILLISECONDS = 10 * 1000 // NOTE: every 10 seconds

  private readonly entries: FilesystemStorageEntry[] = []

  private readonly directory: string

  constructor(directory?: string) {
    super()

    if (directory) {
      this.directory = directory
    } else {
      this.directory = this.createTemporaryDirectory()
    }

    setInterval(
      () => this.clearExpired(),
      FilesystemStorage.INTERVAL_IN_MILLISECONDS,
    )
  }

  private createTemporaryDirectory(): string {
    return fs.mkdtempSync(
      path.join(os.tmpdir(), FilesystemStorage.TEMPORARY_DIRECTORY_PREFIX),
    )
  }

  public async save(
    stream: Readable,
    expiresInSeconds: number,
  ): Promise<UUID> {
    const entry: Partial<FilesystemStorageEntry> = {
      id: crypto.randomUUID(),
      expiresAt: Date.now() + expiresInSeconds * 1000,
    }
    entry.path = path.join(this.directory, entry.id!)
    this.entries.push(entry as FilesystemStorageEntry)

    await pipeline(
      stream,
      fs.createWriteStream(entry.path!, { encoding: 'binary' }),
    )

    return entry.id!
  }

  public async fetch(id: UUID): Promise<Readable> {
    const entry = this.entries.find(entry => entry.id === id)
    if (!entry) {
      throw new Error(`File not found: ${id}`)
    }
    return fs.createReadStream(entry.path!)
  }

  public async remove(id: UUID): Promise<void> {
    const entry = this.entries.findIndex(entry => entry.id === id)
    if (entry === -1) {
      throw new Error(`File not found: ${id}`)
    }

    fs.unlinkSync(this.entries[entry].path)
    this.entries.splice(entry, 1)
  }

  private async clearExpired(): Promise<void> {
    const now = Date.now()
    this.entries.forEach(async (entry) => {
      if (entry.expiresAt < now) {
        await this.remove(entry.id)
      }
    })
  }

  public async clear(): Promise<void> {
    this.entries.forEach(async (entry) => {
      await this.remove(entry.id)
    })
  }
}
