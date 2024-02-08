import { createContext, useContext } from 'solid-js';
import { createStorageStore } from '@/common/utils';
import type { SettingsProviderProps, SettingsProvider, Setting } from './types';
import { DEFAULT_SETTINGS, SETTING_DESCRIPTORS, STORAGE_KEY_SETTINGS } from './constants';

const SettingsContext = createContext<SettingsProvider>({
  settings: [],
  enableSetting: () => {},
  disableSetting: () => {},
  getSetting: () => ({}),
});

export function SettingsProvider(props: SettingsProviderProps) {
  const [settings, setSettings] = createStorageStore<Setting[]>(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS);
  const settingsManager = {
    settings: settings.map(setting => ({ ...setting, ...(SETTING_DESCRIPTORS[setting.module] || {}) }) as Setting),
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
    getSetting: (moduleName: string) => {
      const foundItem = settings.find(({ module }) => module === moduleName) || {};
      return {
        ...foundItem,
        ...(SETTING_DESCRIPTORS[moduleName] || {}),
      } as Setting;
    },
  };

  return (
    <SettingsContext.Provider value={settingsManager}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() { return useContext(SettingsContext) }
