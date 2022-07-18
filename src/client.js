import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

export default client;