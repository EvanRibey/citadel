import { refresh } from '@/assets/icons';
import type { RestartButtonProps } from './types';
import './RestartButton.css';

export function RestartButton(props: RestartButtonProps) {
  const clickHandler = () => {
    props.onClick();
  };

  return (
    <button class="restart-button" aria-label="restart game" onClick={clickHandler}>
      <img class='img' src={refresh} />
    </button>
  );
}
