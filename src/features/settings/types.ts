import { JSX } from 'solid-js';

export interface Setting {
  module: string;
  enabled: boolean;
  name?: string;
  description?: string;
}

export interface SettingsProviderProps {
  children: JSX.Element;
}

export interface SettingsProvider {
  settings: () => Setting[];
  enableSetting: ((arg0: string) => void) | VoidFunction;
  disableSetting: ((arg0: string) => void) | VoidFunction;
  isModuleEnabled: ((arg0: string) => boolean) | (() => boolean);
}
