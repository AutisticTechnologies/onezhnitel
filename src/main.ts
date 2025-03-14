import process from 'node:process'

import startBot from './bot/index.js'
import * as env from './env.js'

if (process.argv[1] === import.meta.filename) {
  // NOTE: start the bot if the script is launched as a main
  await startBot({
    clientOptions: {
      apiId: env.API_ID,
      apiHash: env.API_HASH,
    },
    dependenices: {
      storage: 'filesystem',
    },
    botToken: env.BOT_TOKEN,
  })
}

export default { startBot }
