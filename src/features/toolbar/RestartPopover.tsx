import { Popover } from '@/features/common';
import type { RestartPopoverProps } from './types';
import './RestartPopover.css';

export function RestartPopover(props: RestartPopoverProps) {
  const clickNoHandler = () => {
    props.machine().close();
  };

  const clickYesHandler = () => {
    props.onRestart();
  };

  return (
    <Popover machine={props.machine}>
      <div class="restart-popover">
        <h2 {...props.machine().titleProps}>New Game?</h2>
        <div class="button-container">
          <button class="yes button" onClick={clickYesHandler}>Yes</button>
          <button class="no button" onClick={clickNoHandler}>No</button>
        </div>
      </div>
    </Popover>
  );
}
