class Entry {
  constructor (message, timestamp) {
    this.timestamp = timestamp;
    this.channelId = message.channelId;
    this.content = message.content;
  }
  isStale (timestamp, lifetime) {
    return timestamp - this.timestamp > lifetime;
  }
  toString () {
    if (this.content.length === 0) return `[${this.channelId}] empty`;
    return this.content.length > 20 ?
           `${this.content.substr(0, 20)}...` :
           this.content;
  }
}

export default Entry;