import { createContext, createEffect, useContext } from 'solid-js';
import { createStorageSignal } from '@/common/utils';
import type { SettingsProviderProps, SettingsProvider } from './types';
import {
  APP_TITLE_BESIEGED,
  APP_TITLE_CITADEL,
  DEFAULT_SETTINGS,
  SETTING_BESIEGED_CASTLE,
  SETTING_DARK_MODE,
  SETTING_DESCRIPTORS,
  STORAGE_KEY_SETTINGS,
} from './constants';

const SettingsContext = createContext<SettingsProvider>({
  settings: () => [],
  enableSetting: () => [],
  disableSetting: () => [],
  isModuleEnabled: () => false,
});

export function SettingsProvider(props: SettingsProviderProps) {
  const [settings, setSettings] = createStorageSignal<Record<string, boolean>>(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS);

  const isDarkModeEnabled = () => settings()[SETTING_DARK_MODE];
  const isBesiegedEnabled = () => settings()[SETTING_BESIEGED_CASTLE];
  const settingsWithLabels = () => {
    return Object.keys({ ...DEFAULT_SETTINGS, ...settings()}).map(key => ({
      ...(SETTING_DESCRIPTORS[key] || {}),
      module: key,
      enabled: key in settings() ? settings()[key] : DEFAULT_SETTINGS[key],
    }));
  };

  const setColourTheme = () => {
    document.querySelector('html')?.setAttribute('data-theme', isDarkModeEnabled() ? 'dark' : 'light');
  };

  const setGameTitle = () => {
    document.title = isBesiegedEnabled() ? APP_TITLE_BESIEGED : APP_TITLE_CITADEL;
  };

  createEffect((hasRun) => {
    if (!hasRun) {
      setColourTheme();
      setGameTitle();
    }
    return true;
  }, false);

  createEffect((prevIsDarkModeEnabled) => {
    prevIsDarkModeEnabled !== isDarkModeEnabled() && setColourTheme();
    return isDarkModeEnabled();
  }, isDarkModeEnabled());

  createEffect((prevIsBesiegedEnabled) => {
    prevIsBesiegedEnabled !== isBesiegedEnabled() && setGameTitle();
    return isBesiegedEnabled();
  }, isBesiegedEnabled());

  const settingsManager = {
    settings: settingsWithLabels,
    enableSetting: (moduleName: string) => {
      setSettings((prev) => {
        if (!(moduleName in DEFAULT_SETTINGS)) return prev;
        return {
          ...prev,
          [moduleName]: true,
        };
      });
    },
    disableSetting: (moduleName: string) => {
      setSettings((prev) => {
        if (!(moduleName in DEFAULT_SETTINGS)) return prev;
        return {
          ...prev,
          [moduleName]: false,
        };
      });
    },
    isModuleEnabled: (moduleName: string) => {
      return !!settings()[moduleName];
    },
  };

  return (
    <SettingsContext.Provider value={settingsManager}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() { return useContext(SettingsContext) }
