class Entry {
  constructor (message, timestamp) {
    this.timestamp = timestamp;
    this.channelId = message.channelId;
    this.content = message.content;
  }
  isStale (timestamp, lifetime) {
    return timestamp - this.timestamp > lifetime;
  }
}

export default Entry;