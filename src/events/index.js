import Loader from '../Loader.js';
import DiscordEvent from '../model/DiscordEvent.js';
import { Collection } from 'discord.js'

const loader = new Loader(Loader.getDirectoryUrl('events'), ['index.js']);

const events = new Collection();

for await (const { default: event } of loader.load()) {
  if (event instanceof DiscordEvent) {
    events.set(event.name, event);
  }
}

export default events;