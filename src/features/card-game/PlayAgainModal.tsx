import { Show } from 'solid-js';
import { Modal } from '@/features/common';
import { useSettings, useStatistics } from '@/features/settings';
import { SETTING_MOVE_COUNT } from '@/features/settings/constants';
import { formatToTwoNumbers } from '@/common/utils';
import type { PlayAgainModalProps } from './types';
import './PlayAgainModal.css';

export function PlayAgainModal(props: PlayAgainModalProps) {
  const { moveCount, gameTimer } = useStatistics();
  const { isModuleEnabled } = useSettings();

  const isMoveCountEnabled = isModuleEnabled(SETTING_MOVE_COUNT);

  const minutes = () => Math.floor(gameTimer() / 60);
  const seconds = () => formatToTwoNumbers(gameTimer() - minutes() * 60);

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
          <p {...props.machine().descriptionProps} class="statistics">
            Total Game Time: <b>{minutes()}:{seconds()}</b>
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
