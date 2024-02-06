import { createMemo, createUniqueId } from 'solid-js';
import * as dialog from '@zag-js/dialog';
import * as popover from '@zag-js/popover';
import { useMachine, normalizeProps } from '@zag-js/solid';
import { useRedeal } from '@/app/ShouldRedeal';
import {
  HowToPlayButton,
  HowToPlayModal,
  RestartButton,
  RestartPopover,
} from '.';
import './Toolbar.css';

export function Toolbar() {
  const { willRedeal } = useRedeal() || {};

  const [howToMachineState, howToMachineSend] = useMachine(dialog.machine({ id: createUniqueId() }));
  const [restartMachineState, restartMachineSend] = useMachine(popover.machine({ id: createUniqueId() }));
  const howToDialogMachine = createMemo(() => dialog.connect(howToMachineState, howToMachineSend, normalizeProps));
  const restartPopoverMachine = createMemo(() => popover.connect(restartMachineState, restartMachineSend, normalizeProps));

  const clickHowToPlayHandler = () => {
    howToDialogMachine()?.open();
  };

  const clickRestartHandler = () => {
    willRedeal && willRedeal();
    restartPopoverMachine().close();
  };

  return (
    <div class="toolbar">
      <RestartButton attributes={restartPopoverMachine()?.triggerProps} />
      <RestartPopover onRestart={clickRestartHandler} machine={restartPopoverMachine} />
      <HowToPlayButton onClick={clickHowToPlayHandler} />
      <HowToPlayModal machine={howToDialogMachine} />
    </div>
  );
}
