import { useState, useCallback } from "react";

const STORAGE_KEY = "worldarmory_votes";

interface VoteStore {
  votes: Record<string, number>;    // weaponName -> total votes
  userVoted: string[];               // weaponNames user already voted for
}

function getStore(): VoteStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { votes: {}, userVoted: [] };
}

function saveStore(store: VoteStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useVotes(defaultVotes: Record<string, number>) {
  const [store, setStore] = useState<VoteStore>(() => {
    const saved = getStore();
    // Merge defaults with saved
    const merged = { ...defaultVotes };
    for (const [k, v] of Object.entries(saved.votes)) {
      merged[k] = v;
    }
    return { votes: merged, userVoted: saved.userVoted };
  });

  const hasVoted = useCallback((name: string) => store.userVoted.includes(name), [store.userVoted]);

  const vote = useCallback((name: string) => {
    setStore(prev => {
      if (prev.userVoted.includes(name)) return prev;
      const next: VoteStore = {
        votes: { ...prev.votes, [name]: (prev.votes[name] || 0) + 1 },
        userVoted: [...prev.userVoted, name],
      };
      saveStore(next);
      return next;
    });
  }, []);

  const getVotes = useCallback((name: string) => store.votes[name] || 0, [store.votes]);

  return { vote, hasVoted, getVotes };
}
