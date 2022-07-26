import Loader from '../Loader.js';
import Action from '../model/Action.js'
import { Collection } from 'discord.js'

const loader = new Loader(Loader.getDirectoryUrl('actions'), ['index.js']);

const actions = new Collection();

for await (const { default: action } of loader.load()) {
  if (action instanceof Action && action.name) {
    actions.set(action.name, action);
  }
}

export default actions;