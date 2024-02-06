import { refresh } from '@/assets/icons';
import type { RestartButtonProps } from './types';
import './RestartButton.css';

export function RestartButton(props: RestartButtonProps) {
  return (
    <button {...props.attributes} class="restart-button" aria-label="restart game">
      <img class="img" src={refresh} />
    </button>
  );
}
