import { merge } from 'lodash-es'
import defaultConfig from '../config.default.js'

export function createConfig (dbConfig = {}) {
  return merge(defaultConfig, dbConfig);
}

export function messageGuard (message) {
  if (message.author.bot ||
      message.system ||
      !message.guildId) {
    return false;
  }

  return true;
}