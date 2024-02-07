import { helpCircle } from '@/assets/icons';
import type { HowToPlayButtonProps } from './types';
import './HowToPlayButton.css';

export function HowToPlayButton(props: HowToPlayButtonProps) {
  const clickHandler = () => {
    props.onClick();
  };

  return (
    <button class="howto-play-button" aria-label="how to play" onClick={clickHandler}>
      <img class="img" src={helpCircle} />
    </button>
  );
}
