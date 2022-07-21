import { promises as fs } from 'fs';
import { join } from 'path';
import * as url from 'url';

class Loader {
  static getDirectory (name, originUrl = import.meta.url) {
    let dir = url.fileURLToPath(new URL('.', originUrl));
    dir = join(dir, name);

    return dir;
  }
  static getDirectoryUrl (name, base = import.meta.url) {
    name = name.endsWith('/') ? `./${name}` : `./${name}/`;

    return new URL(name, base);
  }
  static getFileUrl (name, base = import.meta.url) {
    return new URL(name, base);
  }
  constructor (dir, exclude = []) {
    this.dir = dir;
    this.exclude = exclude;
  }
  async * load () {
    let modules = await fs.readdir(this.dir);

    modules = modules.filter(file => !this.exclude.includes(file));

    for (const _module of modules) {
      yield await import(Loader.getFileUrl(_module, this.dir));
    }
  }
}

export default Loader;