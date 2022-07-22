import DiscordEvent from '../model/DiscordEvent.js'
import { InteractionType } from 'discord-api-types/v10'

class InteractionCreateEvent extends DiscordEvent {
  async execute (interaction) {
    if (interaction.type === InteractionType.ApplicationCommand &&
        interaction.client.commands.has(interaction.commandName)) {
        const cmd = interaction.client.commands.get(interaction.commandName);

        await cmd.execute(interaction);
    }
  }
}

export default new InteractionCreateEvent('interactionCreate');