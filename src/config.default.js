// default config
export default {
  messages: {
    spam: [
      {
        /*
          unique id to discern between different filters
        */
        id: 'Message spam prevention',
        enabled: true,
        rateLimit: {
          maxEntries: 4,
          /*
            can't be larger than cacheTTL
          */
          timeframe: 15*1000,
        },
        /*
          regex to search in a message's content
          OR
          <repeat> to search for consequtive messages with the same content
        */
        contentFilter: '<repeat>',
        /*
          how many channels an author should post to be acted against
          (bots usually post in every available channel in rapid succession)
        */
        minChannels: 1,
        /*
          action to take when conditions are met
          its config is included, depends on the action
        */
        action: {
          name: 'warning',
          mute: true,
          muteFor: 60*1000,
          cooldown: false, // currently not used
        },
      },
      {
        /*
          unique id to discern between different filters
        */
        id: 'Link spam banhammer',
        enabled: true,
        rateLimit: {
          maxEntries: 4,
          timeframe: 20*1000,
        },
        contentFilter: 'https?:\/\/.+',
        minChannels: 4,
        action: {
          name: 'ban',
          deleteMessageDays: 1,
        },
      },
    ],
    /*
      max miliseconds before data is evicted from memory
    */
    cacheTTL: 30*1000,
  },
  /*
    store accumulates stale branches that are never evicted
    because the stale data is only flushed when
    the author id branch is updated if the author goes silent,
    their branch stays in memory useless
    the number in miliseconds should be lower (more frequent flushes) on busier servers
  */
  evictStaleBranchesAfter: 60*10*1000,
  lastEviction: false,
  totalActionsTaken: 0,
  /*
    The bot will send a message to the designated channel
    each time it takes a ban action on the given server
  */
  vanquishMessageChannelId: {
    ['guildId']: 'channelId',
  },
  /*
    Mostly for development: the bot will alert to this channel
    when an error occurs (if it's able to send messages)
    or in the instance of attempt at unauthorized access to a command
  */
  alertMessageChannelId: [
    {
      guildId: '',
      channelId: '',
    },
  ],
  /*
    The discord user id of the administrator of the bot.
    This id and the server's administrator are immune to bot's actions
    and can run its commands regardless of the permissions
  */
  administratorId: '',
  registeredCommands: [],
  logFile: '../log.json',
}