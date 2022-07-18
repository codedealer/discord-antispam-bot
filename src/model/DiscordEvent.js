class DiscordEvent {
  constructor (name, once = false) {
    this.name = name;
    this.once = once;
  }
  execute () { throw new Error('Not implemented') }
}

export default DiscordEvent;