import Loader from '../Loader.js';
import DiscordCommand from '../model/DiscordCommand.js'
import { config } from '../store/index.js'
import { Collection } from 'discord.js'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import logger from '../logger.js'

const loader = new Loader(Loader.getDirectoryUrl('commands'), ['index.js']);

const commands = new Collection();

for await (const { default: command } of loader.load()) {
  if (command instanceof DiscordCommand) {
    commands.set(command.data.name, command);
  }
}

let needsCommandRegistration = false;
const registeredCommands = config.data.registeredCommands;

if (registeredCommands.length !== commands.size ||
    !commands.hasAll(...registeredCommands)) {
  needsCommandRegistration = true;
}

if (needsCommandRegistration) {
  logger.info('Registering applications commands');

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    const body = [];
    commands.forEach(command => { body.push(command.data.toJSON()) });

    const response = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body }
    );

    config.data.registeredCommands = response.map(data => data.name);
    config.write();
  } catch (e) {
    logger.error(e);
  }
} else {
  logger.info('No need for command regitration');
}

export default commands;