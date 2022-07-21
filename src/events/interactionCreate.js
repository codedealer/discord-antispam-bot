import DiscordEvent from '../model/DiscordEvent.js'
import { InteractionType } from 'discord-api-types/v10'

class InteractionCreateEvent extends DiscordEvent {
  async execute (interaction) {
    if (interaction.type === InteractionType.ApplicationCommand &&
        interaction.client.commands.has(interaction.commandName)) {
      try {
        const cmd = interaction.client.commands.get(interaction.commandName);

        await cmd.execute(interaction);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export default new InteractionCreateEvent('interactionCreate');