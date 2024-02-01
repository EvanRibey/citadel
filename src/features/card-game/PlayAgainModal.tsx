import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import type { PlayAgainModalProps } from './types';
import './PlayAgainModal.css';

export function PlayAgainModal(props: PlayAgainModalProps) {
  const clickNoHandler = () => {
    props.machine().close();
  };

  const clickYesHandler = () => {
    props.onReset();
  };

  return (
    <Show when={props.machine().isOpen}>
      <Portal>
        <div {...props.machine().backdropProps} class="card-game-play-again-backdrop" />
        <div {...props.machine().positionerProps} class="card-game-play-again">
          <div {...props.machine().contentProps} class="content">
            <h2 class="title">Play Again?</h2>
            <div class="button-container">
              <button class="yes-button button" onClick={clickYesHandler}>Yes</button>
              <button class="no-button button" onClick={clickNoHandler}>No</button>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
