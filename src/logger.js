import pino from 'pino'
import { config } from './store/index.js'

const path = config.data.logFile.length ? config.data.logFile : '1';

const transport = pino.transport({
  target: 'pino/file',
  options: {
    destination: path,
  }
});

export default pino(transport);