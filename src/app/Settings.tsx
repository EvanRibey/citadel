import { createContext, useContext } from 'solid-js';
import { createStorageStore } from '@/common/utils';
import type { SettingsProviderProps, SettingsProvider, Setting } from './types';
import { DEFAULT_SETTINGS, STORAGE_KEY_SETTINGS } from './constants';

const SettingsContext = createContext<SettingsProvider>();

export function SettingsProvider(props: SettingsProviderProps) {
  const [settings, setSettings] = createStorageStore<Setting[]>(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS);
  const settingsManager = {
    settings,
    enableSetting: (moduleName: string) => {
      setSettings(
        setting => setting.module === moduleName,
        'enabled',
        true,
      );
    },
    disableSetting: (moduleName: string) => {
      setSettings(
        setting => setting.module === moduleName,
        'enabled',
        false,
      );
    },
  };

  return (
    <SettingsContext.Provider value={settingsManager}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() { return useContext(SettingsContext) }
