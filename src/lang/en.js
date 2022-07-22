import { bold } from '@discordjs/builders'

export const SpamWarn = (mention) => `${mention} this is a warning. Cease message flood.`

export const SpamWarnMute = (mention, duration) => `${mention} you are muted for spam for ${duration / 1000} seconds.`;

export const Vanquished = (tag, total) => `${tag} was vanquished for being a tricky biscuit.
Total number of vanquished: ${bold(total)}.`;

export const Score = (total) => `Total number of tricky biscuits vanquished: ${bold(total)}.`;

export const NoPermCommand = () => `You have no permissions to use this command. This incident will be reported.`;

export const NotBannable = (member) => `Ban was requested for ${member.user.tag} but the permissions are insufficient`;

export const MessageRemoved = () => `Message was removed`;

export const UnauthorizedLog = (command, username) => `Unauthorized access: command: ${command}, user: ${username}`;