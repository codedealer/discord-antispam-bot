import { Client, GatewayIntentBits } from 'discord.js'
import Loader from './Loader.js';
import DiscordEvent from './model/DiscordEvent.js';
import commands from './commands/index.js'

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
] });

client.commands = commands;

const loader = new Loader(Loader.getDirectoryUrl('events'));
const events = [];

for await (const { default: event } of loader.load()) {
  if (event instanceof DiscordEvent) {
    events.push(event);
  }
}

events.forEach(event => {
  const eventType = event.once ? 'once' : 'on';
  client[eventType](event.name, (...args) => event.execute(...args));
});

export default client;