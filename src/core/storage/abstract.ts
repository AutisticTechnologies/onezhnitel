import type { UUID } from 'node:crypto'
import type { Readable } from 'node:stream'

export default abstract class Storage {
  /**
   * Save the media stream to the storage
   * @param stream Readable stream of the media
   * @param expiresInSeconds Expiration time in seconds
   * @returns Media ID
   */
  public abstract save(stream: Readable, expiresInSeconds: number): Promise<UUID>

  /**
   * Fetch the media stream from the storage
   * @param id Media ID
   * @returns Readable stream of the media
   */
  public abstract fetch(id: UUID): Promise<Readable>

  /**
   * Remove the media from the storage
   * @param id Media ID
   */
  public abstract remove(id: UUID): Promise<void>
}
