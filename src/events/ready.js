import DiscordEvent from '../model/DiscordEvent.js'

class ReadyEvent extends DiscordEvent{
  execute (client) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
}

export default new ReadyEvent('ready', true);