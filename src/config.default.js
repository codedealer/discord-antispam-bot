// default config
export default {
  messages: {
    spam: [
      {
        enabled: true,
        rateLimit: {
          maxEntries: 1,
          /*
            can't be larger than cacheLifetime
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
      },
    ],
    /*
      max miliseconds before data is evicted from memory
    */
    cacheLifetime: 30*1000,
    /*
      store accumulates stale branches that are never evicted
      because the stale data is only flushed when
      the author id branch is updated if the author goes silent,
      their branch stays in memory useless
      the number in miliseconds should be lower (more frequent flushes) on busier servers
    */
    evictStaleBranchesAfter: 60*1*1000,
  },
  lastEviction: false,
  totalActionsTaken: 0,
}