import Loader from '../Loader.js';
import DiscordEvent from '../model/DiscordEvent.js';

const loader = new Loader(Loader.getDirectoryUrl('events'), ['index.js']);

const events = [];

for await (const { default: event } of loader.load()) {
  if (event instanceof DiscordEvent) {
    events.push(event);
  }
}

export default events;