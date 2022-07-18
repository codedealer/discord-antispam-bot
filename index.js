import 'dotenv/config';
import client from './src/client.js';

client.login(process.env.TOKEN);