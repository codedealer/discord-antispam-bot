import DiscordEvent from '../model/DiscordEvent.js'
import Entry from '../model/Entry.js'
import detector from '../utils/spamDetector.js'
import { config, store } from '../store/index.js'
import { messageGuard } from '../utils/index.js'

class MessageCreateEvent extends DiscordEvent {
  async execute (message) {
    if (!messageGuard(message)) return;

    const id = message.author.id;
    const guildId = message.guildId;
    if (!id || !guildId) throw new Error(`Message object was provided with id ${id} and guildId ${guildId}`);

    if (!store.guilds[guildId]) store.guilds[guildId] = {};

    const timestamp = message.createdTimestamp;

    if (Array.isArray(store.guilds[guildId][id])) {
      // flush stale entries
      store.flushBranch(guildId, id, timestamp);

      store.guilds[guildId][id].push(new Entry(message, timestamp));
    } else {
      store.guilds[guildId][id] = [new Entry(message, timestamp)];
    }

    if (!config.data.lastEviction ||
        timestamp - config.data.lastEviction > config.data.messages.evictStaleBranchesAfter) {
      store.flush(timestamp);
    }

    // run heuristics
    config.data.messages.spam.forEach(async cfg => {
      if (!cfg.enabled) return;

      await detector.detect(cfg, message);
    });
  }
}

export default new MessageCreateEvent('messageCreate');