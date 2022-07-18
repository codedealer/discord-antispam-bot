import { promises as fs } from 'fs';
import { join } from 'path';
import * as url from 'url';

class Loader {
  static getDirectory (name, originUrl = import.meta.url) {
    let dir = url.fileURLToPath(new URL('.', originUrl));
    dir = join(dir, name);

    return dir;
  }
  constructor (dir) {
    this.dir = dir;
  }
  async * load () {
    for (const _module of await fs.readdir(this.dir)) {
      yield await import(join(this.dir, _module));
    }
  }
}

export default Loader;