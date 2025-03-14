import { Dispatcher, filters } from '@mtcute/dispatcher'

import { tr } from '../../i18n/index.js'

export const dispatcher = Dispatcher.child()

dispatcher.onNewMessage(filters.start, async (message) => {
  const response = tr(message, 'helloWorld')
  await message.answerText(response)
})
