import { Show } from 'solid-js';
import { useStatistics } from '@/features/settings';
import type { StatisticsDisplayProps } from './types';
import './StatisticsDisplay.css';

export function StatisticsDisplay(props: StatisticsDisplayProps) {
  const { moveCount } = useStatistics();

  return (
    <Show when={props.isVisible}>
      <div class="statistics-diplay">
        <div class="move-count">Total Moves: {moveCount()}</div>
      </div>
    </Show>
  );
}
