/* eslint-disable perfectionist/sort-imports */
import type { MessageContext } from '@mtcute/dispatcher'
import { Dispatcher, filters } from '@mtcute/dispatcher'

import type { ValidationErrorCode } from '../../core/utils/validator.js'
import validate from '../../core/utils/validator.js'
import respondWithValidationError from '../utils/vaildation.js'

const MEDIA_STORAGE_TTL_IN_SECONDS = 5 * 60 // NOTE: 5 minutes

export const dispatcher = Dispatcher.child()

dispatcher.onNewMessage(filters.video, async (message) => {
  const { duration, fileSize: size } = message.media

  const validationResult = validate(duration, size!)
  if (validationResult !== true) {
    return await respondWithValidationError(
      message as MessageContext,
      validationResult as ValidationErrorCode,
    )
  }

  // TODO(synzr): implement the whole workflow (STT -> GPT -> TTS)
  const mediaId = await dispatcher.deps.storage.save(
    message.client.downloadAsNodeStream(message.media),
    MEDIA_STORAGE_TTL_IN_SECONDS,
  )
  await message.replyText(mediaId)
})
