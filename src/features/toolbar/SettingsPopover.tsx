import { Popover } from '@/features/common';
import { useSettings } from '@/app/Settings';
import './SettingsPopover.css';
import type { SettingsPopoverProps } from './types';
import { For } from 'solid-js';
import { SettingSwitch } from '.';

export function SettingsPopover(props: SettingsPopoverProps) {
  const { settings, enableSetting, disableSetting } = useSettings();

  const switchHandler = (moduleName: string, moduleStatus: boolean) => {
    if (moduleStatus) {
      enableSetting(moduleName);
    } else {
      disableSetting(moduleName);
    }
  };

  console.log(settings);
  return (
    <Popover machine={props.machine}>
      <div class="settings-popover">
        <For each={settings}>{setting => (
          <SettingSwitch
            setting={setting}
            onSwitch={switchHandler}
          />
        )}</For>
      </div>
    </Popover>
  );
}
