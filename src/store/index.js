// const storage = new Map();
// let counter = storage.get(message.author.username);
// if (!counter) counter = 0;
// storage.set(message.author.username, ++counter);
// console.log(`${message.author.username}: ${counter}`);
import { Low, JSONFile } from 'lowdb'
import Loader from '../Loader.js';
import { fileURLToPath } from 'url'
import { createConfig } from '../utils/index.js'

const configFile = fileURLToPath(Loader.getFileUrl('config.json'));
const adapter = new JSONFile(configFile);
const db = new Low(adapter);

await db.read();

db.data = createConfig(db.data);

await db.write();

export const config = db;

export const store = {};