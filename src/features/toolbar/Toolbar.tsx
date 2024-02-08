import { createMemo, createUniqueId } from 'solid-js';
import * as dialog from '@zag-js/dialog';
import * as popover from '@zag-js/popover';
import { useMachine, normalizeProps } from '@zag-js/solid';
import { useRedeal } from '@/app/ShouldRedeal';
import { IconButton } from '@/features/common';
import { helpCircle, refresh, settings } from '@/assets/icons';
import { HowToPlayModal, RestartPopover } from '.';
import './Toolbar.css';
import { SettingsPopover } from './SettingsPopover';

export function Toolbar() {
  const { willRedeal } = useRedeal();

  const [howToMachineState, howToMachineSend] = useMachine(dialog.machine({ id: createUniqueId() }));
  const [restartMachineState, restartMachineSend] = useMachine(popover.machine({ id: createUniqueId() }));
  const [settingsMachineState, settingsMachineSend] = useMachine(popover.machine({ id: createUniqueId() }));

  const howToDialogMachine = createMemo(() => dialog.connect(howToMachineState, howToMachineSend, normalizeProps));
  const restartPopoverMachine = createMemo(() => popover.connect(restartMachineState, restartMachineSend, normalizeProps));
  const settingsPopoverMachine = createMemo(() => popover.connect(settingsMachineState, settingsMachineSend, normalizeProps));

  const clickRestartHandler = () => {
    willRedeal();
    restartPopoverMachine().close();
  };

  return (
    <>
      <div class="toolbar">
        <IconButton
          ariaLabel="restart"
          attributes={restartPopoverMachine()?.triggerProps}
          icon={refresh}
          iconAlt="arrow rotating clockwise"
        />
        <IconButton
          ariaLabel="help"
          attributes={howToDialogMachine()?.triggerProps}
          icon={helpCircle}
          iconAlt="circle around question mark"
        />
        <IconButton
          ariaLabel="settings"
          attributes={settingsPopoverMachine()?.triggerProps}
          icon={settings}
          iconAlt="gear"
        />
      </div>
      <RestartPopover onRestart={clickRestartHandler} machine={restartPopoverMachine} />
      <HowToPlayModal machine={howToDialogMachine} />
      <SettingsPopover machine={settingsPopoverMachine} />
    </>
  );
}
