import { Modal } from '@/features/common';
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
    <Modal machine={props.machine}>
      <div class="card-game-play-again">
        <h2 {...props.machine().titleProps}>Play Again?</h2>
        <div class="button-container">
          <button class="yes-button button" onClick={clickYesHandler}>Yes</button>
          <button class="no-button button" onClick={clickNoHandler}>No</button>
        </div>
      </div>
    </Modal>
  );
}
