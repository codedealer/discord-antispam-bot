import logger from '../logger.js'
import { sendAlert } from '../utils/index.js'
import {
  UnauthorizedLog,
} from '../lang/en.js'

class DiscordCommand {
  data;
  async execute () { throw new Error('Not implemented') }
  async reportUnautorized (interaction) {
    const logMessage = UnauthorizedLog(this.data.name, interaction.user.tag);

    logger.info(logMessage);
    try {
      await sendAlert(interaction.client, logMessage);
    } catch (e) {
      logger.error(e);
    }
  }
}

export default DiscordCommand;