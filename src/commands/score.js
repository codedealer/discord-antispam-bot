import DiscordCommand from '../model/DiscordCommand.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { config } from '../store/index.js'
import { Score } from '../lang/en.js'

class ScoreCommand extends DiscordCommand {
  constructor () {
    super();

    this.data = new SlashCommandBuilder()
      .setName('score')
      .setDescription('Show the total number of biscuits vanquished.')
      ;
  }
  async execute (interaction) {
    await interaction.reply(Score(config.data.totalActionsTaken));
  }
}

export default new ScoreCommand();