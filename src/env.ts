import assert from 'node:assert/strict'
import process from 'node:process'

export const API_ID = Number.parseInt(process.env.API_ID!)
export const API_HASH = process.env.API_HASH!
export const BOT_TOKEN = process.env.BOT_TOKEN!

assert(
  !Number.isNaN(API_ID) && API_HASH !== null && BOT_TOKEN !== null,
  'API_ID or API_HASH or BOT_TOKEN not defined!'
)

export const STORAGE_TYPE = process.env.STORAGE_TYPE ?? 'filesystem'
