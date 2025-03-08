import { useEffect, useState } from 'react';

const SEARCH_LIMIT = 5;
const COOLDOWN_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

interface RateLimitState {
  searchCount: number;
  lastSearchTime: number;
  isBlocked: boolean;
  cooldownEndTime: number;
}

export const useRateLimit = () => {
  const [state, setState] = useState<RateLimitState>(() => {
    if (typeof window === 'undefined') {
      return {
        searchCount: 0,
        lastSearchTime: 0,
        isBlocked: false,
        cooldownEndTime: 0,
      };
    }

    const stored = localStorage.getItem('searchRateLimit');
    return stored
      ? JSON.parse(stored)
      : {
          searchCount: 0,
          lastSearchTime: 0,
          isBlocked: false,
          cooldownEndTime: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem('searchRateLimit', JSON.stringify(state));
  }, [state]);

  const incrementSearch = () => {
    const now = Date.now();

    // Reset count if last search was more than cooldown time ago 
    if (now - state.lastSearchTime > COOLDOWN_TIME) {
      setState({
        searchCount: 1,
        lastSearchTime: now,
        isBlocked: false,
        cooldownEndTime: 0,
      });
      return true;
    }

    // Check if we're still in cooldown
    if (state.isBlocked && now < state.cooldownEndTime) {
      return false;
    }

    // Increment count and check if we need to block
    const newCount = state.searchCount + 1;
    if (newCount >= SEARCH_LIMIT) {
      setState({
        searchCount: newCount,
        lastSearchTime: now,
        isBlocked: true,
        cooldownEndTime: now + COOLDOWN_TIME,
      });
      return false;
    }

    setState({
      searchCount: newCount,
      lastSearchTime: now,
      isBlocked: false,
      cooldownEndTime: 0,
    });
    
    return true;
  };

  const getRemainingTime = () => {
    if (!state.isBlocked) return 0;
    const remaining = state.cooldownEndTime - Date.now();
    return remaining > 0 ? remaining : 0;
  };

  const reset = () => {
    setState({
      searchCount: 0,
      lastSearchTime: 0,
      isBlocked: false,
      cooldownEndTime: 0,
    });
  };

  return {
    searchCount: state.searchCount,
    isBlocked: state.isBlocked,
    getRemainingTime,
    incrementSearch,
    reset,
  };
}; 