import DiscordCommand from '../model/DiscordCommand.js'
import { ContextMenuCommandBuilder } from '@discordjs/builders'
import { ApplicationCommandType } from 'discord-api-types/v10'
import { NoPermCommand, MessageRemoved } from '../lang/en.js'
import { isGuildAdmin, isBotAdmin } from '../utils/index.js'

class RemoveCommand extends DiscordCommand {
  constructor () {
    super();

    this.data = new ContextMenuCommandBuilder()
      .setName('remove')
      .setType(ApplicationCommandType.Message)
      ;
  }
  async execute (interaction) {
    if (isGuildAdmin(interaction.member) ||
        isBotAdmin(interaction.user) ||
        interaction.user.id === interaction.targetMessage.author.id) {
      await interaction.targetMessage.delete();

      await interaction.reply({
        content: MessageRemoved(),
        ephemeral: true,
      });

      return;
    }

    await interaction.reply({
      content: NoPermCommand(),
      ephemeral: true,
    });
  }
}

export default new RemoveCommand();