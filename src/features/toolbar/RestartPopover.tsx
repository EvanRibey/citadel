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
    <div {...props.machine().positionerProps} class="restart-popover">
      <div {...props.machine().contentProps}>
        <h2 {...props.machine().titleProps}>New Game?</h2>
        <div class="button-container">
          <button class="yes" onClick={clickYesHandler}>Yes</button>
          <button class="no" onClick={clickNoHandler}>No</button>
        </div>
      </div>
    </div>
  );
}
