import { For } from 'solid-js';
import { Popover } from '@/features/common';
import { useDealer, useSettings } from '@/features/settings';
import { SETTING_BESIEGED_CASTLE } from '@/features/settings/constants';
import { SettingSwitch } from '.';
import './SettingsPopover.css';
import type { SettingsPopoverProps } from './types';

export function SettingsPopover(props: SettingsPopoverProps) {
  const { willRedeal } = useDealer();
  const { settings, enableSetting, disableSetting } = useSettings();

  const switchHandler = (moduleName: string, moduleStatus: boolean) => {
    if (moduleStatus) {
      enableSetting(moduleName);
    } else {
      disableSetting(moduleName);
    }
    if (moduleName === SETTING_BESIEGED_CASTLE) willRedeal();
  };

  return (
    <Popover machine={props.machine}>
      <div class="settings-popover">
        <For each={settings()}>{setting => (
          <SettingSwitch
            setting={setting}
            onSwitch={switchHandler}
          />
        )}</For>
      </div>
    </Popover>
  );
}
