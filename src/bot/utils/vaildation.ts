import type { MessageContext } from '@mtcute/dispatcher'

import {
  MAXIMUM_DURATION_IN_SECONDS,
  MAXIMUM_SIZE_IN_MIBIBYTES,
  ValidationErrorCode,
} from '../../core/utils/validator.js'
import { tr } from '../../i18n/index.js'

export default async function respondWithValidationError(
  message: MessageContext,
  code: ValidationErrorCode,
): Promise<void> {
  let response

  switch (code) {
    case ValidationErrorCode.TooBig:
      response = tr(message, 'tooBigFile', MAXIMUM_SIZE_IN_MIBIBYTES)
      break
    case ValidationErrorCode.TooLong:
      response = tr(message, 'tooLongVideo', MAXIMUM_DURATION_IN_SECONDS)
      break
    default:
      response = tr(message, 'genericValidationError')
  }

  await message.replyText(response)
}
