import Action from '../model/Action.js'
import { vanquish } from '../utils/index.js'
import { store } from '../store/index.js'

class BanAction extends Action {
  name = 'ban';
  async execute (spamConfig, message) {
    if (!message.member?.bannable) {
      throw new Error(`Ban was requested for ${message.author.tag} but the permissions are insufficient`);
    }

    await message.member.ban({
      deleteMessageDays: spamConfig.action.deleteMessageDays,
      reason: spamConfig.id
    });

    // reset store to stop other detectors
    store.guilds[message.guildId][message.author.id] = [];

    await vanquish(message);
  }
}

export default new BanAction();