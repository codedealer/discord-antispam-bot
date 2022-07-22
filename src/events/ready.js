import DiscordEvent from '../model/DiscordEvent.js'
import logger from '../logger.js'

class ReadyEvent extends DiscordEvent {
  execute (client) {
    console.log(`Logged in as ${client.user.tag}!`);
    logger.info(`Logged in as ${client.user.tag}!`);
  }
}

export default new ReadyEvent('ready', true);