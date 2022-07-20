import Action from '../model/Action.js'
import { SpamWarn, SpamWarnMute } from '../lang/en.js'
import { userMention } from '@discordjs/builders'
import { deleteMessagesFromUser } from '../utils/index.js'

class WarningAction extends Action {
  name = 'warning';
  async execute (spamConfig, message) {
    const needsMute = spamConfig.action.mute && spamConfig.action.muteFor > 0;
    const content = needsMute ?
                    SpamWarnMute(
                      userMention(message.author.id),
                      spamConfig.action.muteFor
                    ) :
                    SpamWarn(userMention(message.author.id));
    if (needsMute) {
      if (!message.member?.moderatable) {
        throw new Error(`Mute was requested for ${message.author.tag} but the permissions are insufficient`);
      }

      message.member.timeout(spamConfig.action.muteFor, spamConfig.id);
    }

    await deleteMessagesFromUser(message.guildId, message.author.id, message.client);
    await message.channel.send(content);
  }
}

export default new WarningAction();