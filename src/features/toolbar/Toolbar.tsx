import { createMemo, createUniqueId } from 'solid-js';
import * as dialog from '@zag-js/dialog';
import * as popover from '@zag-js/popover';
import { useMachine, normalizeProps } from '@zag-js/solid';
import { useRedeal } from '@/app/ShouldRedeal';
import { IconButton } from '@/features/common';
import { helpCircle, refresh } from '@/assets/icons';
import { HowToPlayModal, RestartPopover } from '.';
import './Toolbar.css';

export function Toolbar() {
  const { willRedeal } = useRedeal() || {};

  const [howToMachineState, howToMachineSend] = useMachine(dialog.machine({ id: createUniqueId() }));
  const [restartMachineState, restartMachineSend] = useMachine(popover.machine({ id: createUniqueId() }));
  const howToDialogMachine = createMemo(() => dialog.connect(howToMachineState, howToMachineSend, normalizeProps));
  const restartPopoverMachine = createMemo(() => popover.connect(restartMachineState, restartMachineSend, normalizeProps));

  const clickRestartHandler = () => {
    willRedeal && willRedeal();
    restartPopoverMachine().close();
  };

  return (
    <>
      <div class="toolbar">
        <IconButton
          ariaLabel="restart game"
          attributes={restartPopoverMachine()?.triggerProps}
          icon={refresh}
          iconAlt="arrow rotating clockwise"
        />
        <IconButton
          ariaLabel="how to play"
          attributes={howToDialogMachine()?.triggerProps}
          icon={helpCircle}
          iconAlt="circle around question mark"
        />
      </div>
      <RestartPopover onRestart={clickRestartHandler} machine={restartPopoverMachine} />
      <HowToPlayModal machine={howToDialogMachine} />
    </>
  );
}
