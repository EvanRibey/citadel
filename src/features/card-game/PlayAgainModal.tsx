import { Modal } from '@/features/common';
import type { PlayAgainModalProps } from './types';
import './PlayAgainModal.css';
import { useStatistics } from '../settings';
import { isSettingEnabled } from '../settings/utils';
import { SETTING_MOVE_COUNT } from '../settings/constants';
import { Show } from 'solid-js';

export function PlayAgainModal(props: PlayAgainModalProps) {
  const { moveCount } = useStatistics();

  const isMoveCountEnabled = isSettingEnabled(SETTING_MOVE_COUNT);

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
        <Show when={isMoveCountEnabled()}>
          <p {...props.machine().descriptionProps} class="statistics">
            Total Moves: <b>{moveCount()}</b>
          </p>
        </Show>
        <div class="button-container">
          <button class="yes-button button" onClick={clickYesHandler}>Yes</button>
          <button class="no-button button" onClick={clickNoHandler}>No</button>
        </div>
      </div>
    </Modal>
  );
}
