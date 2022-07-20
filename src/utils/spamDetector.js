import { store } from '../store/index.js'
import _ from '../lang/en.js'
import { userMention } from '@discordjs/builders'

export default {
  async detect (spamConfig, message) {
    if (message.author.username !== 'totally') return;

    // find consecutive messages that satisfy the filter
    let entries = store.guilds[message.guildId][message.author.id];

    // check the rate limit
    if (entries.length < 1 ||
        spamConfig.rateLimit.maxEntries < 1 ||
        entries.length < spamConfig.rateLimit.maxEntries) return;

    const now = entries.at(-1).timestamp;
    const r = spamConfig.contentFilter ?
              new RegExp(spamConfig.contentFilter, 'i') :
              false;
    const differentChannels = new Set();
    const finalSelection = [];

    for (let i = entries.length - 1; i >= 0; i--) {
      differentChannels.add(entries[i].channelId);

      if (!entries[i].isStale(now, spamConfig.rateLimit.timeframe)) {
        if (r === false || r.test(entries[i].content)) {
          finalSelection.push(entries[i]);
        }
      } else {
        // we go from recent to old so all the rest are stale
        break;
      }
    };

    if (differentChannels.size < spamConfig.minChannels) return;
    if (finalSelection.length < spamConfig.rateLimit.maxEntries) return;

    let content = _.SpamWarn(userMention(message.author.id));
    message.channel.send(content);
  }
}