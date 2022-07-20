import { Low, JSONFile } from 'lowdb'
import Loader from '../Loader.js';
import { fileURLToPath } from 'url'
import { createConfig } from '../utils/index.js'

const configFile = fileURLToPath(Loader.getFileUrl('../config.json'));
const adapter = new JSONFile(configFile);
const db = new Low(adapter);

await db.read();

db.data = createConfig(db.data);

await db.write();

export const config = db;

export const store = {
  guilds: {},
  actionCache: {},
  flushBranch (guildId, id, timestamp) {
    for (let i = this.guilds[guildId][id].length - 1; i >= 0; i--) {
      if (this.guilds[guildId][id][i].isStale(
          timestamp,
          config.data.messages.cacheTTL
         )) {
        // this and every next item are older than max lifetime
        this.guilds[guildId][id] = this.guilds[guildId][id].slice(i + 1);
        break;
      }
    };
  },
  /*
    evict all the stale entries, this method is slow
    and should be used discreetly
  */
  flush (timestamp) {
    Object.values(this.guilds).forEach(idCollection => { // by guild

      for (const [id, entries] of Object.entries(idCollection)) { // by id
        if (!Array.isArray(entries) || entries.length === 0) {
          delete idCollection[id];
          break;
        }

        // check the most recent entry
        if (entries.at(-1).isStale(timestamp, config.data.messages.cacheTTL)) {
          delete idCollection[id];
          break;
        }
      }
    });

    config.data.lastEviction = timestamp;
    config.write();
  },
};