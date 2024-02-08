import { For } from 'solid-js';
import { Popover } from '@/features/common';
import { useRedeal } from '@/app/ShouldRedeal';
import { useSettings } from '@/app/Settings';
import { SETTING_BESIEGED_CASTLE } from '@/app/constants';
import { SettingSwitch } from '.';
import './SettingsPopover.css';
import type { SettingsPopoverProps } from './types';

export function SettingsPopover(props: SettingsPopoverProps) {
  const { willRedeal } = useRedeal();
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
