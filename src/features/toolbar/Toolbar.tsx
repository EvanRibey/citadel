import { Show, createMemo, createUniqueId } from 'solid-js';
import * as dialog from '@zag-js/dialog';
import * as popover from '@zag-js/popover';
import { useMachine, normalizeProps } from '@zag-js/solid';
import { IconButton } from '@/features/common';
import { helpCircle, refresh, settings, undo } from '@/assets/icons';
import { isSettingEnabled } from '@/features/settings/utils';
import { SETTING_MOVE_COUNT, SETTING_UNDO } from '@/features/settings/constants';
import { HowToPlayModal, SettingsPopover, RestartPopover, useDealer, StatisticsDisplay } from '.';
import './Toolbar.css';

export function Toolbar() {
  const { willRedeal, willUndo } = useDealer();
  const isMoveCountEnabled = isSettingEnabled(SETTING_MOVE_COUNT);
  const isUndoEnabled = isSettingEnabled(SETTING_UNDO);

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

  const clickUndoHandler = () => {
    willUndo();
  };

  return (
    <>
      <div class="toolbar">
        <div class="statistics">
          <StatisticsDisplay isVisible={isMoveCountEnabled()} />
        </div>
        <div class="buttons">
          <Show when={isUndoEnabled()}>
            <IconButton
              ariaLabel="undo"
              icon={undo}
              iconAlt="arrow pointing left"
              onClick={clickUndoHandler}
            />
          </Show>
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
      </div>
      <RestartPopover onRestart={clickRestartHandler} machine={restartPopoverMachine} />
      <HowToPlayModal machine={howToDialogMachine} />
      <SettingsPopover machine={settingsPopoverMachine} />
    </>
  );
}
