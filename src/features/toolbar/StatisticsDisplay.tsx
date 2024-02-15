import { Show } from 'solid-js';
import { useStatistics } from '@/features/settings';
import { formatToTwoNumbers } from '@/common/utils';
import type { StatisticsDisplayProps } from './types';
import './StatisticsDisplay.css';

export function StatisticsDisplay(props: StatisticsDisplayProps) {
  const { moveCount, gameTimer } = useStatistics();

  const minutes = () => Math.floor(gameTimer() / 60);
  const seconds = () => formatToTwoNumbers(gameTimer() - minutes() * 60);

  return (
    <Show when={props.isVisible}>
      <div class="statistics-diplay">
        <div class="details">Total Moves: {moveCount()}</div>
        <div class="details">Play Time: {minutes()}:{seconds()}</div>
      </div>
    </Show>
  );
}
