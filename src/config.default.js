// default config
export default {
  messages: {
    spam: {
      enabled: false,
    },
    flood: {
      enabled: true,
    },
    cacheLifetime: 30*1000, // max miliseconds before data is evicted from memory
    /*
      store accumulates stale branches that are never evicted
      because the stale data is only flushed when author id branch is updated
      if author goes silent, their branch stays in memory useless
      the number in seconds should be lower (more frequent flushes) on busier servers
    */
    evictStaleBranchesAfter: 60*1000,
  },
  lastEviction: false,
  totalActionsTaken: 0,
}