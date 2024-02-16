import { createContext, createSignal, onCleanup, useContext } from 'solid-js';
import type { StatisticsProvider, StatisticsProviderProps } from './types';

const StatisticsContext = createContext<StatisticsProvider>({
  moveCount: () => 0,
  gameTimer: () => 0,
  addMove: () => {},
  resetGameTimer: () => {},
  resetMoveCount: () => {},
  startGameTimer: () => {},
  stopGameTimer: () => {},
});

export function StatisticsProvider(props: StatisticsProviderProps) {
  const [moveCount, setMoveCount] = createSignal<number>(0);
  const [gameTimer, setGameTimer] = createSignal<number>(0);

  let intervalTimer: null | ReturnType<typeof setInterval> = null;

  const statisticsManager = {
    moveCount,
    gameTimer,
    addMove: () => {
      setMoveCount(prevMoveCount => prevMoveCount + 1);
    },
    resetMoveCount: () => {
      setMoveCount(0);
    },
    resetGameTimer: () => {
      setGameTimer(0);
      if (intervalTimer !== null) clearInterval(intervalTimer);
    },
    startGameTimer: () => {
      intervalTimer = setInterval(() => {
        setGameTimer(prevTime => prevTime + 1);
      }, 1000);
    },
    stopGameTimer: () => {
      if (intervalTimer !== null) clearInterval(intervalTimer);
    },
  };

  onCleanup(() => {
    if (intervalTimer !== null) clearInterval(intervalTimer);
  });

  return (
    <StatisticsContext.Provider value={statisticsManager}>
      {props.children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() { return useContext<StatisticsProvider>(StatisticsContext) }
