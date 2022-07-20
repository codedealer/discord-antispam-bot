// default config
export default {
  messages: {
    spam: [
      {
        /*
          unique id to discern between different filters
        */
        id: 'Link spam prevention',
        enabled: true,
        rateLimit: {
          maxEntries: 1,
          /*
            can't be larger than cacheTTL
          */
          timeframe: 15*1000,
        },
        /*
          regex to search in a message's content
        */
        contentFilter: 'https?:\/\/.+',
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
          cooldown: false,
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
  vanquishMessageChannelId: {
    ['435583365224071190']: '435583365748621312',
  },
}