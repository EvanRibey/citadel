import type { Accessor} from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { useSettings } from './Settings';

export function isSettingEnabled(moduleId: string): Accessor<boolean> {
  const { isModuleEnabled } = useSettings();

  const [isSettingEnabled, setIsSettingEnabled] = createSignal<boolean>(isModuleEnabled(moduleId));

  createEffect(() => {
    setIsSettingEnabled(isModuleEnabled(moduleId));
  });

  return isSettingEnabled;
}
