import Loader from '../Loader.js';
import Action from '../model/Action.js'

const loader = new Loader(Loader.getDirectoryUrl('actions'), ['index.js']);

const actions = {};

for await (const { default: action } of loader.load()) {
  if (action instanceof Action && action.name) {
    actions[action.name] = action;
  }
}

export default actions;