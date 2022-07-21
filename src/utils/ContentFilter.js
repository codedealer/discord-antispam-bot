class ContentFilter {
  supportedCommands = new Map([
    ['<empty>', 'skip'],
    ['<repeat>', 'findSame'],
  ]);
  constructor (cmdOrRegexStr) {
    if (cmdOrRegexStr.length === 0) cmdOrRegexStr = '<empty>';
    if (this.supportedCommands.has(cmdOrRegexStr)) {
      this.contentCache = [];
      this.executeMethod = this.supportedCommands.get(cmdOrRegexStr);
    } else {
      this.regex = new RegExp(cmdOrRegexStr, 'i');
      this.executeMethod = 'regexTest';
    }
  }
  execute (content) {
    return this[this.executeMethod](content);
  }
  skip () { return true }
  regexTest (content) { return this.regex.test(content) }
  findSame (content) {
    if (content.length === 0) return false;

    content = this.normalizeStr(content);
    if (this.contentCache.length === 0) {
      // this is the first element
      this.contentCache.push(content);
      return true;
    } else {
      // check the previous element to see if the content is the same
      return content === this.contentCache.at(-1);
    }
  }
  normalizeStr (str) {
    return str.trim().normalize().toLowerCase();
  }
}

export default ContentFilter;