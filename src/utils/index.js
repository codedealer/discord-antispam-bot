import { merge } from 'lodash-es'
import { config, store } from '../store/index.js'
import defaultConfig from '../config.default.js'
import { Vanquished } from '../lang/en.js'

export const createConfig = (dbConfig = {}) => {
  return merge(defaultConfig, dbConfig);
}

export const messageGuard = (message) => {
  if (message.author.bot ||
      message.system ||
      !message.guildId) {
    return false;
  }

  return true;
}

/*
  go through the store and remove messages
  from that userId (id) from every channel
*/
export const deleteMessagesFromUser = async (guildId, id, client) => {
  const entries = store.guilds[guildId][id];
  if (!Array.isArray(entries)) throw new Error(`{$entries} is not array`);

  const channelIds = new Set();
  const messages = {};
  entries.forEach(entry => {
    channelIds.add(entry.channelId);

    if (Array.isArray(messages[entry.channelId])) {
      messages[entry.channelId].push(entry.messageId)
    } else {
      messages[entry.channelId] = [entry.messageId];
    }
  });

  const channels = {};
  channelIds.forEach(channelId => {
    channels[channelId] = client.channels.cache.get(channelId);
  });

  for (const [channelId, messageIds] of Object.entries(messages)) {
    try {
      await channels[channelId].bulkDelete(messageIds);
    } catch (e) {
      // 10008 is deleting message that was already deleted
      if (e.code !== 10008) throw e;
    }
  }

  // reset the store
  // reseting the store can prevent other
  // detectors from doing its thing
  //store.guilds[guildId][id] = [];
}

export const vanquish = async (message = false) => {
  config.data.totalActionsTaken++;
  config.write();

  if (message !== false &&
      Object.hasOwn(config.data.vanquishMessageChannelId, message.guildId)) {
    const channelId = config.data.vanquishMessageChannelId[message.guildId];
    if (!channelId) return;

    const channel = message.client.channels.cache.get(channelId);
    if (!channel) return;

    await channel.send(Vanquished(message.author.tag, config.data.totalActionsTaken));
  }
}