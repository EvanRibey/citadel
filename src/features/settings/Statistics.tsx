import { createContext, createSignal, useContext } from 'solid-js';
import type { StatisticsProvider, StatisticsProviderProps } from './types';

const StatisticsContext = createContext<StatisticsProvider>({
  moveCount: () => 0,
  addMove: () => {},
  resetMoveCount: () => {},
});

export function StatisticsProvider(props: StatisticsProviderProps) {
  const [moveCount, setMoveCount] = createSignal<number>(props.moveCount || 0);

  const statisticsManager = {
    moveCount,
    addMove: () => {
      setMoveCount(prevMoveCount => prevMoveCount + 1);
    },
    resetMoveCount: () => {
      setMoveCount(0);
    },
  };

  return (
    <StatisticsContext.Provider value={statisticsManager}>
      {props.children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() { return useContext(StatisticsContext) }
