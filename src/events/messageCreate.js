import DiscordEvent from '../model/DiscordEvent.js'
import Entry from '../model/Entry.js'
import { config, store } from '../store/index.js'
import { messageGuard } from '../utils/index.js'

class MessageCreateEvent extends DiscordEvent {
  execute (message) {
    if (!messageGuard(message)) return;

    const id = message.author.id;
    const guildId = message.guildId;
    if (!id || !guildId) throw new Error(`Message object was provided with id ${id} and guildId ${guildId}`);

    if (!store[guildId]) store[guildId] = {};

    const timestamp = message.createdTimestamp;

    if (Array.isArray(store[guildId][id])) {
      // flush stale entries
      for (let i = store[guildId][id].length - 1; i >= 0; i--) {
        if (store[guildId][id][i].isStale(
            timestamp,
            config.data.messages.cacheLifetime
           )) {
          // this and every next item are older than max lifetime
          store[guildId][id] = store[guildId][id].slice(i + 1);
          break;
        }
      };

      store[guildId][id].push(new Entry(message, timestamp));
    } else {
      store[guildId][id] = [new Entry(message, timestamp)];
    }

    if (!config.data.lastEviction ||
        timestamp - config.data.lastEviction > config.data.messages.evictStaleBranchesAfter) {
      Object.values(store).forEach(idCollection => { // by guild
        for (const [id, entries] of Object.entries(idCollection)) { // by id
          if (!Array.isArray(entries) || entries.length === 0) {
            delete idCollection[id];
            break;
          }

          // check the most recent entry
          if (entries.at(-1).isStale(timestamp, config.data.messages.cacheLifetime)) {
            delete idCollection[id];
            break;
          }
        }
      });

      config.data.lastEviction = timestamp;
      config.write();
    }
  }
}

export default new MessageCreateEvent('messageCreate');