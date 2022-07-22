import DiscordCommand from '../model/DiscordCommand.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { isGuildAdmin, isBotAdmin, vanquish } from '../utils/index.js'
import { NoPermCommand, Vanquished } from '../lang/en.js'
import { config } from '../store/index.js'
//import { CommandInteractionOptionResolver } from 'discord.js'

class VanquishCommand extends DiscordCommand {
  constructor () {
    super();

    this.data = new SlashCommandBuilder()
      .setName('vanquish')
      .setDescription('Manually vanquish a tricky buscuit that eluded the filter.')
      .addUserOption(option => (
        option.setName('target')
              .setDescription('User')
              .setRequired(true)
      ))
      ;
  }
  async execute (interaction) {
    if (!isGuildAdmin(interaction.member) &&
        !isBotAdmin(interaction.user)) {
      await interaction.reply({
        content: NoPermCommand(),
        ephemeral: true,
      });

      return;
    }

    const member = interaction.options.getMember('target');
    if (!member.bannable) {
      await interaction.reply({
        content: `Ban was requested for ${member.user.tag} but the permissions are insufficient`,
        ephemeral: true,
      });

      return;
    }

    await member.ban({
      deleteMessageDays: 1,
      reason: 'Vanquish command'
    });

    await vanquish();

    await interaction.reply({
      content: Vanquished(member.user.tag, config.data.totalActionsTaken),
      ephemeral: false,
    });
  }
}

export default new VanquishCommand();