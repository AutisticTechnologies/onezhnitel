import { createMtcuteI18n } from '@mtcute/i18n'

import { ru } from './ru.js'

export const tr = createMtcuteI18n({
  primaryLanguage: {
    name: 'ru',
    strings: ru,
  },
  // TODO(synzr): add english/ukrainian translations
  otherLanguages: {},
})
